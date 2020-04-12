const Discord = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

const commands = require('./bot/commands');
const { randomRole } = require('./bot/config.js');
const { getRandomColor } = require('./bot/utils.js');

const PREFIX = '!';
const TIMER_UPDATE_RANDOM_ROLE = 60 * 1000;

const client = new Discord.Client();

const init = async () => {
  const guild = await client.guilds.resolve(process.env.DISCORD_SERVER_ID);
  const role = await guild.roles.fetch(randomRole);

  setInterval(() => role.setColor(getRandomColor()), TIMER_UPDATE_RANDOM_ROLE);
};

client.once('ready', init);

const handleMessage = (msg) => {
  if (msg.content.startsWith(PREFIX)) {
    const input = msg.content.slice(PREFIX.length).split(' ');
    const command = input.shift();
    const args = input.join(' ').trim();

    if (commands[command]) {
      commands[command](msg, args);
    }
  }
};

client.on('message', handleMessage);

client.login(process.env.DISCORD_TOKEN);
