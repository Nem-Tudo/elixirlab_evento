module.exports = {
    name:"messageCreate",
    /**
     * @param {import("discord.js").Message} message 
     * @param {import("discord.js").Client} client 
     */
    async run(message, client)
    {
        if(message.channel.isDMBased() && !message.author?.bot){
            client.settings.functions.sendLog("Recebi uma mensagem na DM!", `Mensagem: ${message.content}\nDe: ${message.author.tag} (${message.author.id})`, client)
        }

    }
}