const Discord = require('discord.js')
module.exports = {
    name: "serverinfo",
    aliases: ["si", "infoserver"],
    permissions: [],
    roles: [],
    onlyGuild: true,
    botModerator: false,
    botAdmin: false,
    description: "Veja informações sobre um servidor",
    /**
     * 
     * @param {import("discord.js").Message} message 
     * @param {import("discord.js").Client} client 
     * @param {Array} args 
     * @param {{guild, user}} database
     */
    async run(message, client, args, database) {
        const guild = args[0] ? client.guilds.cache.get(args[0]) : message.guild;

        if (!guild) return message.reply(client.settings.functions.getArgumentsEmbed(`${database.guild.prefix}${this.name} [server]`, ["Server"]))

        const lines = [];

        const guildowner = await guild.fetchOwner().catch(() => { })

        lines.push(`<:tag:1107469706815885342> **Nome do servidor**`, guild.name)
        lines.push(`<:id:1107444807695093800> **ID do servidor**`, guild.id)
        lines.push("")
        lines.push(`<:owner:1107469992229879828> **Dono**: ${guildowner.user.tag} (${guildowner.id})`)
        lines.push("")
        lines.push(`<:calendar:1107445162147315752> **Criado em:** <t:${parseInt(guild.createdAt / 1000)}:f>\n`)

        if (guild.premiumSubscriptionCount > 0) {
            lines.push(`<:boost:1107471163380224103> **Boost:**\n・ Nível: ${guild.premiumTier}\n・ Quantidade: ${guild.premiumSubscriptionCount}\n`)
        }

        if (guild.vanityURLCode) {
            lines.push(`<:ticket:1107472047069732934> **Invite personalizado:** https://discord.gg/${guild.vanityURLCode}`)
        }

        const row1 = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setLabel("Geral")
                    .setStyle(Discord.ButtonStyle.Success)
                    .setCustomId("serverinfo_general"),
                new Discord.ButtonBuilder()
                    .setLabel("Membros")
                    .setCustomId("serverinfo_members")
                    .setStyle(Discord.ButtonStyle.Primary),
                new Discord.ButtonBuilder()
                    .setLabel("Cargos")
                    .setCustomId("serverinfo_roles")
                    .setStyle(Discord.ButtonStyle.Primary),
                new Discord.ButtonBuilder()
                    .setLabel("Assets")
                    .setCustomId("serverinfo_assets")
                    .setStyle(Discord.ButtonStyle.Primary),
                new Discord.ButtonBuilder()
                    .setLabel("Outros")
                    .setCustomId("serverinfo_others")
                    .setStyle(Discord.ButtonStyle.Primary)
            )

        const embed1 = new Discord.EmbedBuilder()
            .setColor("#1ce6ce")
            .setThumbnail(guild.iconURL())
            .setAuthor({
                iconURL: guild.iconURL(),
                name: guild.name
            })
            .setImage(guild.bannerURL({ size: 2048 }))
            .setDescription(lines.join("\n"))

        const lines2 = [];

        const members = await guild.members.fetch().catch(() => { }) || []

        lines2.push(`**Total de membros:** ${guild.memberCount}`)
        lines2.push("")
        lines2.push("**Membros com insígnias:**")
        lines2.push(`> <:discordstaff:1108530107422887957> ${members.filter(m => m.user.flags.toArray().includes("Staff")).size}`)
        lines2.push(`> <:partner:1108530195243221072> ${members.filter(m => m.user.flags.toArray().includes("Partner")).size}`)
        lines2.push(`> <:moderatorsprogramsalumni:1108530241837731951> ${members.filter(m => m.user.flags.toArray().includes("CertifiedModerator")).size}`)
        lines2.push(`> <:goldenbughunter:1108530306107052102> ${members.filter(m => m.user.flags.toArray().includes("BugHunterLevel2")).size}`)
        lines2.push(`> <:bughunter:1108530341259530340> ${members.filter(m => m.user.flags.toArray().includes("BugHunterLevel1")).size}`)
        lines2.push(`> <:hypesquadevents:1108530404287332352> ${members.filter(m => m.user.flags.toArray().includes("Hypesquad")).size}`)
        lines2.push(`> <:activedev:1108530474462232646> ${members.filter(m => m.user.flags.toArray().includes("ActiveDeveloper")).size}`)
        lines2.push(`> <:verifiedbotdeveloper:1108530511984467978> ${members.filter(m => m.user.flags.toArray().includes("VerifiedDeveloper")).size}`)
        lines2.push(`> <:earlysupporter:1108530569228324914> ${members.filter(m => m.user.flags.toArray().includes("PremiumEarlySupporter")).size}`)
        lines2.push(`> <:balance:1108530751357587568> ${members.filter(m => m.user.flags.toArray().includes("HypeSquadOnlineHouse3")).size}`)
        lines2.push(`> <:brilliance:1108530818684551258> ${members.filter(m => m.user.flags.toArray().includes("HypeSquadOnlineHouse2")).size}`)
        lines2.push(`> <:bravery:1108530841711296523> ${members.filter(m => m.user.flags.toArray().includes("HypeSquadOnlineHouse1")).size}`)

        const row2 = new Discord.ActionRowBuilder().addComponents(
            new Discord.StringSelectMenuBuilder()
                .setPlaceholder("Obter lista de usuários por insígnias")
                .setCustomId("serverinfo_usersbadge")
                .addOptions(
                    new Discord.StringSelectMenuOptionBuilder()
                        .setLabel('Funcionário do Discord')
                        .setValue('Staff'),
                    new Discord.StringSelectMenuOptionBuilder()
                        .setLabel('Parceiros')
                        .setValue('Partner'),
                    new Discord.StringSelectMenuOptionBuilder()
                        .setLabel('Moderadores Certificados')
                        .setValue('CertifiedModerator'),
                    new Discord.StringSelectMenuOptionBuilder()
                        .setLabel('Bug Hunter Dourado')
                        .setValue('BugHunterLevel2'),
                    new Discord.StringSelectMenuOptionBuilder()
                        .setLabel('Bug Hunter')
                        .setValue('BugHunterLevel1'),
                    new Discord.StringSelectMenuOptionBuilder()
                        .setLabel('Hypesquad')
                        .setValue('Hypesquad'),
                    new Discord.StringSelectMenuOptionBuilder()
                        .setLabel('Desenvolvedor Verificado')
                        .setValue('VerifiedDeveloper'),
                    new Discord.StringSelectMenuOptionBuilder()
                        .setLabel('Desenvolvedor Ativo')
                        .setValue('ActiveDeveloper'),
                    new Discord.StringSelectMenuOptionBuilder()
                        .setLabel('Nitro Pioneiro')
                        .setValue('PremiumEarlySupporter'),
                    new Discord.StringSelectMenuOptionBuilder()
                        .setLabel('Hypesquad Balance')
                        .setValue('HypeSquadOnlineHouse3'),
                    new Discord.StringSelectMenuOptionBuilder()
                        .setLabel('Hypesquad Brilliance')
                        .setValue('HypeSquadOnlineHouse2'),
                    new Discord.StringSelectMenuOptionBuilder()
                        .setLabel('Hypesquad Bravery')
                        .setValue('HypeSquadOnlineHouse1')
                )
        )
        const embed2 = new Discord.EmbedBuilder()
            .setColor("#1ce6ce")
            .setThumbnail(guild.iconURL())
            .setTitle("Informações de membros")
            .setDescription(lines2.join("\n"))

        const description3 = `\\🔎Total de cargos: ${guild.roles.cache.size}\n\\✅ Possui administrador\n\\❌ Não possui administrador\n\n` + guild.roles.cache.sort((a, b) => b.rawPosition - a.rawPosition).map(role => `${role.permissions.has("Administrator") ? "\\✅" : "\\❌"} ${role} (${role.id})`).join("\n").slice(0, 3900);
        const embed3 = new Discord.EmbedBuilder()
            .setColor("#1ce6ce")
            .setThumbnail(guild.iconURL())
            .setTitle("Cargos do servidor")
            .setDescription(description3.endsWith(")") ? description3 : description3 + "...")

        const assetslines = [];
        assetslines.push(`**Ícone:** ${guild.iconURL() ? `[baixe aqui](${guild.iconURL({ size: 2048 })})` : "*Indisponível*"}`)
        assetslines.push(`**Banner:** ${guild.bannerURL() ? `[baixe aqui](${guild.bannerURL({ size: 2048 })})` : "*Indisponível*"}`)
        assetslines.push(`**Banner de invite:** ${guild.splashURL() ? `[baixe aqui](${guild.splashURL({ size: 2048 })})` : "*Indisponível*"}`)

        const embed4 = new Discord.EmbedBuilder()
            .setColor("1ce6ce")
            .setThumbnail(guild.iconURL())
            .setTitle("Assets do servidor")
            .setDescription(`Baixe por aqui ou clique nos botões abaixo para visualizar\n\n${assetslines.join("\n")}`)

        const row4 = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setLabel("Ícone")
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setDisabled(!guild.iconURL())
                    .setCustomId("serverinfo_assets_icon"),
                new Discord.ButtonBuilder()
                    .setLabel("Banner")
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setDisabled(!guild.bannerURL())
                    .setCustomId("serverinfo_assets_banner"),
                new Discord.ButtonBuilder()
                    .setLabel("Banner de invite")
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setDisabled(!guild.splashURL())
                    .setCustomId("serverinfo_assets_splash")
            )


        const embed5 = new Discord.EmbedBuilder()
            .setColor("1ce6ce")
            .setThumbnail(guild.iconURL())
            .setTitle("Outros detalhes do servidor")
            .setDescription(`**Recursos:** ${guild.features.length > 0 ? guild.features.map(f => `\`${f}\``).join(", ") : "*Nenhum recurso*"}`)

        const row5 = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setLabel("Obter dados em JSON")
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setCustomId("serverinfo_others_jsondatas"),
            )


        function assetsEmbed(name, url) {
            return new Discord.EmbedBuilder()
                .setColor("#4287f5")
                .setTitle(`Visualização do ${name} de ${guild.name}`)
                .setImage(url)
        }

        const updaterow = JSON.parse(JSON.stringify(row1));
        updaterow.components = updaterow.components.filter((c, i) => i != 0);

        const _message = await message.reply({ embeds: [embed1], components: [updaterow] });
        const collector = _message.createMessageComponentCollector({
            time: 5 * 60 * 1000
        });

        collector.on("collect", async interaction => {
            if (interaction.user.id != message.author.id) return interaction.reply({
                embeds: [client.settings.functions.getErrorEmbed("Você não pode interagir com componentes de outra pessoa!", false)],
                ephemeral: true
            });

            if (interaction.customId === "serverinfo_general") {
                const updaterow = JSON.parse(JSON.stringify(row1));
                updaterow.components = updaterow.components.filter((c, i) => i != 0);
                interaction.update({ embeds: [embed1], components: [updaterow] })
            }

            if (interaction.customId === "serverinfo_members") {
                const updaterow = JSON.parse(JSON.stringify(row1));
                updaterow.components = updaterow.components.filter((c, i) => i != 1);
                interaction.update({ embeds: [embed2], components: [row2, updaterow] })
            }

            if (interaction.customId === "serverinfo_usersbadge") {
                const membersbadge = members.filter(m => m.user.flags.toArray().includes(interaction.values[0]))

                const attach = new Discord.AttachmentBuilder(Buffer.from(`TODOS OS MEMBROS COM {{${interaction.values[0]}}} - by Nem Tudo#7986\n\n---------------------------------------------------\nDiscord Tag / Discord ID / Todas as flags\n---------------------------------------------------\n\n` + (membersbadge.size < 1 ? "Ninguém por aqui... :(" : membersbadge.map(member => `${member.user.tag} (${member.id}) - [${member.user.flags.toArray().join(", ")}]`).join("\n"))), { name: "badges.txt" })

                interaction.reply({
                    files: [attach],
                    content: "Aqui estão todos os membros com a badge selecionada!",
                    ephemeral: true
                })
            }

            if (interaction.customId === "serverinfo_roles") {
                const updaterow = JSON.parse(JSON.stringify(row1));
                updaterow.components = updaterow.components.filter((c, i) => i != 2);
                interaction.update({ embeds: [embed3], components: [updaterow] })
            }

            if (interaction.customId === "serverinfo_assets") {
                const updaterow = JSON.parse(JSON.stringify(row1));
                updaterow.components = updaterow.components.filter((c, i) => i != 3);
                interaction.update({ embeds: [embed4], components: [row4, updaterow] })
            }

            if (interaction.customId === "serverinfo_others") {
                const updaterow = JSON.parse(JSON.stringify(row1));
                updaterow.components = updaterow.components.filter((c, i) => i != 4);
                interaction.update({ embeds: [embed5], components: [row5, updaterow] })
            }


            if (interaction.customId === "serverinfo_assets_icon") interaction.reply({ ephemeral: true, embeds: [assetsEmbed("ícone", guild.iconURL({ size: 2048 }))] })
            if (interaction.customId === "serverinfo_assets_banner") interaction.reply({ ephemeral: true, embeds: [assetsEmbed("banner", guild.bannerURL({ size: 2048 }))] })
            if (interaction.customId === "serverinfo_assets_splash") interaction.reply({ ephemeral: true, embeds: [assetsEmbed("banner de invite", guild.splashURL({ size: 2048 }))] })
            
            if (interaction.customId === "serverinfo_others_jsondatas") {

                const attach = new Discord.AttachmentBuilder(Buffer.from(JSON.stringify(message.guild)), { name: `guild_${guild.id}.json` })

                interaction.reply({
                    ephemeral: true,
                    content: "Aqui estão todos os dados do servidor em JSON...",
                    files: [attach]
                })
            }

        })


        collector.on("end", () => {
            _message.edit({
                components: []
            })
        })

    }
}