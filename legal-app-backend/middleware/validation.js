const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Erreurs de validation',
      errors: errors.array()
    });
  }
  next();
};

const validateRegister = [
  body('name').trim().isLength({ min: 2 }).withMessage('Le nom doit faire au moins 2 caractères'),
  body('email').isEmail().withMessage('Email invalide'),
  body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit faire au moins 6 caractères'),
  handleValidationErrors
];

const validateLogin = [
  body('email').isEmail().withMessage('Email invalide'),
  body('password').notEmpty().withMessage('Mot de passe requis'),
  handleValidationErrors
];

const validateDocument = [
  body('titre').trim().isLength({ min: 3 }).withMessage('Le titre doit faire au moins 3 caractères'),
  body('type').notEmpty().withMessage('Le type est requis'),
  body('categorieId').notEmpty().withMessage('La catégorie est requise'),
  handleValidationErrors
];

const validateFormation = [
  body('title').trim().isLength({ min: 3 }).withMessage('Le titre doit faire au moins 3 caractères'),
  body('description').trim().isLength({ min: 10 }).withMessage('La description doit faire au moins 10 caractères'),
  body('category').notEmpty().withMessage('La catégorie est requise'),
  handleValidationErrors
];

const validatePost = [
  body('title').trim().isLength({ min: 5 }).withMessage('Le titre doit faire au moins 5 caractères'),
  body('content').trim().isLength({ min: 10 }).withMessage('Le contenu doit faire au moins 10 caractères'),
  body('category').notEmpty().withMessage('La catégorie est requise'),
  handleValidationErrors
];

const validateComparison = [
  body('title').trim().isLength({ min: 3 }).withMessage('Le titre doit faire au moins 3 caractères'),
  body('documents').isArray({ min: 2 }).withMessage('Au moins 2 documents sont requis'),
  handleValidationErrors
];

const validateUser = [
  body('name').trim().isLength({ min: 2 }).withMessage('Le nom doit faire au moins 2 caractères'),
  body('email').isEmail().withMessage('Email invalide'),
  handleValidationErrors
];

module.exports = {
  validateRegister,
  validateLogin,
  validateDocument,
  validateFormation,
  validatePost,
  validateComparison,
  validateUser
};