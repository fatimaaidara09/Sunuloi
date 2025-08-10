const { Utilisateur } = require('../models');

module.exports = {
  async getAll(req, res) {
    try {
      const users = await Utilisateur.findAll();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const user = await Utilisateur.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};
