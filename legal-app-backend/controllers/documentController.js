const { Document, Category, Tag, User } = require('../models');
const { Op } = require('sequelize');

exports.getAll = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      type,
      category,
      search,
      sortBy = 'datePublication',
      sortOrder = 'DESC'
    } = req.query;

    const offset = (page - 1) * limit;
    
    const where = {
      statut: 'publie'
    };

    if (type) where.type = type;
    if (category) where.categoryId = category;
    if (search) {
      where[Op.or] = [
        { titre: { [Op.iLike]: `%${search}%` } },
        { contenu: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const { count, rows } = await Document.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sortBy, sortOrder]],
      include: [
        { model: Category, as: 'category', attributes: ['nom', 'couleur'] },
        { model: User, as: 'author', attributes: ['firstName', 'lastName'] },
        { model: Tag, as: 'tags', attributes: ['nom'] }
      ]
    });

    res.json({
      success: true,
      data: rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        totalPages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('Erreur getAll documents:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const document = await Document.findOne({
      where: { id, statut: 'publie' },
      include: [
        { model: Category, as: 'category' },
        { model: User, as: 'author', attributes: ['firstName', 'lastName'] },
        { model: Tag, as: 'tags' }
      ]
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document non trouvé'
      });
    }

    // Incrémenter les vues
    await document.increment('vues');

    res.json({
      success: true,
      data: document
    });
  } catch (error) {
    console.error('Erreur getById document:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
};

exports.create = async (req, res) => {
  try {
    const {
      titre,
      contenu,
      type,
      categoryId,
      datePublication,
      numeroJO,
      source,
      tags = []
    } = req.body;

    const userId = req.user?.id;

    const document = await Document.create({
      titre,
      contenu,
      type,
      categoryId,
      userId,
      datePublication,
      numeroJO,
      source,
      statut: 'publie'
    });

    // Ajouter les tags si fournis
    if (tags.length > 0) {
      const tagInstances = await Tag.findAll({
        where: { nom: { [Op.in]: tags } }
      });
      await document.setTags(tagInstances);
    }

    const documentWithAssociations = await Document.findByPk(document.id, {
      include: [
        { model: Category, as: 'category' },
        { model: User, as: 'author', attributes: ['firstName', 'lastName'] },
        { model: Tag, as: 'tags' }
      ]
    });

    res.status(201).json({
      success: true,
      data: documentWithAssociations,
      message: 'Document créé avec succès'
    });
  } catch (error) {
    console.error('Erreur create document:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const document = await Document.findByPk(id);
    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document non trouvé'
      });
    }

    await document.update(updateData);

    const updatedDocument = await Document.findByPk(id, {
      include: [
        { model: Category, as: 'category' },
        { model: User, as: 'author', attributes: ['firstName', 'lastName'] },
        { model: Tag, as: 'tags' }
      ]
    });

    res.json({
      success: true,
      data: updatedDocument,
      message: 'Document mis à jour avec succès'
    });
  } catch (error) {
    console.error('Erreur update document:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour'
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const document = await Document.findByPk(id);
    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document non trouvé'
      });
    }

    await document.update({ statut: 'archive' });

    res.json({
      success: true,
      message: 'Document archivé avec succès'
    });
  } catch (error) {
    console.error('Erreur delete document:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression'
    });
  }
};