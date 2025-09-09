module.exports = {
  name: 'stop',
  description: '⏹️ Menghentikan musik dan keluar dari voice channel',
  async execute(message, args, distube) {
    const queue = distube.getQueue(message);
    if (!queue) return message.reply('❌ Tidak ada lagu yang sedang diputar.');

    await distube.stop(message);
    message.channel.send('⏹️ Musik dihentikan dan bot keluar dari voice channel.');
  },
};
