'use strict';
module.exports = (sequelize, DataTypes) => {
  const DocumentTag = sequelize.define('DocumentTag', {
    documentId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {});

  DocumentTag.associate = function(models) {
    // Liaison déjà faite dans les autres modèles
  };

  return DocumentTag;
};
