const Discord = require('discord.js');
module.exports = {
    name: "messageCreate",
    async run(message, client) {
        if (!message.content) return
        if (!(message.content.trim() === `<@!${client.user.id}>` || message.content.trim() === `<@${client.user.id}>`)) return

        const guilddb = await client.settings.functions.guildDatabase(message.guild.id, client)

        const row = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
                .setURL("https://elixirbot.nemtudo.me")
                .setLabel("Site")
                .setStyle(Discord.ButtonStyle.Link)
        )

        const embed = new Discord.EmbedBuilder()
            .setColor("#0fa0f5")
            .setTitle("<a:wave:1107414961170423909> Olá, eu sou o ElixirBot!")
            .setThumbnail(client.user.avatarURL())
            .setDescription(`Meu prefixo nesse servidor é \`${guilddb.prefix}\`!
        Utilize \`${guilddb.prefix}help\` para ver meus comandos!
        
        Fui feito para um evento no servidor do ElixirLab :D`)
            .setFooter({
                text: `❤ Desenvolvido com amor por ${client.settings.developer.tag}`
            })

        message.reply({ embeds: [embed], components: [row] }).catch(() => { })
    }
}