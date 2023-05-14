const Discord = require('discord.js')
module.exports = (title, logtext, client) => {
    const embed = new Discord.EmbedBuilder()
    .setColor("#e534eb")
    .setTitle(title)
    .setDescription(logtext)
    .setTimestamp()
    .setThumbnail(client.user.avatarURL())

    client.settings.logsChannel.send({embeds: [embed]}).catch(() => {})
}