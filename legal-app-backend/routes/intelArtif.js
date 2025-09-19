// Résumé automatique de texte
router.post('/ai/summarize', authMiddleware, apiLimit, async (req, res) => {
  try {
    const { text, length = 'medium' } = req.body;
    
    const summary = await aiService.summarizeText(text, length);
    
    res.json({
      success: true,
      data: {
        summary: summary.text,
        keyPoints: summary.keyPoints,
        confidence: summary.confidence
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors du résumé',
      error: error.message
    });
  }
});

// Analyse de sentiment juridique
router.post('/ai/analyze-sentiment', authMiddleware, apiLimit, async (req, res) => {
  try {
    const { text } = req.body;
    
    const analysis = await aiService.analyzeLegalSentiment(text);
    
    res.json({
      success: true,
      data: analysis
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'analyse de sentiment',
      error: error.message
    });
  }
});

// Chatbot juridique
router.post('/ai/chat', authMiddleware, searchLimit, async (req, res) => {
  try {
    const { message, context = [] } = req.body;
    
    const response = await aiService.chatResponse(message, context);
    
    res.json({
      success: true,
      data: {
        response: response.text,
        sources: response.sources,
        confidence: response.confidence,
        suggestions: response.suggestions
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la réponse du chatbot',
      error: error.message
    });
  }
});

