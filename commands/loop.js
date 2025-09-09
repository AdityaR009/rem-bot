module.exports = {
  name: 'loop',
  description: 'Mengaktifkan atau mematikan mode loop',
  execute(message, args, distube) {
    const queue = distube.getQueue(message);
    if (!queue) return message.reply('🚫 Tidak ada lagu yang sedang diputar.');

    let mode = distube.setRepeatMode(message);
    mode = mode === 0 ? 'Off' : mode === 1 ? 'Lagu' : 'Antrean';
    message.reply(`🔁 Mode loop diatur ke: **${mode}**`);
  }
};