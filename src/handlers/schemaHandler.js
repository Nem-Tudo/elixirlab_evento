const fs = require("fs");
const { Collection } = require("discord.js")

module.exports = () => {

    const schemas = new Collection();
    const schemaFiles = fs
        .readdirSync("./src/schemas")
        .filter((file) => file.endsWith(".js"));

    
    for (const file of schemaFiles) {
        const schema = require(`../schemas/${file}`);
        
        schemas.set(file.split(".")[0], schema);

    }
    
    console.log(`Loaded ${schemas.size} schemas.`)
    return schemas
};
