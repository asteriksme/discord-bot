const { Op } = require('sequelize');
const { Quotes } = require('./db.js');

const addQuote = (message, text) => Quotes.create({ quote: text });

const getQuote = async (message, search) => {
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
};

module.exports = {
  addQuote,
  getQuote,
};
