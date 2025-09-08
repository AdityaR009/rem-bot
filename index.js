const { Client, GatewayIntentBits, Collection, EmbedBuilder } = require('discord.js');
const { DisTube } = require("distube");
const { SoundCloudPlugin } = require('@distube/soundcloud');
const fs = require('fs');
const path = require('path');


// Aktifkan intents, termasuk GUILD_MEMBERS untuk menyambut user baru
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates, // untuk musik
    GatewayIntentBits.GuildMembers       // untuk menyapa
  ],
});

// 💡 Buat Distube instance dan pasang ke client
const distube = new DisTube(client, {
  emitNewSongOnly: true,
  plugins: [
    new SoundCloudPlugin()
  ],
});


const prefix = process.env.PREFIX || '!';
client.commands = new Collection();

// 🔁 Load semua command dari folder /commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// ✅ Event saat bot aktif
client.once('ready', () => {
  console.log(`✅ Bot aktif sebagai ${client.user.tag}`);

  // Status: Menonton doujin
  client.user.setActivity('TIM SUKSES ADITYA', { type: 'WATCHING' });

  // Alternatif:
  // client.user.setActivity('waifu NSFW 😳', { type: 'PLAYING' });
  // client.user.setActivity('musik anime', { type: 'LISTENING' });
  // client.user.setActivity('https://twitch.tv/namastream', { type: 'STREAMING' });

  // Online status (default: online)
  client.user.setStatus('online'); // bisa juga: 'idle', 'dnd', 'invisible'
});

// 📥 Event saat member baru masuk
client.on('guildMemberAdd', async member => {
  const channel = member.guild.channels.cache.find(
    ch => ch.name === 'welcome' && ch.type === 0 // 0 = text channel
  );
  if (!channel) return;

  const embed = new EmbedBuilder()
    .setTitle('👋 Selamat Datang!')
    .setDescription(`Halo <@${member.id}>, selamat datang di server **${member.guild.name}**!`)
    .setColor(0x00AE86)
    .setThumbnail(member.user.displayAvatarURL())
    .setFooter({ text: 'Jangan lupa perkenalkan diri ya!' })
    .setTimestamp();

  channel.send({ embeds: [embed] });
});

// 🎯 Listener untuk command dengan prefix (!)
client.on('messageCreate', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);
  if (!command) return;

  try {
    command.execute(message, args, distube);
  } catch (error) {
    console.error(error);
    message.reply('❌ Terjadi kesalahan saat menjalankan perintah.');
  }
});
console.log("Token terbaca:", process.env.TOKEN ? "✅ YA" : "❌ TIDAK");


require('dotenv').config();
// 🔑 Jalankan bot
client.login(process.env.TOKEN);
