const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
const { Translate } = require('../../process_tools');

module.exports = {
    name: 'jump',
    description:("Jumps to particular track in queue"),
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description:('The name/url of the track you want to jump to'),
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: 'number',
            description:('The place in the queue the song is in'),
            type: ApplicationCommandOptionType.Number,
            required: false,
        }
    ],

    async execute({ inter }) {
        const queue = useQueue(inter.guild);
        if (!queue?.isPlaying()) return inter.editReply({ content: await Translate(`Pas de musique en cours <${inter.member}>... reesaye? <❌>`) });

        const track = inter.options.getString('song');
        const number = inter.options.getNumber('number');
        if (!track && !number) inter.editReply({ content: await Translate(`Tu dois utiliser une des options pour jump <${inter.member}>... reesaye? <❌>`) });

        let trackName;
        if (track) {
            const toJump = queue.tracks.toArray().find((t) => t.title.toLowerCase() === track.toLowerCase() || t.url === track);
            if (!toJump) return inter.editReply({ content: await Translate(`Je ne trouve pas <${track}> <${inter.member}>... essaye en metant le lien de la musique <❌>`) });

            queue.node.jump(toJump);
            trackName = toJump.title;
        } else if (number) {
            const index = number - 1;
            const name = queue.tracks.toArray()[index].title;
            if (!name) return inter.editReply({ content: await Translate(`La musique ne semble pas exister <${inter.member}>... <❌>`) });

            queue.node.jump(index);
            trackName = name;
        }

        const jumpEmbed = new EmbedBuilder()
            .setAuthor({ name: await Translate(`Jump to <${trackName}> <✅>`) })
            .setColor('#2f3136');

        inter.editReply({ embeds: [jumpEmbed] });
    }
}
