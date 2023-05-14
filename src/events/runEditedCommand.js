module.exports = {
    name:"messageUpdate",
    /**
     * @param {import("discord.js").Message} message 
     * @param {import("discord.js").Message} updatedMessage 
     * @param {import("discord.js").Client} client 
     */
    async run(message, updatedMessage, client)
    {
        if(message.content === updatedMessage.content) return
        client.settings.functions.runCommands(updatedMessage, client);
    }
}