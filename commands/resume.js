module.exports = {
  name: 'skip',
  description: 'Melewati lagu saat ini',
  execute(message, args, distube) {
    const queue = distube.getQueue(message);
    if (!queue) return message.reply('🚫 Tidak ada lagu yang bisa dilewati.');
    distube.skip(message);
    message.reply('⏭️ Lagu dilewati.');
  }
};