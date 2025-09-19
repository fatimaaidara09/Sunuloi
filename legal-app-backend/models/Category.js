const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  couleur: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '#10b981'
  },
  icone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ordre: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  actif: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'categories'
});

module.exports = Category;