// Recherche générale
router.get('/search', searchLimit, async (req, res) => {
  try {
    const { 
      query, 
      type = 'all', 
      page = 1, 
      limit = 10,
      sort = 'relevance',
      filters = {}
    } = req.query;

    const searchResults = await searchService.search({
      query,
      type,
      page: parseInt(page),
      limit: parseInt(limit),
      sort,
      filters: JSON.parse(filters || '{}')
    });

    res.json({
      success: true,
      data: searchResults,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: searchResults.total,
        pages: Math.ceil(searchResults.total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la recherche',
      error: error.message
    });
  }
});

// Recherche vocale avec transcription
router.post('/search/voice', searchLimit, async (req, res) => {
  try {
    const { audioData, language = 'fr-FR' } = req.body;
    
    // Transcription audio vers texte
    const transcript = await speechService.transcribe(audioData, language);
    
    // Recherche avec le texte transcrit
    const searchResults = await searchService.search({
      query: transcript.text,
      type: 'all',
      page: 1,
      limit: 10
    });

    res.json({
      success: true,
      transcript: transcript.text,
      confidence: transcript.confidence,
      data: searchResults
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la recherche vocale',
      error: error.message
    });
  }
});