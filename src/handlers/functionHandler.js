const fs = require("fs");

module.exports = (client) => {
    const functions = {};
    const functionsFiles = fs
        .readdirSync("./src/functions")
        .filter((file) => file.endsWith(".js"));

    for (const file of functionsFiles) {
        const functionFile = require(`./../functions/${file}`);
        functions[file.split(".")[0]] = functionFile;
    }

    console.log(`Loaded ${Object.keys(functions).length} functions.`);
    return functions
};
