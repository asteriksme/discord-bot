const { first, last } = require('lodash');
const LastfmApi = require('../api/lastfm');
const { LastfmUsers } = require('../db.js');

const lastfmApi = new LastfmApi();

const linkAccount = async (user, username) => {
  const existingUser = await LastfmUsers.findOne({ where: { discordUserId: user.id } });

  if (existingUser) {
    await LastfmUsers.update({ username }, { where: { discordUserId: user.id } });
  } else {
    await LastfmUsers.create({ discordUserId: user.id, username });
  }
};

const lastfm = {
  help: '`!lastfm link <username>`\n\tLier son compte lastfm\n`!lastfm [@user|username]`\n\tAfficher le titre en cours ou dernier titre joué',
  command: (message, args) => {
    if (!args) {
      lastfmApi.getLastScrobble(message.author, message.channel);

      return;
    }

    const argsArray = args.split(' ');
    const firstArg = first(argsArray);
    switch (firstArg) {
      case 'link':
        if (!argsArray[1]) {
          linkAccount(message.author, message.author.username);

          return;
        }

        linkAccount(message.author, argsArray[1]);

        return;
      default: {
        let userId;
        // eslint-disable-next-line no-cond-assign
        if (userId = last(firstArg.match(/<@[^\d]?(\d+)/))) {
          const user = message.guild.members.resolve(userId);
          lastfmApi.getLastScrobble(user, message.channel);
        } else {
          lastfmApi.getLastScrobble(firstArg, message.channel);
        }

        break;
      }
    }
  },
};

module.exports = lastfm;
