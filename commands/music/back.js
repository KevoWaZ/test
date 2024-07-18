const { EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
const { Translate } = require('../../process_tools');

module.exports = {
    name: 'back',
    description:("Go back to the last song played"),
    voiceChannel: true,

    async execute({ inter }) {
        const queue = useQueue(inter.guild);
        if (!queue?.isPlaying()) return inter.editReply({ content: await Translate(`Pas de musique en cours <${inter.member}>... reesaye? <❌>`) });

        if (!queue.history.previousTrack) return inter.editReply({ content: await Translate(`Pas de musique précedente <${inter.member}>... reesaye? <❌>`) });

        await queue.history.back();

        const backEmbed = new EmbedBuilder()
            .setAuthor({ name: await Translate(`Ecoute de la musique précedente <✅>`) })
            .setColor('#2f3136');

        inter.editReply({ embeds: [backEmbed] });
    }
}