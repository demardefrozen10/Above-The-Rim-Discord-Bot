const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'C:/Users/jason/Discord Bot/database/database.sqlite',
  logging: false,
});

module.exports = sequelize;
