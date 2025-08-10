// models/Law.js
module.exports = (sequelize, DataTypes) => {
    const Law = sequelize.define("Law", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reference: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT, // Texte complet du texte juridique
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("loi", "décret", "code", "circulaire", "arrêté", "jurisprudence"),
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      tags: {
        type: DataTypes.ARRAY(DataTypes.STRING), // ex : ["droit du travail", "code pénal"]
        allowNull: true,
      }
    });
  
    return Law;
  };
  