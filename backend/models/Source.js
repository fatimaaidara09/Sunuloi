const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Source = sequelize.define('Source', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nom: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: 'sources',
  timestamps: false
});

module.exports = Source;
