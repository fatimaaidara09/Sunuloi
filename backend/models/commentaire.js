'use strict';
module.exports = (sequelize, DataTypes) => {
  const Commentaire = sequelize.define('Commentaire', {
    contenu: DataTypes.TEXT,
    utilisateurId: DataTypes.INTEGER,
    documentId: DataTypes.INTEGER
  }, {});

  Commentaire.associate = function(models) {
    Commentaire.belongsTo(models.Utilisateur, { foreignKey: 'utilisateurId' });
    Commentaire.belongsTo(models.Document, { foreignKey: 'documentId' });
  };

  return Commentaire;
};
