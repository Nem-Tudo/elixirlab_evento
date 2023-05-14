const Discord = require("discord.js")

module.exports = (text, inMessageObject = true) => {
    const embed = new Discord.EmbedBuilder()
        .setColor("#eb4034")
        .setDescription(`<:icon_x:1107037830544359444> ${text}`)

    if (inMessageObject) return { embeds: [embed] }
    return embed
}