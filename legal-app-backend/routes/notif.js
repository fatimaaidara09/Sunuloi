// Notifications de l'utilisateur
router.get('/notifications', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { unreadOnly = false } = req.query;
    
    const notifications = await notificationService.getUserNotifications(userId, {
      unreadOnly: unreadOnly === 'true'
    });
    
    res.json({
      success: true,
      data: notifications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des notifications',
      error: error.message
    });
  }
});

// Marquer une notification comme lue
router.put('/notifications/:id/read', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    await notificationService.markAsRead(id, userId);
    
    res.json({
      success: true,
      message: 'Notification marquée comme lue'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour de la notification',
      error: error.message
    });
  }
});