const { forOwn } = require('lodash');

const lastfm = require('./lastfm.js');
const quote = require('./quote.js');
const wtf = require('./wtf.js');

const all = {
  lastfm,
  quote,
  wtf,
};

const helps = {};
const commands = {};

let helpText = '**Liste des commandes**\n\n';

forOwn(all, ({ help, command }, name) => {
  helps[name] = help;
  commands[name] = command;
  helpText = `${helpText}${help}\n\n`;
});

module.exports = {
  ...commands,
  help: (message, search) => {
    if (commands[search]) {
      message.channel.send(helps[search]);
    } else {
      message.channel.send(helpText);
    }
  },
};
