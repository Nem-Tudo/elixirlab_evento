const Discord = require('discord.js')
module.exports = {
    name: "addemoji",
    aliases: ["adicionaremoji", "emojiadd"],
    permissions: [Discord.PermissionFlagsBits.ManageGuildExpressions],
    roles: [],
    onlyGuild: true,
    botModerator: false,
    botAdmin: false,
    description: "Adicione um emoji ao servidor",
    /**
     * 
     * @param {import("discord.js").Message} message 
     * @param {import("discord.js").Client} client 
     * @param {Array} args 
     * @param {{guild, user}} database
     */
    async run(message, client, args, database) {
        if (args.length < 1 || args.length > 2) return message.reply({ embeds: [new Discord.EmbedBuilder().setColor("eb4034").setDescription(`<a:a_x:1107438001354702918> Argumentos inválidos foram fornecidos.\n\n**Modos de usar:**\n・ \`${database.guild.prefix}addemoji <anexo> <nome>\`\n・ \`${database.guild.prefix}addemoji <emoji> [nome]\`\n・ \`${database.guild.prefix}addemoji <URL> <nome>\`\n\n**Argumentos:**\n<:icon_x:1107037830544359444> \`Anexo\`: Imagem ou gif anexada na mensagem\n<:icon_x:1107037830544359444> \`Emoji\`: Menção de um emoji de algum servidor que o bot esteja\n<:icon_x:1107037830544359444> \`Nome\`: Texto, sem espaços\n<:icon_x:1107037830544359444> \`URL\`: Link de uma imagem ou gif`)] })

        const attachment = message.attachments.first()

        let name;
        let image;

        if (attachment) {
            if (args.length != 1) return message.reply(client.settings.functions.getArgumentsEmbed(`${database.guild.prefix}${this.name} <anexo> <nome>`, ["Anexo", "Nome"]))

            name = args[0] || attachment.name.split(".")[0];
            image = attachment.url;

        } else {
            if (![1, 2].includes(args.length)) return message.reply({ embeds: [new Discord.EmbedBuilder().setColor("eb4034").setDescription(`<a:a_x:1107438001354702918> Argumentos inválidos foram fornecidos.\n\n**Modos de usar:**\n・ \`${database.guild.prefix}addemoji <emoji> [nome]\`\n・ \`${database.guild.prefix}addemoji <URL> <nome>\`\n\n**Argumentos:**\n<:icon_x:1107037830544359444> \`Emoji\`: Menção de um emoji de algum servidor que o bot esteja\n<:icon_x:1107037830544359444> \`Nome\`: Texto, sem espaços\n<:icon_x:1107037830544359444> \`URL\`: Link de uma imagem ou gif`)] })

            const match = /<(?:a)?:\w+:(\d+)>/.exec(args[0])

            console.log(match);

            if (match) {
                const emoji = client.emojis.cache.get(match[1])

                if (!emoji) return message.reply(client.settings.functions.getErrorEmbed(`Não encontrei esse emoji nos servidores em que estou :(`))

                image = emoji.url

                name = args[1] || emoji.name

            } else {

                if (args.length != 2) return message.reply(client.settings.functions.getArgumentsEmbed(`${database.guild.prefix}${this.name} <URL> <nome>`, ["URL", "Nome"]))

                if (!isLink(args[0])) return message.reply(client.settings.functions.getArgumentsEmbed(`${database.guild.prefix}${this.name} <URL> <nome>`, ["URL", "Nome"]))

                image = args[0];
                name = args[1];
            }


        }


        if(name.length < 2 || name.length > 32) return message.reply(client.settings.functions.getErrorEmbed(`O nome do emoji deve ter entre 2 e 32 caracteres`))

        const createdEmoji = await message.guild.emojis.create({
            attachment: image,
            name: name
        }).catch(e => {
            message.reply(client.settings.functions.getErrorEmbed(`Erro ao criar emoji: \`${e}\``))
        })

        console.log(createdEmoji);

        if (createdEmoji) {
            const embed = new Discord.EmbedBuilder()
                .setColor("#34eb89")
                .setDescription(`${createdEmoji} | emoji \`${createdEmoji.name}\` criado com sucesso!`)

            message.reply({ embeds: [embed] })
        }

    }
}

function isLink(str) {
    const linkRegex = /^(http|https):\/\/[^ "]+$/;
    return linkRegex.test(str);
}