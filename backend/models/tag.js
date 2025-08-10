'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    nom: DataTypes.STRING
  }, {});

  Tag.associate = function(models) {
    Tag.belongsToMany(models.Document, {
      through: 'DocumentTag',
      foreignKey: 'tagId'
    });
  };

  return Tag;
};
