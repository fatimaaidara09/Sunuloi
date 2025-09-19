// src/hooks/useAchievements.js
import { useState, useEffect } from 'react';
import { dashboardAPI } from '../services/api';

export const useAchievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = async () => {
    try {
      setLoading(true);
      const data = await dashboardAPI.getAchievements();
      setAchievements(data);
      calculateTotalPoints(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalPoints = (achievementsData) => {
    const total = achievementsData.reduce((sum, achievement) => sum + achievement.points, 0);
    setTotalPoints(total);
  };

  const addAchievement = (newAchievement) => {
    setAchievements(prev => [...prev, newAchievement]);
    setTotalPoints(prev => prev + newAchievement.points);
  };

  const getAchievementsByCategory = () => {
    const categories = {};
    achievements.forEach(achievement => {
      if (!categories[achievement.category]) {
        categories[achievement.category] = [];
      }
      categories[achievement.category].push(achievement);
    });
    return categories;
  };

  const getAchievementsByRarity = () => {
    const rarity = {};
    achievements.forEach(achievement => {
      if (!rarity[achievement.rarity]) {
        rarity[achievement.rarity] = [];
      }
      rarity[achievement.rarity].push(achievement);
    });
    return rarity;
  };

  return {
    achievements,
    loading,
    error,
    totalPoints,
    refreshAchievements: loadAchievements,
    addAchievement,
    achievementsByCategory: getAchievementsByCategory(),
    achievementsByRarity: getAchievementsByRarity()
  };
};

