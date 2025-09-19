const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Document = sequelize.define('Document', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  titre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, 255]
    }
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  contenu: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  type: {
    type: DataTypes.ENUM('loi', 'decret', 'arrete', 'circulaire', 'jurisprudence', 'code'),
    allowNull: false
  },
  statut: {
    type: DataTypes.ENUM('brouillon', 'publie', 'archive'),
    defaultValue: 'brouillon'
  },
  categoryId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'Categories',
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  datePublication: {
    type: DataTypes.DATE,
    allowNull: true
  },
  numeroJO: {
    type: DataTypes.STRING,
    allowNull: true
  },
  pageJO: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  source: {
    type: DataTypes.STRING,
    allowNull: true
  },
  fichierUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  vues: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  telechargements: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  metadata: {
    type: DataTypes.JSONB,
    defaultValue: {}
  }
}, {
  tableName: 'documents',
  indexes: [
    { fields: ['type'] },
    { fields: ['statut'] },
    { fields: ['categoryId'] },
    { fields: ['userId'] },
    { fields: ['datePublication'] }
  ]
});

module.exports = Document;
