const axios = require('axios');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'blowjob',
  description: '🔞 Kirim GIF NSFW anime blowjob',
  async execute(message) {
    if (!message.channel.nsfw) {
      return message.reply('❌ Command ini hanya bisa digunakan di channel NSFW.');
    }

    try {
      const response = await axios.get('https://api.waifu.pics/nsfw/blowjob');
      const imageUrl = response.data.url;

      const embed = new EmbedBuilder()
        .setTitle('🔞 Blowjob GIF')
        .setImage(imageUrl)
        .setColor(0xFF007F)
        .setFooter({ text: 'Sumber: waifu.pics' });

      await message.channel.send({ embeds: [embed] });

    } catch (error) {
      console.error(error);
      message.reply('⚠️ Gagal mengambil gambar blowjob dari waifu.pics');
    }
  }
};

