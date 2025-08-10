import { useState, useEffect } from 'react';
import { textService } from '../services/textService';

export const useTexts = (initialParams = {}) => {
  const [texts, setTexts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [params, setParams] = useState(initialParams);

  useEffect(() => {
    fetchTexts();
  }, [params]);

  const fetchTexts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await textService.getTexts(params);
      setTexts(response.data);
      setTotalCount(response.total);
    } catch (err) {
      setError(err.message);
      console.error('Erreur lors du chargement des textes:', err);
    } finally {
      setLoading(false);
    }
  };

  const searchTexts = async (query, filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await textService.searchTexts(query, filters);
      setTexts(response.data);
      setTotalCount(response.total);
    } catch (err) {
      setError(err.message);
      console.error('Erreur lors de la recherche:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshTexts = () => {
    fetchTexts();
  };

  const updateParams = (newParams) => {
    setParams(prev => ({ ...prev, ...newParams }));
  };

  return {
    texts,
    loading,
    error,
    totalCount,
    searchTexts,
    refreshTexts,
    updateParams
  };
};

export const useText = (id) => {
  const [text, setText] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchText();
    }
  }, [id]);

  const fetchText = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await textService.getTextById(id);
      setText(response);
      // Marquer comme consulté
      await textService.markAsViewed(id);
    } catch (err) {
      setError(err.message);
      console.error(`Erreur lors du chargement du texte ${id}:`, err);
    } finally {
      setLoading(false);
    }
  };

  return {
    text,
    loading,
    error,
    refetch: fetchText
  };
};