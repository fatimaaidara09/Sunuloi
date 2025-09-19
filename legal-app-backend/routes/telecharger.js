// Télécharger un document
router.get('/download/:documentId', async (req, res) => {
  try {
    const { documentId } = req.params;
    const { format = 'pdf' } = req.query;
    
    const document = await documentService.getDocumentForDownload(documentId, format);
    
    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document non trouvé'
      });
    }

    // Incrémenter le compteur de téléchargements
    await documentService.incrementDownloads(documentId);

    res.setHeader('Content-Type', document.mimeType);
    res.setHeader('Content-Disposition', `attachment; filename="${document.filename}"`);
    res.send(document.buffer);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors du téléchargement',
      error: error.message
    });
  }
});