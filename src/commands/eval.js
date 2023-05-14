const Discord = require('discord.js')
const util = require('util')
module.exports = {
    name: "eval",
    aliases: ["eval", "ev"],
    permissions: [],
    onlyGuild: false,
    roles: [],
    botModerator: false,
    botAdmin: true,
    description: "Destinado a usos técnicos dos administradores do bot",
    /**
     * 
     * @param {import("discord.js").Message} message 
     * @param {import("discord.js").Client} client 
     * @param {Array} args 
     * @param {{guild, user}} database
     */
    async run (message, client, args, database){
        const guild = message.guild;
        const channel = message.channel;
        const user = message.author;
        try {
            const response = !args.join(' ').includes('--silent')
            const depth = args.join(' ').includes('--depth') ? 10 : 0;
            const texteval = String(args.join(" ")).replace('--silent', '').replace('--depth', '').replace('--async', '')
            let res = undefined; 

            if(args.join(' ').includes('--async')){                
                res = await eval(`(async () => { ${texteval} })()`)
                
            } else {
                res = await eval(texteval)    
            }

            let def = typeof(res);
            res = util.inspect(res, {depth: depth})

            if(!res || res == 'undefined'){
                res = "Nenhum retorno";
            }

            res = res.replace(new RegExp(client.token, 'gi'), '「ｓｅｃｒｅｔ」')

            if(res.length < 3500){
                const embed = new Discord.EmbedBuilder()
                .setTitle('Eval')
                .setDescription('**Retorno:**```js\n' + res + '```\n**Definição:** ```js\n' + def + '```')
                .setColor('#00ff00')
                if(response) message.reply({embeds:[embed]}).catch(() => {})

            } else {
                const evaltext = new Discord.AttachmentBuilder(Buffer.from(res), {name: "response.txt"})
                const embed = new Discord.EmbedBuilder()
                .setTitle('Retorno')
                .setDescription('O retorno foi muito longo. Foi enviado um arquivo de texto.')
                .setColor('#ff0000')
                
                if(response) message.reply({
                    files: [evaltext], 
                    embeds:[embed]
                }).catch(() => {});
            }
        } catch (error) {
            const embed = new Discord.EmbedBuilder()
            .setTitle('Erro')
            .setDescription('```js\n' + error + '```')
            .setColor('#ff0000')
            message.reply({embeds:[embed]}).catch(() => {})
        }
    }
}