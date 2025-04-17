const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'leader',
  category: 'motivation',
  desc: 'Send daily leadership motivation message',
  async run(m, { conn }) {
    try {
      const filePath = path.join(__dirname, '..', 'data', 'leader.json');
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      const today = new Date().toISOString().slice(5, 10).replace('-', '/'); // e.g. "04/18"
      const entry = data[today];

      if (!entry) {
        return await m.reply("No leadership message found for today. 🕊️");
      }

      await m.reply(`*${entry.title}*

${entry.message}`);
    } catch (err) {
      console.error('[.leader error]', err.message);
      await m.reply('⚠️ Failed to load leadership message.');
    }
  }
};