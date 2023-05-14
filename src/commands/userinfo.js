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
    async run (message, client, args, database){

    }
}