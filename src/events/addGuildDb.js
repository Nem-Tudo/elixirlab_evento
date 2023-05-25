module.exports = {
    name: "guildCreate",
    async run(guild, client) {
        client.settings.functions.guildDatabase(guild.id, client)
    }
}