const Discord = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

const client = new Discord.Client();

const handleMessage = (msg) => {
  if ('ping' === msg.content) {
    msg.reply('Pong!');
  }
};

client.on('message', handleMessage);

client.login(process.env.DISCORD_TOKEN);
