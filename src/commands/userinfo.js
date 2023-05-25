const Discord = require('discord.js')
module.exports = {
    name: "userinfo",
    aliases: ["ui", "infouser"],
    permissions: [],
    roles: [],
    onlyGuild: true,
    botModerator: false,
    botAdmin: false,
    description: "Veja informações sobre um usuário específico",
    /**
     * 
     * @param {import("discord.js").Message} message 
     * @param {import("discord.js").Client} client 
     * @param {Array} args 
     * @param {{guild, user}} database
     */
    async run(message, client, args, database) {
        const member = args[0] ? await message.guild.members.fetch(args[0].replace(/[\\<>@#&!]/g, "")).catch(() => { }) : message.member;

        if (!member) return message.reply(client.settings.functions.getArgumentsEmbed(`${database.guild.prefix}${this.name} [user]`, ["User"]))


        const lines = [];

        lines.push(`<:user:1107444774199369748> **Usuário**`, `${member.user.tag}${member.nickname ? ` (${member.nickname})` : ""}`)
        lines.push(`<:id:1107444807695093800> **ID do usuário**`, member.id)
        lines.push("")
        lines.push(`<:calendar:1107445162147315752> **Conta criada em:** <t:${parseInt(member.user.createdAt / 1000)}:f>\n`)
        lines.push(`<:calendar2:1107446281057615902> **Entrou em:** <t:${parseInt(member.joinedAt / 1000)}:f>`)

        const assetslines = [];
        assetslines.push(`**Avatar:** ${member.user.avatarURL({ dynamic: true }) ? `[baixe aqui](${member.user.avatarURL({ dynamic: true, size: 2048 })})` : `*Indisponível*`}`)
        assetslines.push(`**Cor do banner:** ${member.user.hexAccentColor ? `\`${member.user.hexAccentColor}\`` : "*Indisponível*"}`)
        assetslines.push(`**Banner:** ${member.user.bannerURL() ? `[baixe aqui](${member.user.bannerURL({ size: 2048 })})` : `*Indisponível*`}`)
        assetslines.push(`**Avatar no servidor:** ${member.avatarURL({ dynamic: true }) ? `[baixe aqui](${member.avatarURL({ dynamic: true, size: 2048 })})` : `*Indisponível*`}`)

        function assetsEmbed(name, url) {
            return new Discord.EmbedBuilder()
                .setColor("#4287f5")
                .setTitle(`Visualização do ${name} de ${member.user.username}`)
                .setImage(url)
        }

        const row1 = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setLabel("Geral")
                    .setStyle(Discord.ButtonStyle.Success)
                    .setCustomId("userinfo_general"),
                new Discord.ButtonBuilder()
                    .setLabel("Cargos")
                    .setStyle(Discord.ButtonStyle.Primary)
                    .setCustomId("userinfo_roles"),
                new Discord.ButtonBuilder()
                    .setLabel("Assets")
                    .setStyle(Discord.ButtonStyle.Primary)
                    .setCustomId("userinfo_assets"),
                new Discord.ButtonBuilder()
                    .setLabel("Permissões")
                    .setStyle(Discord.ButtonStyle.Primary)
                    .setCustomId("userinfo_permissions")
            )

        const row2 = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setLabel("Avatar")
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setDisabled(!member.user.avatarURL({ dynamic: true }))
                    .setCustomId("userinfo_assets_avatar"),
                new Discord.ButtonBuilder()
                    .setLabel("Banner")
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setDisabled(!member.user.bannerURL({ dynamic: true }))
                    .setCustomId("userinfo_assets_banner"),
                new Discord.ButtonBuilder()
                    .setLabel("Avatar no servidor")
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setDisabled(!member.avatarURL({ dynamic: true }))
                    .setCustomId("userinfo_assets_serveravatar")
            )


        const embed1 = new Discord.EmbedBuilder()
            .setColor(member.displayHexColor)
            .setAuthor({
                iconURL: member.user.avatarURL({ dynamic: true }),
                name: member.user.tag
            })
            .setThumbnail(member.displayAvatarURL({ dynamic: true }))
            .setDescription(lines.join("\n"))

        const embed2 = new Discord.EmbedBuilder()
            .setColor(member.displayHexColor)
            .setThumbnail(member.displayAvatarURL({ dynamic: true }))
            .setTitle("Cargos do usuário")
            .setDescription(`Total de cargos: ${member.roles.cache.size}\nCor visível no usuário: \`${member.displayHexColor}\`\n\n${member.roles.cache.map(role => `・ ${role} (\`${role.id}\`)`).slice(0, 80).join("\n")}`)

        const embed3 = new Discord.EmbedBuilder()
            .setColor(member.displayHexColor)
            .setThumbnail(member.displayAvatarURL({ dynamic: true }))
            .setTitle("Assets do usuário")
            .setDescription(`Baixe por aqui ou clique nos botões abaixo para visualizar\n\n${assetslines.join("\n")}`)

        const embed4 = new Discord.EmbedBuilder()
            .setColor(member.displayHexColor)
            .setThumbnail(member.displayAvatarURL({ dynamic: true }))
            .setTitle("Permissões do usuário")
            .setDescription(`Usuário possui administrador: ${member.permissions.has(Discord.PermissionFlagsBits.Administrator) ? "Sim": "Não"}\nQuantidade de permissões: ${member.permissions.toArray().length}\n\n**Permissões:**\n${member.permissions.toArray().map(p => `\`${p}\``).map((p, i) => p + (i % 2 === 0 ? ", " : "\n")).join("")}`)

        const updaterow = JSON.parse(JSON.stringify(row1))
        updaterow.components = updaterow.components.filter((c, i) => i != 0)

        const _message = await message.reply({ embeds: [embed1], components: [updaterow] })
        const collector = _message.createMessageComponentCollector({
            time: 5 * 60 * 1000
        })

        collector.on("collect", (interaction) => {
            if (interaction.user.id != message.author.id) return interaction.reply({
                embeds: [client.settings.functions.getErrorEmbed("Você não pode interagir com componentes de outra pessoa!", false)],
                ephemeral: true
            })

            if (interaction.customId === "userinfo_general") {

                const updaterow = JSON.parse(JSON.stringify(row1))
                updaterow.components = updaterow.components.filter((c, i) => i != 0)

                interaction.update({ embeds: [embed1], components: [updaterow] })
            }

            if (interaction.customId === "userinfo_roles") {

                const updaterow = JSON.parse(JSON.stringify(row1))
                updaterow.components = updaterow.components.filter((c, i) => i != 1)

                interaction.update({ embeds: [embed2], components: [updaterow] })
            }

            if (interaction.customId === "userinfo_assets") {

                const updaterow = JSON.parse(JSON.stringify(row1))
                updaterow.components = updaterow.components.filter((c, i) => i != 2)

                interaction.update({ embeds: [embed3], components: [row2, updaterow] })
            }

            if (interaction.customId === "userinfo_permissions") {

                const updaterow = JSON.parse(JSON.stringify(row1))
                updaterow.components = updaterow.components.filter((c, i) => i != 3)

                interaction.update({ embeds: [embed4], components: [updaterow] })
            }

            if (interaction.customId === "userinfo_assets_avatar") interaction.reply({ ephemeral: true, embeds: [assetsEmbed("avatar", member.user.avatarURL({ dynamic: true, size: 2048 }))] })
            if (interaction.customId === "userinfo_assets_banner") interaction.reply({ ephemeral: true, embeds: [assetsEmbed("banner", member.user.bannerURL({ size: 2048 }))] })
            if (interaction.customId === "userinfo_assets_serveravatar") interaction.reply({ ephemeral: true, embeds: [assetsEmbed("avatar no servidor", member.avatarURL({ dynamic: true, size: 2048 }))] })

        })

        collector.on("end", () => {
            _message.edit({
                components: []
            })
        })
    }
}