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
  const { isAuthenticated, user, loading: authLoading } = useAuth();

  useEffect(() => {
    // Only fetch if user is authenticated AND auth is done loading
    if (isAuthenticated && !authLoading && user) {
      console.log('User authenticated, fetching progress...'); // Debug
      fetchProgress();
    } else {
      console.log('User not authenticated, clearing progress'); // Debug
      setProgress([]);
      setStats({ total: 0, completed: 0, remaining: 0, percentage: 0 });
    }
  }, [isAuthenticated, authLoading, user]);

  const fetchProgress = async () => {
    if (!isAuthenticated) {
      console.log('Skipping fetch - not authenticated');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await progressApi.getUserProgress();
      console.log('Fetched progress:', data.progress); // Debug log
      setProgress(data.progress || []);
    } catch (err) {
      console.error('Failed to fetch progress:', err);
      setError(err.message);
      // Don't throw - just log the error
    } finally {
      setLoading(false);
    }
  };

  // Remove fetchStats - we'll calculate it locally
  const calculateStats = (totalSkills) => {
    const completed = progress.filter(p => p.completed).length;
    const percentage = totalSkills > 0 ? Math.round((completed / totalSkills) * 100) : 0;
    
    return {
      total: totalSkills,
      completed,
      remaining: totalSkills - completed,
      percentage
    };
  };

  const isSkillCompleted = (skillId) => {
    if (!isAuthenticated) return false;
    
    console.log('Checking if completed:', skillId, 'Progress:', progress); // Debug log
    const skillProgress = progress.find(p => p.skillId === skillId);
    return skillProgress?.completed || false;
  };

  const markComplete = async (skillId, notes = '') => {
    if (!isAuthenticated) {
      throw new Error('Must be logged in to mark progress');
    }

    try {
      console.log('Marking complete:', skillId); // Debug log
      const result = await progressApi.markSkillComplete(skillId, notes);
      console.log('Mark complete result:', result); // Debug log
      await fetchProgress();
    } catch (err) {
      console.error('Failed to mark complete:', err);
      throw err;
    }
  };

  const markIncomplete = async (skillId) => {
    if (!isAuthenticated) {
      throw new Error('Must be logged in to mark progress');
    }

    try {
      console.log('Marking incomplete:', skillId); // Debug log
      await progressApi.markSkillIncomplete(skillId);
      await fetchProgress();
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
    loading,
    error,
    fetchProgress,
    calculateStats,
    isSkillCompleted,
    markComplete,
    markIncomplete,
    toggleComplete
  };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
};