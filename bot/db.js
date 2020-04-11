const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  dialect: 'sqlite',
  logging: false,
  storage: 'database.sqlite',
});

const Quotes = sequelize.define('quotes', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quote: Sequelize.TEXT,
});

Quotes.sync();

module.exports = {
  Quotes,
};
