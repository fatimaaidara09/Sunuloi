// services/searchService.js
const esClient = require('../config/elasticsearch');

exports.search = async ({ query, type, page, limit, sort, filters }) => {
  const from = (page - 1) * limit;

  // Gestion du tri
  let sortOption = [];
  if (sort === 'date') {
    sortOption = [{ published_at: { order: 'desc' } }];
  } else {
    // Par pertinence par défaut
    sortOption = ['_score'];
  }

  // Gestion des filtres dynamiques
  let filterConditions = [];
  if (filters.category) {
    filterConditions.push({ term: { category: filters.category } });
  }
  if (filters.tag) {
    filterConditions.push({ term: { tags: filters.tag } });
  }

  // Type de recherche : laws, users, comments...
  let searchFields = ['title^3', 'content', 'reference'];
  if (type === 'users') {
    searchFields = ['name^2', 'email'];
  } else if (type === 'comments') {
    searchFields = ['content'];
  }

  const { hits } = await esClient.search({
    index: type === 'all' ? 'laws' : type, // on reste simple (lois par défaut)
    from,
    size: limit,
    body: {
      query: {
        bool: {
          must: [
            {
              multi_match: {
                query,
                fields: searchFields,
                fuzziness: 'AUTO'
              }
            }
          ],
          filter: filterConditions
        }
      },
      sort: sortOption,
      highlight: {
        fields: {
          title: {},
          content: {}
        }
      }
    }
  });

  return {
    total: hits.total.value,
    results: hits.hits.map(hit => ({
      id: hit._id,
      score: hit._score,
      ...hit._source,
      highlight: hit.highlight
    }))
  };
};
