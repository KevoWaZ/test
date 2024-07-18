const { EmbedBuilder } = require('discord.js');
const { Translate } = require('../../process_tools');

module.exports = (queue, track) => {
    if (!client.config.app.extraMessages) return;

    (async () => {
        const embed = new EmbedBuilder()
        .setAuthor({ name: await Translate(`Musique <${track.title}> ajouté <✅>`), iconURL: track.thumbnail })
        .setColor('#2f3136');

        queue.metadata.channel.send({ embeds: [embed] });
    })()
}