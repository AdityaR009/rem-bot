const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'update',
  description: 'Tampilkan info update terbaru bot',
  async execute(message) {
    const embed = new EmbedBuilder()
      .setTitle('🛠️ Update Bot v1.3')
      .setColor('Purple')
      .setDescription('Berikut adalah pembaruan terbaru pada bot ini:')
      .addFields(
        {
          name: '🎵 Fitur Pemutar Musik',
          value: [
            '`/play [judul/url]` - Memutar musik dari YouTube',
            '`/pause` - Menjeda musik',
            '`/resume` - Melanjutkan musik',
            '`/skip` - Melewati lagu saat ini',
            '`/queue` - Menampilkan daftar antrean',
            '`/loop` - Mengaktifkan mode loop',
            '`/volume [+ / - / angka]` - Atur volume musik'
          ].join('\n'),
        },
        {
          name: '🔞 NSFW Commands (Update)',
          value: [
            '`/armpit` - Gambar NSFW armpit (rule 34)',
            '`/yuri` - Gambar NSFW yuri anime',
            '`/blowjob` - GIF NSFW blowjob anime',
            '`/neko` - Gambar kucing NSFW',
            '`/h + (tags)` - Pencarian Gambar NSFW (sumber lain)'

          ].join('\n'),
        }
      )
      .setFooter({ text: 'Gunakan command dengan bijak. REM v1.3' });

    message.channel.send({ embeds: [embed] });
  }
};
