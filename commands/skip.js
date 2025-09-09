module.exports = {
  name: 'skip',
  description: '⏭️ Melewati lagu saat ini',
  async execute(message, args, distube) {
    const queue = distube.getQueue(message);
    if (!queue) return message.reply('❌ Tidak ada lagu yang sedang diputar.');
    if (queue.songs.length <= 1) return message.reply('⚠️ Tidak ada lagu selanjutnya dalam antrean.');

    await distube.skip(message);
    message.channel.send('⏭️ Lagu dilewati!');
  },
};
