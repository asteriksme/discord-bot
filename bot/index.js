const Discord = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

const { randomRole } = require('./config.js');
const { getRandomColor } = require('./utils.js');

const TIMER_UPDATE_RANDOM_ROLE = 20 * 1000;

const client = new Discord.Client();

const init = async () => {
  const guild = await client.guilds.resolve(process.env.DISCORD_SERVER_ID);

  setInterval(() => {
    guild.roles.fetch(randomRole)
      .then(async (role) => role.setColor(getRandomColor()));
  }, TIMER_UPDATE_RANDOM_ROLE);
};

client.once('ready', init);

const handleMessage = (msg) => {
  if ('ping' === msg.content) {
    msg.reply('Pong!');
  }
};

client.on('message', handleMessage);

client.login(process.env.DISCORD_TOKEN);
