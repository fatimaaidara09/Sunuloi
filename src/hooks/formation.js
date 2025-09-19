// src/hooks/useTrainings.js
import { useState, useEffect } from 'react';
import { dashboardAPI } from '../services/api';

export const useTrainings = () => {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTrainings();
  }, []);

  const loadTrainings = async () => {
    try {
      setLoading(true);
      const data = await dashboardAPI.getTrainings();
      setTrainings(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateTrainingProgress = (trainingId, progress) => {
    setTrainings(prev =>
      prev.map(training =>
        training.id === trainingId
          ? { ...training, progress }
          : training
      )
    );
  };

  const getActiveTrainings = () => {
    return trainings.filter(training => training.progress < 100);
  };

  const getCompletedTrainings = () => {
    return trainings.filter(training => training.progress === 100);
  };

  return {
    trainings,
    loading,
    error,
    refreshTrainings: loadTrainings,
    updateTrainingProgress,
    activeTrainings: getActiveTrainings(),
    completedTrainings: getCompletedTrainings()
  };
};