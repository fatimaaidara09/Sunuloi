// legal-app-backend/config/elasticsearch.js
require('dotenv').config();
const { Client } = require('@elastic/elasticsearch');

const node = process.env.ELASTIC_URL || process.env.ELASTIC_HOST || 'http://localhost:9200';

const esClient = new Client({
  node,
  auth: (process.env.ELASTIC_USER && process.env.ELASTIC_PASSWORD) ? {
    username: process.env.ELASTIC_USER,
    password: process.env.ELASTIC_PASSWORD
  } : undefined
});

module.exports = esClient;
