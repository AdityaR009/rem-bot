module.exports = {
  name: 'queue',
  description: 'Menampilkan antrean lagu',
  execute(message, args, distube) {
    const queue = distube.getQueue(message);
    if (!queue) return message.reply('🚫 Antrean kosong.');

    const q = queue.songs.map((song, i) => `${i + 1}. ${song.name} - \`${song.formattedDuration}\``).join('\n');
    message.channel.send(`🎶 **Antrean Lagu:**\n${q}`);
  }
};