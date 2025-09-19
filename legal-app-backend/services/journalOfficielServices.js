// services/journalOfficielService.js
const JournalOfficiel = require('../models/JournalOfficiel');
const esClient = require('../config/elasticsearch');

class JournalOfficielService {
  async getPublications({ page, limit, filters }) {
    const offset = (page - 1) * limit;
    const where = {};
    
    if (filters.type) where.type = filters.type;
    if (filters.urgent) where.is_urgent = true;
    if (filters.dateFrom && filters.dateTo) {
      where.publication_date = {
        [Op.between]: [filters.dateFrom, filters.dateTo]
      };
    }

    const { count, rows } = await JournalOfficiel.findAndCountAll({
      where,
      limit,
      offset,
      order: [['publication_date', 'DESC']]
    });

    return { total: count, items: rows };
  }

  async getPublicationById(id) {
    return await JournalOfficiel.findByPk(id);
  }

  async incrementViews(id) {
    await JournalOfficiel.increment('views_count', { where: { id } });
  }

  // Indexation Elasticsearch
  async indexPublication(publication) {
    await esClient.index({
      index: 'journal_officiel',
      id: publication.id,
      body: {
        title: publication.title,
        type: publication.type,
        content: publication.content,
        publication_date: publication.publication_date,
        is_urgent: publication.is_urgent
      }
    });
  }
}

module.exports = new JournalOfficielService();