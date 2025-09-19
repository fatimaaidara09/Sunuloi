// Webhook pour les mises à jour du Journal Officiel
router.post('/webhooks/journal-officiel', async (req, res) => {
  try {
    const signature = req.headers['x-webhook-signature'];
    
    // Vérifier la signature du webhook
    if (!webhookService.verifySignature(req.body, signature)) {
      return res.status(401).json({
        success: false,
        message: 'Signature invalide'
      });
    }

    const { action, data } = req.body;
    
    await webhookService.handleJournalOfficielUpdate(action, data);
    
    res.json({
      success: true,
      message: 'Webhook traité avec succès'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors du traitement du webhook',
      error: error.message
    });
  }
});

module.exports = router;
