const Discord = require('discord.js')

/**
 * 
 * @param {Discord.Message} message 
 * @param {Discord.Client} client 
 * @returns 
 */

module.exports = async (message, client) => {
    if (!message || message.author?.bot || !message.content) return

    if (!message.guild) return message.reply(client.settings.functions.getErrorEmbed("Meus comandos só podem ser executados em servidores")).catch(() => { })

    if(!message.guild.cache) {
        message.guild.cache = {};
        message.guild.cache.prefix = client.settings.config.defaultPrefix;
    }

    if(message.content.startsWith(message.guild.cache.prefix)) message.channel.sendTyping();

    //database objects
    const userdb = await client.settings.functions.userDatabase(message.author.id, client);
    const guilddb = await client.settings.functions.guildDatabase(message.guild.id, client);

    const prefix = guilddb.prefix;
    message.guild.cache.prefix = prefix;

    if (!message.content.startsWith(prefix)) return

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.settings.commands.get(commandName) || client.settings.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return

    const clientdb = await client.settings.schemas.get("Client").findOne()

    //execute
    try {

        if (!client.settings.config.adminUsers.includes(message.author.id)) {

            if (command.botAdmin) {
                return message.reply(client.settings.functions.getErrorEmbed("Apenas administradores do bot podem executar este comando!")).catch(() => { })
            }

            const commandPermissions = command.permissions;

            if ((commandPermissions.length > 0) ? commandPermissions.some(perm => !message.member.permissions.has(perm)) : false) return message.reply(client.settings.functions.getErrorEmbed("Você não tem as permissões necessárias para executar este comando!"))

            if (command.roles.length > 0) {

                if (!message.member.permissions.has("Administrator") && !message.member.roles.cache.some(rl => command.roles.includes(rl.id))) {
                    const embed = new Discord.EmbedBuilder()
                        .setColor("#eb4034")
                        .setTitle(`Você não tem os cargos necessários para executar esse comando!`)
                        .setDescription(`Você precisa ter o${command.roles.length > 1 ? "s" : ""} cargo${command.roles.length > 1 ? "s" : ""}: ${command.roles.map(rl => `<@&${rl}>`).join(", ")}`)

                    return message.reply({ embeds: [embed] })
                }

            }

        }

        client.settings.functions.sendLog("Comando executado", `${message.author.tag} (${message.author.id}) utilizou o comando: \`${message.content}\``, client)
        await command.run(message, client, args, { user: userdb, guild: guilddb, client: clientdb })
    } catch (error) {
        console.log(error)

        const embed = new Discord.EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erro interno ao executar o comando!")
            .setDescription(`\`${error}\``)

        return message.reply({ embeds: [embed] }).catch(() => { })
    }
}