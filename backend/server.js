// server.js

const app = require('./app');           // Import du serveur Express depuis app.js
const sequelize = require('./config/database');  // Import de la config Sequelize

const PORT = process.env.PORT || 3000;  // Port d'écoute (environnement ou 3000 par défaut)

// Synchronisation de la base de données avec Sequelize
sequelize.sync()
  .then(() => {
    console.log("Base de données synchronisée");

    // Démarrage du serveur Express après la synchro
    app.listen(PORT, () => {
      console.log(`Serveur lancé sur le port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("Erreur lors de la synchronisation de la base de données :", err);
  });
