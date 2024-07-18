const { QueueRepeatMode, useQueue } = require('discord-player');
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { Translate } = require('../../process_tools');

module.exports = {
    name: 'loop',
    description:('Toggle the looping of song\'s or the whole queue'),
    voiceChannel: true,
    options: [
        {
            name: 'action',
            description:('What action you want to preform on the loop'),
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                { name: 'Queue', value: 'enable_loop_queue' },
                { name: 'Disable', value: 'disable_loop' },
                { name: 'Song', value: 'enable_loop_song' },
                { name: 'Autoplay', value: 'enable_autoplay' },
            ],
        }
    ],

   async execute({ inter }) {
        const queue = useQueue(inter.guild);
        const errorMessage = await Translate(`Erreur <${inter.member}>... reesaye ? <❌>`);
        let baseEmbed = new EmbedBuilder()
            .setColor('#2f3136');

        if (!queue?.isPlaying()) return inter.editReply({ content: await Translate(`Pas de musique en cours <${inter.member}>... <❌>`) });

        switch (inter.options._hoistedOptions.map(x => x.value).toString()) {
            case 'enable_loop_queue': {
                if (queue.repeatMode === QueueRepeatMode.TRACK) return inter.editReply({ content: `Tu dois desactiver la musique dans la loop mode (\`/loop Disable\`) ${inter.member}... ? ❌` });

                const success = queue.setRepeatMode(QueueRepeatMode.QUEUE);
                baseEmbed.setAuthor({ name: success ? errorMessage : await Translate(`Repeat mode activé toute la file va être loop <🔁>`) })

                return inter.editReply({ embeds: [baseEmbed] });
            }
            case 'disable_loop': {
                if (queue.repeatMode === QueueRepeatMode.OFF) return inter.editReply({ content: await Translate(`Tu dois d'abord activer le loop mode <(/loop Queue or /loop Song)> <${inter.member}>... ? <❌>`) });

                const success = queue.setRepeatMode(QueueRepeatMode.OFF);
                baseEmbed.setAuthor({ name: success ? errorMessage : await Translate(`Repeat mode désactivé <🔁>`) })

                return inter.editReply({ embeds: [baseEmbed] });
            }
            case 'enable_loop_song': {
                if (queue.repeatMode === QueueRepeatMode.QUEUE) return inter.editReply({ content: await Translate(`Tu dois desactiver la musique dans la loop mode <(\`/loop Disable\`)> <${inter.member}>... ? <❌>`) });

                const success = queue.setRepeatMode(QueueRepeatMode.TRACK);
                baseEmbed.setAuthor({ name: success ? errorMessage : await Translate(`Reapet mode enabled <\`/loop disable\` >)`) })

                return inter.editReply({ embeds: [baseEmbed] });
            }
            case 'enable_autoplay': {
                if (queue.repeatMode === QueueRepeatMode.AUTOPLAY) return inter.editReply({ content: await Translate(`Tu dois d'abord désactiver la musique <(\`/loop Disable\`)> <${inter.member}>... try again ? <❌>`) });

                const success = queue.setRepeatMode(QueueRepeatMode.AUTOPLAY);
                baseEmbed.setAuthor({ name: success ? errorMessage : await Translate(`Autoplay activé <🔁>`) })

                return inter.editReply({ embeds: [baseEmbed] });
            }
        }
    }
}