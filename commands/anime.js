const { EmbedBuilder } = require('discord.js');
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
  name: 'anime',
  description: 'Cari video anime dari YouTube',
  async execute(message, args) {
    const query = args.join(' ');
    if (!query) {
      return message.reply('📌 Contoh: `!anime oshi no ko episode 1`');
    }

    try {
      const search = encodeURIComponent(query + ' episode');
      const url = `https://www.youtube.com/results?search_query=${search}`;
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      const script = $('script').filter((i, el) => $(el).html().includes('var ytInitialData')).first().html();
      const jsonRaw = script.replace('var ytInitialData = ', '').replace(/;\s*$/, '');
      const ytData = JSON.parse(jsonRaw);

      const contents = ytData.contents?.twoColumnSearchResultsRenderer?.primaryContents
        ?.sectionListRenderer?.contents?.[0]?.itemSectionRenderer?.contents;

      const video = contents?.find(item => item.videoRenderer);
      if (!video) {
        return message.reply('❌ Tidak ditemukan hasil.');
      }

      const vid = video.videoRenderer;
      const title = vid.title.runs[0].text;
      const videoId = vid.videoId;
      const thumbnail = vid.thumbnail.thumbnails.pop().url;
      const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

      const embed = new EmbedBuilder()
        .setTitle(title)
        .setURL(videoUrl)
        .setImage(thumbnail)
        .setColor(0x00aaff)
        .setFooter({ text: 'Sumber: YouTube (bebas channel)' });

      message.channel.send({ embeds: [embed] });

    } catch (err) {
      console.error(err);
      message.reply('⚠️ Gagal mengambil video dari YouTube.');
    }
  }
};