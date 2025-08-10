const { Document, Category } = require('../models');

module.exports = {
  async getAll(req, res) {
    try {
      const documents = await Document.findAll({
        include: [{ model: Category }]
      });
      res.json(documents);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const document = await Document.findByPk(req.params.id, {
        include: [{ model: Category }]
      });
      if (!document) return res.status(404).json({ message: 'Document introuvable' });
      res.json(document);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const doc = await Document.create(req.body);
      res.status(201).json(doc);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await Document.update(req.body, {
        where: { id: req.params.id }
      });
      if (!updated) return res.status(404).json({ message: 'Document non trouvé' });
      res.json({ message: 'Document mis à jour' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await Document.destroy({ where: { id: req.params.id } });
      if (!deleted) return res.status(404).json({ message: 'Document non trouvé' });
      res.json({ message: 'Document supprimé' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};
