const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: 'manga',
  description: 'Cari informasi manga dari MyAnimeList',
  async execute(message, args) {
    const query = args.join(' ');
    if (!query) return message.reply('❗ Ketik judul manganya. Contoh: `!manga tokyo ghoul`');

    try {
      const res = await fetch(`https://api.jikan.moe/v4/manga?q=${encodeURIComponent(query)}&limit=1`);
      const data = await res.json();

      if (!data || !data.data || data.data.length === 0) {
        return message.reply('📚 Manga tidak ditemukan.');
      }

      const manga = data.data[0];

      const embed = new EmbedBuilder()
        .setTitle(manga.title)
        .setURL(manga.url)
        .setDescription(manga.synopsis?.slice(0, 300) + '...')
        .setImage(manga.images.jpg.image_url)
        .addFields(
          { name: 'Tipe', value: manga.type || 'N/A', inline: true },
          { name: 'Volume', value: `${manga.volumes || 'N/A'}`, inline: true },
          { name: 'Chapter', value: `${manga.chapters || 'N/A'}`, inline: true },
          { name: 'Status', value: manga.status || 'N/A', inline: true },
          { name: 'Skor', value: `${manga.score || 'N/A'}`, inline: true }
        )
        .setFooter({ text: 'Sumber: MyAnimeList via Jikan API' })
        .setColor(0x805AD5);

      message.channel.send({ embeds: [embed] });

    } catch (err) {
      console.error(err);
      message.reply('⚠️ Terjadi kesalahan saat mencari manga.');
    }
  }
};