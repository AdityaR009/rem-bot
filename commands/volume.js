module.exports = {
  name: 'volume',
  description: 'Mengatur volume musik',
  execute(message, args, distube) {
    const queue = distube.getQueue(message);
    if (!queue) return message.reply('🚫 Tidak ada musik yang sedang diputar.');

    const input = args[0];
    let volume = queue.volume;

    if (!input) {
      return message.reply(`🔊 Volume saat ini: **${volume}%**`);
    } else if (input === '+') {
      volume = Math.min(100, volume + 10);
    } else if (input === '-') {
      volume = Math.max(0, volume - 10);
    } else if (!isNaN(input)) {
      volume = Math.max(0, Math.min(500, parseInt(input)));
    } else {
      return message.reply('❌ Format volume salah. Gunakan `+`, `-`, atau angka.');
    }

    distube.setVolume(message, volume);
    message.reply(`🔊 Volume diatur ke: **${volume}%**`);
  }
};
