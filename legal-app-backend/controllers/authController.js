// legal-app-backend/controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // ton model existant

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '24h';

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email + password requis' });
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(409).json({ message: 'Utilisateur déjà existant' });

    const user = await User.create({ firstName, lastName, email, password });
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
    res.json({ user: { id: user.id, email: user.email, firstName: user.firstName }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Identifiants invalides' });

    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ message: 'Identifiants invalides' });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
    res.json({ user: { id: user.id, email: user.email, firstName: user.firstName }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
