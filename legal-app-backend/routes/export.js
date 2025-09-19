// Export de données utilisateur
router.get('/export/user-data', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { format = 'json' } = req.query;
    
    const userData = await userService.exportUserData(userId, format);
    
    res.setHeader('Content-Type', format === 'json' ? 'application/json' : 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="sunuloi-data.${format}"`);
    res.send(userData);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'export',
      error: error.message
    });
  }
});