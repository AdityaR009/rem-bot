const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'music',
  description: 'Menampilkan semua command bot dalam dua halaman.',
  async execute(message, args) {
    const prefix = process.env.PREFIX || '!';

    // Halaman 1 – Command Umum & Interaksi
    const page1 = new EmbedBuilder()
      .setTitle('🎵 Command untuk music')
      .setDescription('✨ Berikut daftar perintah yang bisa kamu gunakan:')
      .setColor(0x1abc9c)
      .addFields(
        { name: '!play <judul/url>', value: '🔊 Memutar lagu berdasarkan judul atau URL' },
        { name: '!stop', value: '⏹️ Menghentikan musik dan keluar dari voice' },
        { name: '!pause', value: '⏸️ Menjeda musik yang sedang diputar' },
        { name: '!resume', value: '▶️ Melanjutkan musik yang dijeda' },
        { name: '!skip', value: '⏭️ Melewati lagu saat ini' },
        { name: '!queue', value: '📃 Menampilkan antrean lagu' },
        { name: '!volume <angka>', value: '🔊 Mengatur volume (0-500)' },
        { name: '!loop', value: '🔁 Mengaktifkan/mematikan loop lagu saat ini' },
        { name: '!leave', value: '🚪 Mengeluarkan bot dari voice channel' }
      )
      .setFooter({ text: 'Gunakan prefix "' + prefix + '" sebelum setiap perintah.' })
      .setTimestamp();

      await message.channel.send({ embeds: [page1] });
  },
};