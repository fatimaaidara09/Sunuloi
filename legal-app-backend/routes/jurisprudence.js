// Recherche de jurisprudence
router.get('/jurisprudence', apiLimit, async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10,
      court,
      domain,
      dateFrom,
      dateTo,
      keywords
    } = req.query;

    const jurisprudence = await jurisprudenceService.getDecisions({
      page: parseInt(page),
      limit: parseInt(limit),
      filters: {
        court,
        domain,
        dateFrom,
        dateTo,
        keywords
      }
    });

    res.json({
      success: true,
      data: jurisprudence.items,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: jurisprudence.total,
        pages: Math.ceil(jurisprudence.total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de la jurisprudence',
      error: error.message
    });
  }
});
