module.exports = {
    name: "ready",
    async run(client) {
        const developer = await client.users.fetch(client.settings.config.developer);

        client.settings.developer = developer;

        const logsChannel = client.guilds.cache.get(client.settings.config.internal.guild).channels.cache.get(client.settings.config.internal.logsChannel);

        client.settings.logsChannel = logsChannel;

        client.settings.functions.sendLog("Bot iniciado!", "O bot acabou de iniciar", client)

    }
}