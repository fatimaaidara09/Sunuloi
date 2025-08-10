const { Commentaire } = require('../models');

module.exports = {
  async getAll(req, res) {
    try {
      const commentaires = await Commentaire.findAll();
      res.json(commentaires);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const commentaire = await Commentaire.create(req.body);
      res.status(201).json(commentaire);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};
