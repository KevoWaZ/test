const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require("discord.js");
const { Translate } = require("../../process_tools");

module.exports = (queue, track) => {
  if (!client.config.app.loopMessage && queue.repeatMode !== 0) return;

  let EmojiState = client.config.app.enableEmojis;

  const emojis = client.config.emojis;

  EmojiState = emojis ? EmojiState : false;

  (async () => {
    const embed = new EmbedBuilder()
      .setAuthor({
        name: await Translate(
          `Je joue <${track.title}> dans <${queue.channel.name}> <🎧>`
        ),
        iconURL: track.thumbnail,
      })
      .setColor("#2f3136");

    const back = new ButtonBuilder()
      .setLabel(EmojiState ? emojis.back : 'Back')
      .setCustomId('back')
      .setStyle('Primary');

    const skip = new ButtonBuilder()
      .setLabel(EmojiState ? emojis.skip : 'Skip')
      .setCustomId('skip')
      .setStyle('Primary');

    const resumepause = new ButtonBuilder()
      .setLabel(EmojiState ? emojis.ResumePause : 'Resume & Pause')
      .setCustomId('resume&pause')
      .setStyle('Danger');

    const loop = new ButtonBuilder()
      .setLabel(EmojiState ? emojis.loop : 'Loop')
      .setCustomId('loop')
      .setStyle('Danger');

    const shuffle = new ButtonBuilder()
      .setLabel(EmojiState ? emojis.shuffle : 'Shuffle')
      .setCustomId('shuffle')
      .setStyle('Danger');

    const lyrics = new ButtonBuilder()
      .setLabel(await Translate("Lyrics"))
      .setCustomId("lyrics")
      .setStyle("Secondary");

    const row1 = new ActionRowBuilder().addComponents(
      back,
      loop,
      shuffle
    );
    const row2 = new ActionRowBuilder().addComponents(
      resumepause,
      skip,
      lyrics
    );

    queue.metadata.channel.send({ embeds: [embed], components: [row1, row2] });
  })();
};
