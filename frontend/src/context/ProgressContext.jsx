import React, { createContext, useState, useContext, useEffect } from 'react';
import { progressApi } from '../utils/progressApi';
import { useAuth } from './AuthContext';

const ProgressContext = createContext();

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return context;
};

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, remaining: 0, percentage: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchProgress();
      fetchStats();
    } else {
      setProgress([]);
      setStats({ total: 0, completed: 0, remaining: 0, percentage: 0 });
    }
  }, [isAuthenticated]);

  const fetchProgress = async () => {
    try {
      setLoading(true);
      const data = await progressApi.getUserProgress();
      setProgress(data.progress || []);
    } catch (err) {
      console.error('Failed to fetch progress:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await progressApi.getProgressStats();
      setStats(data.stats || { total: 0, completed: 0, remaining: 0, percentage: 0 });
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  const isSkillCompleted = (skillId) => {
    const skillProgress = progress.find(p => p.skillId === skillId);
    return skillProgress?.completed || false;
  };

  const markComplete = async (skillId, notes = '') => {
    try {
      await progressApi.markSkillComplete(skillId, notes);
      await fetchProgress();
      await fetchStats();
    } catch (err) {
      console.error('Failed to mark complete:', err);
      throw err;
    }
  };

  const markIncomplete = async (skillId) => {
    try {
      await progressApi.markSkillIncomplete(skillId);
      await fetchProgress();
      await fetchStats();
    } catch (err) {
      console.error('Failed to mark incomplete:', err);
      throw err;
    }
  };

  const toggleComplete = async (skillId) => {
    const isCompleted = isSkillCompleted(skillId);
    if (isCompleted) {
      await markIncomplete(skillId);
    } else {
      await markComplete(skillId);
    }
  };

  const value = {
    progress,
    stats,
    loading,
    error,
    fetchProgress,
    fetchStats,
    isSkillCompleted,
    markComplete,
    markIncomplete,
    toggleComplete
  };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
};