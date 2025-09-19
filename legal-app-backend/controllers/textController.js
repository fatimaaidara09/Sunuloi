// legal-app-backend/controllers/textController.js
const { Op } = require('sequelize');
const Text = require('../models/Text');

exports.getTexts = async (req, res) => {
  try {
    const page = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.limit || 20);
    const q = req.query.q || '';
    const category = req.query.category;

    const where = {};
    if (category) where.category = category;
    if (q) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${q}%` } },
        { body: { [Op.iLike]: `%${q}%` } }
      ];
    }

    const offset = (page - 1) * limit;
    const { count, rows } = await Text.findAndCountAll({
      where,
      limit,
      offset,
      order: [['publishedAt', 'DESC']]
    });

    res.json({ total: count, items: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.getTextById = async (req, res) => {
  try {
    const t = await Text.findByPk(req.params.id);
    if (!t) return res.status(404).json({ message: 'Texte non trouvé' });
    res.json(t);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.createText = async (req, res) => {
  try {
    const { title, body, category, source } = req.body;
    const t = await Text.create({ title, body, category, source, publishedAt: new Date() });
    res.status(201).json(t);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
