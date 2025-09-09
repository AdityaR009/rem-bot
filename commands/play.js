const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'play',
  description: 'Memutar lagu dari SoundCloud',
  async execute(message, args, distube) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('❌ Kamu harus join voice channel dulu!');

    const query = args.join(' ');
    if (!query) return message.reply('❌ Masukkan nama lagu!');

    try {
      await distube.play(voiceChannel, query, {
        member: message.member,
        textChannel: message.channel,
        message
      });

      // Kirim embed respon
      const embed = new EmbedBuilder()
        .setColor(0x1DB954) // hijau Spotify
        .setTitle('🎵 Lagu Ditambahkan!')
        .setDescription(`**"${query}"**`)
        .addFields(
          { name: '🗣️ Diminta oleh', value: `<@${message.author.id}>`, inline: true },
          { name: '📺 Channel', value: `${voiceChannel.name}`, inline: true }
        )
        .setThumbnail('https://cdn-icons-png.flaticon.com/512/727/727245.png')
        .setFooter({ text: 'Lagu sedang diproses...' })
        .setTimestamp();

      message.channel.send({ embeds: [embed] });

    } catch (error) {
      console.error(error);
      message.reply('❌ Terjadi kesalahan saat memutar lagu.');
    }
  }
};
