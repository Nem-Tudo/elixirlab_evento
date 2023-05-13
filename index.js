require("dotenv").config();
const Discord = require('discord.js');
const config = require("./config.js");

const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessageReactions,
        Discord.GatewayIntentBits.GuildMembers,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.DirectMessages,
    ],
    partials: [
        Discord.Partials.Channel,
        Discord.Partials.Message,
        Discord.Partials.Reaction
    ]
})

client.settings = {};
client.settings.config = config;

//load functions
const functionsHandler = require("./src/handlers/functionHandler.js");
client.settings.functions = functionsHandler(client);

//load database
const loadDatabase = require("./src/scripts/loadDatabase.js");
loadDatabase(client);

//load Schemas
const schemaHandler = require("./src/handlers/schemaHandler.js");
client.settings.schemas = schemaHandler(client)

//client.settings.schemas.get("Client").create({})

//load events
const eventHandler = require("./src/handlers/eventHandler.js");
client.settings.events = eventHandler(client)

//load commands
const commandHandler = require("./src/handlers/commandHandler.js")
client.settings.commands = commandHandler(client)

if (client.settings.config.ignoreUnhandledRejections) {
    process.on('unhandledRejection', (err) => {
        console.log("UNHANDLED REJECTION: " + err);
        console.log(err)
    })
}

client.login(process.env.TOKEN)