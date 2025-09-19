// legal-app-backend/config/redis.js
require('dotenv').config();
const Redis = require('ioredis');

const client = new Redis({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
  // password: process.env.REDIS_PASSWORD || undefined
});

client.on('error', (err) => console.error('Redis error:', err));
client.on('connect', () => console.log('Redis client connecting...'));

module.exports = client;
