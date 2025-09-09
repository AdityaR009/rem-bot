const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: 'pukul',
  description: 'Memukul user lain dengan gif anime!',
  async execute(message, args) {
    const target = message.mentions.users.first();
    if (!target) {
      return message.reply('❗ Kamu harus tag seseorang untuk dipukul! Contoh: `!pukul @username`');
    }

    try {
      // Ambil GIF dari API
      const res = await fetch('https://nekos.best/api/v2/slap');
      const data = await res.json();
      const gifUrl = data.results[0].url;

      // Buat embed
      const embed = new EmbedBuilder()
        .setTitle('👊 PUKULAN MEMATIKAN!')
        .setDescription(`**${message.author.username}** memukul **${target.username}**!`)
        .setImage(gifUrl)
        .setColor(0xff5555)
        .setFooter({ text: 'Dihidangkan oleh nekos.best' });

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      message.reply('❌ Gagal mengambil gif pukulan.');
    }
  }
};