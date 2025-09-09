const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'leave',
  description: 'Mengeluarkan bot dari voice channel',
  async execute(message, args, distube) {
    const queue = distube.getQueue(message);
    if (!queue) return message.reply('❌ Bot tidak sedang memutar musik.');

    try {
      distube.voices.leave(message.guild);
      const embed = new EmbedBuilder()
        .setColor('Red')
        .setTitle('👋 Keluar dari Voice Channel')
        .setDescription('REM telah keluar dari voice channel.')
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      message.reply('❌ Terjadi kesalahan saat mencoba keluar dari voice channel.');
    }
  }
};
