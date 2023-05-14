module.exports = {
    name:"messageCreate",
    /**
     * @param {import("discord.js").Message} message 
     * @param {import("discord.js").Client} client 
     */
    async run(message, client)
    {
        client.settings.functions.runCommands(message, client);
    }
}