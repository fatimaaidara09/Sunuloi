const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Categorie = require('./Categorie');
const Source = require('./Source');

const Texte = sequelize.define('Texte', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  titre: { type: DataTypes.STRING, allowNull: false },
  numeroOfficiel: { type: DataTypes.STRING },
  datePublication: { type: DataTypes.DATE },
  contenu: { type: DataTypes.TEXT, allowNull: false },
  typeTexte: { type: DataTypes.STRING }
}, {
  tableName: 'textes',
  timestamps: true
});

// Associations
Texte.belongsTo(Categorie, { foreignKey: 'categorieId' });
Texte.belongsTo(Source, { foreignKey: 'sourceId' });

module.exports = Texte;
