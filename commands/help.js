const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'Menampilkan semua command bot dalam dua halaman.',
  async execute(message, args) {
    const prefix = process.env.PREFIX || '!';

    // Halaman 1 – Command Umum & Interaksi
    const page1 = new EmbedBuilder()
      .setTitle('📘 Help Menu — Halaman 1/2')
      .setDescription('✨ Berikut daftar perintah umum & hiburan yang bisa kamu gunakan:')
      .setColor(0x1abc9c)
      .addFields(
        { name: '♪ ' + prefix + 'beatmap', value: 'Mencari Beatmap yang di buat Aditya', inline: true },
        { name: '👘 ' + prefix + 'skin', value: 'Mencari SKIN bertema NKRI.', inline: true },
        { name: '🖼️ ' + prefix + 'waifu', value: 'Mengirim gambar waifu random.', inline: true },
        { name: '💋 ' + prefix + 'cium @user', value: 'Mencium user lain dengan gaya anime.', inline: true },
        { name: '💢 ' + prefix + 'tampar @user', value: 'menampar user lain dengan GIF lucu.', inline: true },
        { name: '👊 ' + prefix + 'pukul @user', value: 'Memukul user lain dengan GIF lucu.', inline: true },
        { name: '🤖 ' + prefix + 'rem', value: 'Bot memperkenalkan dirinya.', inline: true },
        { name: '📘 ' + prefix + 'help', value: 'Menampilkan menu bantuan ini.', inline: true },
        { name: '🎵 ' + prefix + 'music', value: 'Menampilkan Command music.', inline: true }
      )
      .setFooter({ text: 'Gunakan prefix "' + prefix + '" sebelum setiap perintah.' })
      .setTimestamp();


// Halaman 2 – Command Informasi & Tambahan
    const page2 = new EmbedBuilder()
      .setTitle('📘 Help Menu — Halaman 2/2')
      .setDescription('🔞 Berikut command WIBU DAN PEMVOKEP:')
      .setColor(0xFF0000)
      .addFields(
        { name: '🔮 ' + prefix + 'ramal', value: 'meramal nasib kamu hari ini.', inline: true },
        { name: '愛 ' + prefix + 'anime', value: 'Menampilkan anime dan link nonton nya.', inline: true },
        { name:'📖 ' + prefix + 'manga', value: 'memberikan info manga.', inline: true },
        { name: '🔞 ' + prefix + 'h + (tags)', value: 'pencarian gambar NSFW).', inline: true },
        { name: '🔞 ' + prefix + 'blowjob', value: 'Kirim GIF ANIME BJ (khusus channel NSFW).', inline: true },
        { name: '🔞 ' + prefix + 'armpit', value: 'Kirim gambar ketek (agak ngawor).', inline: true },
        { name: '🔞 ' + prefix + 'yuri', value: 'Kirim gambar yuri NSFW .', inline: true },
        { name: '🔞 ' + prefix + 'neko', value: 'Kirim gambar kucing NSFW .', inline: true },
        { name: '🔞 ' + prefix + 'hentai', value: 'Kirim gambar waifu NSFW.', inline: true }
      )
      .setFooter({ text: 'Total halaman: 2 | Terima kasih telah menggunakan bot ini!' })
      .setTimestamp();

    // Kirim kedua embed
    await message.channel.send({ embeds: [page1] });
    await message.channel.send({ embeds: [page2] });
  },
};