module.exports = {
  name: 'pause',
  description: 'Menjeda musik',
  execute(message, args, distube) {
    const queue = distube.getQueue(message);
    if (!queue) return message.reply('🚫 Tidak ada lagu yang sedang diputar.');
    distube.pause(message);
    message.reply('⏸️ Musik dijeda.');
  }
};