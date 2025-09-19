const { sequelize } = require('../config/database');
const User = require('./User');
const Text = require('./Text');
const Document = require('./Document');
const Category = require('./Category');
const Tag = require('./Tag');
const Comment = require('./Comment');
const Favorite = require('./Favorite');
const SearchHistory = require('./SearchHistory');
const Notification = require('./Notification');
const Formation = require('./Formation');
const ForumPost = require('./ForumPost');

// Associations
User.hasMany(Document, { foreignKey: 'userId', as: 'documents' });
Document.belongsTo(User, { foreignKey: 'userId', as: 'author' });

User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' });
Comment.belongsTo(User, { foreignKey: 'userId', as: 'author' });

Document.hasMany(Comment, { foreignKey: 'documentId', as: 'comments' });
Comment.belongsTo(Document, { foreignKey: 'documentId', as: 'document' });

Category.hasMany(Document, { foreignKey: 'categoryId', as: 'documents' });
Document.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

User.hasMany(Favorite, { foreignKey: 'userId', as: 'favorites' });
Favorite.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Document.hasMany(Favorite, { foreignKey: 'documentId', as: 'favorites' });
Favorite.belongsTo(Document, { foreignKey: 'documentId', as: 'document' });

User.hasMany(SearchHistory, { foreignKey: 'userId', as: 'searchHistory' });
SearchHistory.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Notification, { foreignKey: 'userId', as: 'notifications' });
Notification.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Tags many-to-many avec Document
const DocumentTag = sequelize.define('DocumentTag', {});
Document.belongsToMany(Tag, { through: DocumentTag, as: 'tags' });
Tag.belongsToMany(Document, { through: DocumentTag, as: 'documents' });

module.exports = {
  sequelize,
  User,
  Text,
  Document,
  Category,
  Tag,
  Comment,
  Favorite,
  SearchHistory,
  Notification,
  Formation,
  ForumPost,
  DocumentTag
};