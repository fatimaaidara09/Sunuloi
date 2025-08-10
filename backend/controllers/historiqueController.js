const { Historique } = require('../models');

module.exports = {
  async getAll(req, res) {
    try {
      const historiques = await Historique.findAll();
      res.json(historiques);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const historique = await Historique.create(req.body);
      res.status(201).json(historique);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};
