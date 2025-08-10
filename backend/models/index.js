'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    const modelPath = path.join(__dirname, file);
    const modelImport = require(modelPath);

    // Si c'est une fonction (comme document.js), on appelle avec (sequelize, DataTypes)
    if (typeof modelImport === 'function' && !modelImport.prototype.init) {
      const model = modelImport(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    } 
    // Sinon, on suppose que c'est une classe Sequelize Model (avec méthode static init)
    else if (typeof modelImport === 'function' && modelImport.prototype.init) {
      const model = modelImport.init(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    }
  });

// Configurer les associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

