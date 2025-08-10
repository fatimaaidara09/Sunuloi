const { DocumentTag } = require('../models');

module.exports = {
  async getAll(req, res) {
    try {
      const links = await DocumentTag.findAll();
      res.json(links);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const link = await DocumentTag.create(req.body);
      res.status(201).json(link);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};
