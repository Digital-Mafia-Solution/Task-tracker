const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Task = sequelize.define('Task', {
  task: {
    type: DataTypes.STRING,
    allowNull: false
  },
  priority: {
    type: DataTypes.STRING,
    allowNull: true
  },
  assignedTo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Task;
