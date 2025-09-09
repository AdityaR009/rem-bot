const axios = require('axios');
const { EmbedBuilder } = require('discord.js');
const xml2js = require('xml2js');

module.exports = {
  name: 'yuri',
  description: 'Kirim gambar NSFW bertema yuri dari rule34.xxx',
  async execute(message) {
    if (!message.channel.nsfw) {
      return message.reply("❌ Command ini hanya bisa digunakan di channel NSFW.");
    }

    try {
      const response = await axios.get('https://rule34.xxx/index.php?page=dapi&s=post&q=index&tags=yuri&limit=100');
      const parser = new xml2js.Parser();
      const result = await parser.parseStringPromise(response.data);
      const posts = result.posts.post;

      if (!posts || posts.length === 0) {
        return message.reply('Tidak ditemukan gambar yuri.');
      }

      const randomPost = posts[Math.floor(Math.random() * posts.length)];
      const imageUrl = randomPost.$.file_url;

      const embed = new EmbedBuilder()
        .setTitle('💞 NSFW Yuri')
        .setImage(imageUrl)
        .setColor('Purple')
        .setFooter({ text: 'Sumber: rule34.xxx' });

      message.channel.send({ embeds: [embed] });

    } catch (error) {
      console.error(error);
      message.reply('Gagal mengambil gambar dari rule34.');
    }
  }
};
