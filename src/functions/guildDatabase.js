module.exports = async (guildid, client) => {
    if (!guildid) return null
    const GuildSchema = client.settings.schemas.get("Guild");

    if (!await GuildSchema.exists({ id: guildid })) {

        const guilddb = await GuildSchema.create({
            id: guildid
        });

        return guilddb
    } else {
        const guilddb = await GuildSchema.findOne({ id: guildid });

        return guilddb;
    }
}