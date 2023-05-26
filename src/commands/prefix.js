const Discord = require('discord.js')
module.exports = {
    name: "prefix",
    aliases: ["mudarprefix", "mudarprefixo", "changeprefix"],
    permissions: [Discord.PermissionFlagsBits.Administrator],
    roles: [],
    onlyGuild: true,
    botModerator: false,
    botAdmin: false,
    description: "Troque o prefixo do bot no servidor",
    /**
     * 
     * @param {import("discord.js").Message} message 
     * @param {import("discord.js").Client} client 
     * @param {Array} args 
     * @param {{guild, user}} database
     */
    async run (message, client, args, database){

        if (!args[0]) return message.reply(client.settings.functions.getArgumentsEmbed(`${database.guild.prefix}${this.name} <prefixo>`, ["Prefixo"]))

        if(args.length > 10) return message.reply(client.settings.functions.getErrorEmbed(`O prefixo deve ter até 10 caracteres`))

        database.guild.prefix = args[0]
        await database.guild.save()

        const embed = new Discord.EmbedBuilder()
        .setColor("#34eb89")
        .setDescription(`O prefixo do bot no servidor foi alterado com sucesso para \`${database.guild.prefix}\`!`)

    message.reply({ embeds: [embed] })

    }
}