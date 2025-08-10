'use strict';
module.exports = (sequelize, DataTypes) => {
  const Utilisateur = sequelize.define('Utilisateur', {
    nom: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  
  Utilisateur.associate = function(models) {
    Utilisateur.hasMany(models.Commentaire);
    Utilisateur.hasMany(models.Historique);
  };

  return Utilisateur;
};
