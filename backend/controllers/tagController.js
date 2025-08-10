const { Tag } = require('../models');

module.exports = {
  async getAll(req, res) {
    try {
      const tags = await Tag.findAll();
      res.json(tags);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const tag = await Tag.create(req.body);
      res.status(201).json(tag);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};
