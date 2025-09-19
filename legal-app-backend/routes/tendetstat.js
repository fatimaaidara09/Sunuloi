// Tendances de recherche
router.get('/trends', apiLimit, async (req, res) => {
  try {
    const { period = '30d', category } = req.query;
    
    const trends = await analyticsService.getTrends(period, category);
    
    res.json({
      success: true,
      data: trends
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des tendances',
      error: error.message
    });
  }
});

// Statistiques générales
router.get('/stats', apiLimit, async (req, res) => {
  try {
    const stats = await analyticsService.getGeneralStats();
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des statistiques',
      error: error.message
    });
  }
});
