// src/hooks/useForumActivity.js
import { useState, useEffect } from 'react';
import { dashboardAPI } from '../services/api';

export const useForumActivity = () => {
  const [forumActivity, setForumActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    questions: 0,
    responses: 0,
    likes: 0,
    bestAnswers: 0
  });

  useEffect(() => {
    loadForumActivity();
  }, []);

  const loadForumActivity = async () => {
    try {
      setLoading(true);
      const data = await dashboardAPI.getForumActivity();
      setForumActivity(data);
      calculateStats(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (activities) => {
    const questions = activities.filter(a => a.type === 'question').length;
    const responses = activities.filter(a => a.type === 'response').length;
    const likes = activities.reduce((sum, a) => sum + (a.likes || 0), 0);
    const bestAnswers = activities.filter(a => a.bestAnswer).length;

    setStats({ questions, responses, likes, bestAnswers });
  };

  const addNewActivity = (activity) => {
    setForumActivity(prev => [activity, ...prev]);
    calculateStats([activity, ...forumActivity]);
  };

  return {
    forumActivity,
    stats,
    loading,
    error,
    refreshActivity: loadForumActivity,
    addNewActivity
  };
};
