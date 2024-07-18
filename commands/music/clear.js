const { EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
const { Translate } = require('../../process_tools');

module.exports = {
    name: 'clear',
    description:('Clear all the music in the queue'),
    voiceChannel: true,

    async execute({ inter }) {
        const queue = useQueue(inter.guild);
        if (!queue?.isPlaying()) return inter.editReply({ content: await Translate(`Pas de musique en cours <${inter.member}>... reesaye? <❌>`) });

        if (!queue.tracks.toArray()[1]) return inter.editReply({ content: await Translate(`Pas de musique suivante <${inter.member}>... reesaye? <❌>`) });

        queue.tracks.clear();

        const clearEmbed = new EmbedBuilder()
            .setAuthor({ name: await Translate(`La file a été vidé! <🗑️>`) })
            .setColor('#2f3136');

        inter.editReply({ embeds: [clearEmbed] });
    }
}