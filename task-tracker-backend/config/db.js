const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('tasktracker', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
