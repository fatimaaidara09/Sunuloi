// middlewares/searchLimit.js
module.exports = (req, res, next) => {
  const { limit } = req.query;
  if (limit && parseInt(limit) > 50) {
    return res.status(400).json({
      success: false,
      message: 'Le nombre de résultats maximum est limité à 50.'
    });
  }
  next();
};
