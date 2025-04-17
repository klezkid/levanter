const fs = require('fs');
const path = require('path');
const { bot } = require('../lib/');

bot(
  {
    pattern: 'leader',
    desc: 'Sends today’s motivational message.',
    type: 'misc',
  },
  async (m) => {
    try {
      const filePath = path.join(__dirname, '..', 'data', 'leader.json');
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const today = new Date().toISOString().slice(5, 10).replace('-', '/'); // e.g. 04/25
      const entry = data[today];

      if (!entry) {
        return m.reply("No leadership message found for today 💭");
      }

      await m.reply(`*${entry.title}*\n\n${entry.message}`);
    } catch (err) {
      console.error('[.leader error]', err.message);
      await m.reply("⚠️ Failed to load today's message.");
    }
  }
);
