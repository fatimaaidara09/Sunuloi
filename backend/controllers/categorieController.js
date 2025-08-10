const { Category } = require('../models');

module.exports = {
  async getAll(req, res) {
    try {
      const categories = await Category.findAll();
      res.json(categories);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const newCat = await Category.create(req.body);
      res.status(201).json(newCat);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};
