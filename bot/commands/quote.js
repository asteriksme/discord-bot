const { first } = require('lodash');
const { Op } = require('sequelize');
const { Quotes } = require('../db.js');

const quote = {
  help: '`!quote [search]`\n\tAfficher une citation aléatoire.\n`!quote add <quote>`\n\tAjouter une citation.',
  command: async (message, search) => {
    if (search && 'add' === first(search.split(' '))) {
      if (1 === search.split(' ').length) {
        return;
      }
      await Quotes.create({ quote: search.substr(search.indexOf(' ')) });

      message.channel.send('Quote ajoutée.');

      return;
    }

    const params = {};

    if (search) {
      params.where = {
        quote: {
          [Op.like]: `%${search}%`,
        },
      };
    }

    const quotes = await Quotes.findAll(params);
    if (quotes.length > 0) {
      const randIndex = Math.floor(Math.random() * Math.floor(quotes.length));

      message.channel.send(quotes[randIndex].quote);
    } else {
      message.channel.send(`Aucune quote trouvée${search ? ` correspondant à "${search}"` : ''}`);
    }
  },
};

module.exports = quote;
