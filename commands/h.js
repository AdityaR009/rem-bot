const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  name: 'h',
  description: 'Menampilkan gambar NSFW dari waifu.im',
  async execute(message, args) {
    if (!message.channel.nsfw) {
      return message.reply('❌ Command ini hanya bisa digunakan di channel NSFW.');
    }

    const tag = args[0]; // Optional tag from user input
    const params = { is_nsfw: true };
    if (tag) params.included_tags = tag;

    try {
      const res = await axios.get('https://api.waifu.im/search', { params });
      const image = res.data?.images?.[0];

      if (!image) {
        return message.reply('❌ Tidak ada gambar yang ditemukan untuk tag tersebut.');
      }

      const embed = new EmbedBuilder()
        .setTitle('🔞 NSFW Image')
        .setImage(image.url)
        .setColor(0xff007f)
        .setFooter({ text: `Tags: ${image.tags.map(t => t.name).join(', ')}` });

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      message.reply('❌ Gagal mengambil gambar dari waifu.im.');
    }
  },
};
