const Discord = require("discord.js")

module.exports = (usemode, arguments, inMessageObject = true) => {

    const argumentsDescriptions = {
        "User": "Menção de um usuário (@Nem Tudo#7986) ou ID (612651439701098558)",
        "Server": "ID de um servidor (990263436774621214)",
        "Texto": "Texto de escolha, pode conter espaços",
        "Emoji": "Emoji deste ou de outro servidor",
        "Anexo": "Imagem anexada na mensagem",
        "Nome": "Texto, sem espaços",
        "URL": "Link de uma imagem ou gif",
        "Prefixo": "Texto curto sem espaços"
    }



    const lines = [];

    lines.push("<a:a_x:1107438001354702918> Argumentos inválidos foram fornecidos.")
    lines.push("")
    lines.push(`**Como usar:** \`${usemode}\``)
    lines.push("")
    lines.push("**Argumentos:**")
    for (const argument of arguments) {
        lines.push(`<:icon_x:1107037830544359444> \`${argument}\`: ${argumentsDescriptions[argument]}`)
    }

    const embed = new Discord.EmbedBuilder()
        .setColor("#eb4034")
        .setDescription(lines.join("\n"))

    if (inMessageObject) return { embeds: [embed] }
    return embed
}