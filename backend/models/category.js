'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    nom: DataTypes.STRING
  });

  Category.associate = (models) => {
    Category.hasMany(models.Document, { foreignKey: 'categorieId' });
  };

  return Category;
};
