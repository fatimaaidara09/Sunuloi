// legal-app-backend/server.js
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env.local') });

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const sequelize = require('./config/database'); // Sequelize instance
const redisClient = require('./config/redis');  // Redis client (ioredis ou node-redis)
const esClient = require('./config/elasticsearch'); // Elasticsearch si utilisé

const authRoutes = require('./routes/auth');
const textsRoutes = require('./routes/texts');

const app = express();

const searchRoutes = require('./routes/search');
app.use('/api', searchRoutes);


// --------------------
// Middlewares
// --------------------
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// --------------------
// Routes
// --------------------
app.use('/api/auth', authRoutes);
app.use('/api/texts', textsRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date() }));

// --------------------
// Vérification des variables d'environnement critiques
// --------------------
const requiredEnv = ['DB_USER', 'DB_PASSWORD', 'DB_NAME', 'DB_HOST', 'PORT', 'REDIS_URL'];
requiredEnv.forEach(key => {
  if (!process.env[key]) {
    console.error(`❌ La variable d'environnement ${key} n'est pas définie !`);
    process.exit(1);
  }
});

// --------------------
// Connexion PostgreSQL + Redis + lancement serveur
// --------------------
(async () => {
  try {
    console.log('🔌 Connexion à PostgreSQL...');
    await sequelize.authenticate();
    console.log('✅ PostgreSQL connecté');

    console.log('🔁 Synchronisation des models Sequelize...');
    await sequelize.sync({ alter: true });
    console.log('✅ Models synchronisés');

    console.log('🔌 Connexion à Redis...');
    if (redisClient.connect) await redisClient.connect(); // Pour node-redis v4
    console.log('✅ Redis connecté');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error('❌ Erreur démarrage serveur:', err);
    process.exit(1);
  }
})();
