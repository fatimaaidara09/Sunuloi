'use strict';
module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    titre: DataTypes.STRING,
    contenu: DataTypes.TEXT,
    date_publication: DataTypes.DATE,
    categorieId: DataTypes.INTEGER,
    type_document: DataTypes.STRING
  });

  Document.associate = (models) => {
    Document.belongsTo(models.Category, { foreignKey: 'categorieId' });
    Document.hasMany(models.Commentaire);
    Document.belongsToMany(models.Tag, { through: models.DocumentTag });
    Document.hasMany(models.Historique);
  };

  return Document;
};

