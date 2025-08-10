'use strict';
module.exports = (sequelize, DataTypes) => {
  const Historique = sequelize.define('Historique', {
    action: DataTypes.STRING,
    utilisateurId: DataTypes.INTEGER,
    documentId: DataTypes.INTEGER,
    date_action: DataTypes.DATE
  }, {});

  Historique.associate = function(models) {
    Historique.belongsTo(models.Utilisateur, { foreignKey: 'utilisateurId' });
    Historique.belongsTo(models.Document, { foreignKey: 'documentId' });
  };

  return Historique;
};
