// Favoris de l'utilisateur
router.get('/user/favorites', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const favorites = await userService.getFavorites(userId);
    
    res.json({
      success: true,
      data: favorites
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des favoris',
      error: error.message
    });
  }
});

// Ajouter aux favoris
router.post('/user/favorites', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { documentId, documentType } = req.body;
    
    await userService.addToFavorites(userId, documentId, documentType);
    
    res.json({
      success: true,
      message: 'Document ajouté aux favoris'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'ajout aux favoris',
      error: error.message
    });
  }
});

// Historique de recherche
router.get('/user/search-history', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 20 } = req.query;
    
    const history = await userService.getSearchHistory(userId, {
      page: parseInt(page),
      limit: parseInt(limit)
    });
    
    res.json({
      success: true,
      data: history
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de l\'historique',
      error: error.message
    });
  }
});