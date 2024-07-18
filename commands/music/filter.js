const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { AudioFilters, useQueue } = require('discord-player');
const { Translate } = require('../../process_tools');

module.exports = {
    name: 'filter',
    description:('Add a filter to your track'),
    voiceChannel: true,
    options: [
        {
            name: 'filter',
            description:('The filter you want to add'),
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [...Object.keys(AudioFilters.filters).map(m => Object({ name: m, value: m })).splice(0, 25)],
        }
    ],

    async execute({ inter }) {
        const queue = useQueue(inter.guild);
        if (!queue?.isPlaying()) return inter.editReply({ content: await Translate(`Pas de musique en cours <${inter.member}>... reesaye? <❌>`) });

        const actualFilter = queue.filters.ffmpeg.getFiltersEnabled()[0];
        const selectedFilter = inter.options.getString('filter');

        const filters = [];
        queue.filters.ffmpeg.getFiltersDisabled().forEach(f => filters.push(f));
        queue.filters.ffmpeg.getFiltersEnabled().forEach(f => filters.push(f));

        const filter = filters.find((x) => x.toLowerCase() === selectedFilter.toLowerCase().toString());

        let msg = await Translate (`Ce filtre n'existe pas <${inter.member}>... reesaye? <❌ \n>`) +
            (actualFilter ? await Translate(`Filtre en cours: <**${actualFilter}**. \n>`) : "") +
            await Translate(`Liste de tout les filtres:`);
        filters.forEach(f => msg += `- **${f}**`);

        if (!filter) return inter.editReply({ content: msg });

        await queue.filters.ffmpeg.toggle(filter);

        const filterEmbed = new EmbedBuilder()
            .setAuthor({ name: await Translate(`Le filtre <${filter}> est actuellement <${queue.filters.ffmpeg.isEnabled(filter) ? 'enabled' : 'disabled'}> <✅\n> *Reminder: plus la musique et longue plus c'est long.*`) })
            .setColor('#2f3136');

        return inter.editReply({ embeds: [filterEmbed] });
    }
}