const { first } = require('lodash');
const fetch = require('node-fetch');
const { LastfmUsers } = require('../db.js');

const getLastfmUser = async (user) => {
  if (!user.id) {
    return user;
  }

  const lastfmUser = await LastfmUsers.findOne({ where: { discordUserId: user.id } });

  if (!lastfmUser) {
    return user.username;
  }

  return lastfmUser.username;
};

class LastfmApi {
  constructor() {
    this.url = `http://ws.audioscrobbler.com/2.0/?api_key=${process.env.LASTFM_API_KEY}&format=json`;
  }

  async callApi(channel, username, method) {
    const data = await fetch(`${this.url}&user=${username}&method=${method}`)
      .then((res) => res.json())
      .then((response) => {
        if (6 === response.error && 'User not found' === response.message) {
          channel.send(`L'utilisateur ${username} n'existe pas sur Last.fm!`);

          throw new Error();
        }

        return response;
      });

    return data;
  }

  async getLastScrobble(user, channel) {
    const username = await getLastfmUser(user);

    try {
      const scrobbles = await this.callApi(channel, username, 'user.getrecenttracks');

      const lastScrobble = first(scrobbles.recenttracks.track);

      if (!lastScrobble) {
        channel.send(`Pas de scrobble pour ${username}.`);

        return;
      }

      if (lastScrobble['@attr'] && 'true' === lastScrobble['@attr'].nowplaying) {
        channel.send(`En cours: ${lastScrobble.artist['#text']} - ${lastScrobble.name}`);

        return;
      }

      const tsString = (new Date(lastScrobble.date.uts * 1000)).toLocaleString('fr');
      channel.send(`Dernier titre écouté: ${lastScrobble.artist['#text']} - ${lastScrobble.name} le ${tsString.substring(0, tsString.length - 3)}`);
    } catch (error) {
      // error already handled
    }
  }
}

module.exports = LastfmApi;
