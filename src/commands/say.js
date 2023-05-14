const Discord = require('discord.js')
module.exports = {
    name: "say",
    aliases: ["falar"],
    permissions: [Discord.PermissionFlagsBits.ManageGuild],
    roles: [],
    onlyGuild: true,
    botModerator: false,
    botAdmin: false,
    description: "Faça o bot falar qualquer coisa",
    /**
     * 
     * @param {import("discord.js").Message} message 
     * @param {import("discord.js").Client} client 
     * @param {Array} args 
     * @param {{guild, user}} database
     */
    async run (message, client, args, database){
        message.channel.send(args.join(" ").replace("--delete", ""));

        if(message.content.endsWith("--delete")) message.delete()
    }
}