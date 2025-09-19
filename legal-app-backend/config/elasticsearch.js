// config/elasticsearch.js - Version complète
const { Client } = require('@elastic/elasticsearch');

const esClient = new Client({
  node: process.env.ELASTICSEARCH_HOST || 'http://localhost:9200',
  auth: (process.env.ELASTIC_USER && process.env.ELASTIC_PASSWORD) ? {
    username: process.env.ELASTIC_USER,
    password: process.env.ELASTIC_PASSWORD
  } : undefined,
  requestTimeout: 30000,
  pingTimeout: 3000
});

// Créer les index nécessaires
async function createIndices() {
  const indices = [
    {
      index: 'texts',
      mapping: {
        properties: {
          title: { type: 'text', analyzer: 'french' },
          body: { type: 'text', analyzer: 'french' },
          category: { type: 'keyword' },
          publishedAt: { type: 'date' }
        }
      }
    },
    {
      index: 'journal_officiel',
      mapping: {
        properties: {
          title: { type: 'text', analyzer: 'french' },
          content: { type: 'text', analyzer: 'french' },
          type: { type: 'keyword' },
          publication_date: { type: 'date' },
          is_urgent: { type: 'boolean' }
        }
      }
    },
    {
      index: 'jurisprudence',
      mapping: {
        properties: {
          case_number: { type: 'keyword' },
          court: { type: 'keyword' },
          summary: { type: 'text', analyzer: 'french' },
          full_text: { type: 'text', analyzer: 'french' },
          domain: { type: 'keyword' },
          keywords: { type: 'keyword' },
          date_decision: { type: 'date' }
        }
      }
    }
  ];

  for (const { index, mapping } of indices) {
    const exists = await esClient.indices.exists({ index });
    if (!exists) {
      await esClient.indices.create({ index, body: { mappings: mapping } });
      console.log(`✅ Index ${index} créé`);
    }
  }
}

// Exporter avec initialisation
module.exports = { esClient, createIndices };