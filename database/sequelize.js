const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '/home/opc/discord_bot/database/database.sqlite',
  logging: false,
});

module.exports = sequelize;
