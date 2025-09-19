
router.get('/journal-officiel', apiLimit, async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10,
      type,
      dateFrom,
      dateTo,
      urgent
    } = req.query;

    const publications = await journalOfficielService.getPublications({
      page: parseInt(page),
      limit: parseInt(limit),
      filters: {
        type,
        dateFrom,
        dateTo,
        urgent: urgent === 'true'
      }
    });

    res.json({
      success: true,
      data: publications.items,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: publications.total,
        pages: Math.ceil(publications.total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des publications',
      error: error.message
    });
  }
});

// Détail d'une publication
router.get('/journal-officiel/:id', apiLimit, async (req, res) => {
  try {
    const { id } = req.params;
    const publication = await journalOfficielService.getPublicationById(id);
    
    if (!publication) {
      return res.status(404).json({
        success: false,
        message: 'Publication non trouvée'
      });
    }

    // Incrémenter le compteur de vues
    await journalOfficielService.incrementViews(id);

    res.json({
      success: true,
      data: publication
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de la publication',
      error: error.message
    });
  }
});
