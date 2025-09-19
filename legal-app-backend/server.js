require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

// Importation de la configuration DB
const { sequelize, testConnection } = require('./config/database');
const redisClient = require('./config/redis');

// Importation des routes
const authRoutes = require('./routes/auth');
const textRoutes = require('./routes/texts');
const documentRoutes = require('./routes/documentRoutes');
const categorieRoutes = require('./routes/categorieRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware de sécurité
app.use(helmet({
  contentSecurityPolicy: false // Pour le développement
}));

// Configuration CORS
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
}));

// Middleware de parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging en développement
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limite par IP
  message: 'Trop de requêtes, réessayez plus tard.'
});
app.use('/api/', limiter);

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/texts', textRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/categories', categorieRoutes);
app.use('/api/users', userRoutes);

// Route de santé
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API SunuLoi fonctionnelle',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Gestion des routes non trouvées
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route API non trouvée',
    path: req.originalUrl
  });
});

// Middleware de gestion d'erreurs
app.use((error, req, res, next) => {
  console.error('Erreur serveur:', error);
  res.status(500).json({
    success: false,
    message: 'Erreur interne du serveur',
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
});

// Démarrage du serveur
const startServer = async () => {
  try {
    console.log('🚀 Démarrage de SunuLoi API...');

    // Test connexion PostgreSQL
    const dbConnected = await testConnection();
    if (!dbConnected) {
      console.error('❌ Impossible de se connecter à PostgreSQL');
      process.exit(1);
    }

    // Synchronisation des modèles (avec import de tous les modèles)
    const models = require('./models');
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    console.log('✅ Modèles synchronisés');

    // Test connexion Redis
    try {
      await redisClient.ping();
      console.log('✅ Redis connecté');
    } catch (error) {
      console.warn('⚠️ Redis non disponible:', error.message);
    }

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`✅ Serveur SunuLoi démarré sur http://localhost:${PORT}`);
      console.log(`📚 Documentation API: http://localhost:${PORT}/api/health`);
    });

  } catch (error) {
    console.error('❌ Erreur démarrage serveur:', error);
    process.exit(1);
  }
};

// Gestion propre de l'arrêt
process.on('SIGTERM', async () => {
  console.log('🛑 Arrêt du serveur...');
  await sequelize.close();
  await redisClient.quit();
  process.exit(0);
});

startServer();