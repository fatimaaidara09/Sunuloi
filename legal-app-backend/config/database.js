// legal-app-backend/config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const DB_NAME = process.env.DB_NAME || process.env.DB_DATABASE || 'legal_app_db';
const DB_USER = process.env.DB_USER || 'legal_app_admin';
const DB_PASS = process.env.DB_PASSWORD || process.env.DB_PASS || 'user123';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 5432;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: { max: 10, min: 0, acquire: 30000, idle: 10000 }
});

module.exports = sequelize;
