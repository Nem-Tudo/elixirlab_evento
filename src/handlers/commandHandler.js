const fs = require("fs");
const { Collection } = require("discord.js")

module.exports = (client) => {

    const commands = new Collection();
    const commandFiles = fs
        .readdirSync("./src/commands")
        .filter((file) => file.endsWith(".js"));

    
    for (const file of commandFiles) {
        const command = require(`../commands/${file}`);
        
        commands.set(command.name, command);

    }
    
    console.log(`Loaded ${commands.size} commands.`)
    return commands
};
