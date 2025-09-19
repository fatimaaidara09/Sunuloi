// legal-app-backend/models/Text.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Text = sequelize.define('Text', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  slug: { type: DataTypes.STRING, allowNull: true },
  body: { type: DataTypes.TEXT, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: true },
  source: { type: DataTypes.STRING, allowNull: true },
  publishedAt: { type: DataTypes.DATE, allowNull: true }
}, {
  timestamps: true,
  tableName: 'texts'
});

module.exports = Text;
