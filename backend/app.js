const express = require('express');
const app = express();
const { sequelize } = require('./models');

const documentRoutes = require('./routes/documentRoutes');
const categorieRoutes = require('./routes/categorieRoutes');
const utilisateurRoutes = require('./routes/utilisateurRoutes');
const commentaireRoutes = require('./routes/commentaireRoutes');
const tagRoutes = require('./routes/tagRoutes');
const documentTagRoutes = require('./routes/documentTagRoutes');
const historiqueRoutes = require('./routes/historiqueRoutes');



app.use(express.json());

app.use('/api/documents', documentRoutes);
app.use('/api/categories', categorieRoutes);
app.use('/api/utilisateurs', utilisateurRoutes);
app.use('/api/commentaires', commentaireRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/document-tags', documentTagRoutes);
app.use('/api/historiques', historiqueRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion DB réussie');
  } catch (err) {
    console.error('❌ Connexion DB échouée:', err);
  }
});

