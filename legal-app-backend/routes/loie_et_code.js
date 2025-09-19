// Liste des codes
router.get('/codes', apiLimit, async (req, res) => {
  try {
    const { page = 1, limit = 10, category } = req.query;
    
    const codes = await codesService.getCodes({
      page: parseInt(page),
      limit: parseInt(limit),
      category
    });

    res.json({
      success: true,
      data: codes.items,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: codes.total,
        pages: Math.ceil(codes.total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des codes',
      error: error.message
    });
  }
});

// Articles d'un code spécifique
router.get('/codes/:codeId/articles', apiLimit, async (req, res) => {
  try {
    const { codeId } = req.params;
    const { page = 1, limit = 20, search } = req.query;

    const articles = await codesService.getCodeArticles(codeId, {
      page: parseInt(page),
      limit: parseInt(limit),
      search
    });

    res.json({
      success: true,
      data: articles
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des articles',
      error: error.message
    });
  }
});

