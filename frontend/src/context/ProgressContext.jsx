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
      console.log('Fetched progress:', data.progress); // Debug log
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
      console.log('Fetched stats:', data.stats); // Debug log
      setStats(data.stats || { total: 0, completed: 0, remaining: 0, percentage: 0 });
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  const isSkillCompleted = (skillId) => {
    console.log('Checking if completed:', skillId, 'Progress:', progress); // Debug log
    const skillProgress = progress.find(p => p.skillId === skillId);
    return skillProgress?.completed || false;
  };

  const markComplete = async (skillId, notes = '') => {
    try {
      console.log('Marking complete:', skillId); // Debug log
      const result = await progressApi.markSkillComplete(skillId, notes);
      console.log('Mark complete result:', result); // Debug log
      await fetchProgress();
      await fetchStats();
    } catch (err) {
      console.error('Failed to mark complete:', err);
      throw err;
    }
  };

  const markIncomplete = async (skillId) => {
    try {
      console.log('Marking incomplete:', skillId); // Debug log
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
    console.log('Toggling complete. Currently:', isCompleted, 'for skill:', skillId); // Debug log
    
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