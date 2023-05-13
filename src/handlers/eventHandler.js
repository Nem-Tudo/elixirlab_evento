const fs = require("fs");
const { Collection } = require("discord.js")

module.exports = (client) => {
    const events = new Collection();
    const eventFiles = fs
        .readdirSync("./src/events")
        .filter((file) => file.endsWith(".js"));

    for (const file of eventFiles) {
        const event = require(`../events/${file}`);

        client.on(event.name, (...args) => event.run(...args, client));
        events.set(file.split(".")[0], event);

    }
    console.log(`Loaded ${events.size} events.`)
    
    return events
};
