import React, { createContext, useState, useContext, useEffect } from 'react';
import { skillsApi } from '../utils/skillsApi';

const SkillsContext = createContext();

export const useSkills = () => {
  const context = useContext(SkillsContext);
  if (!context) {
    throw new Error('useSkills must be used within SkillsProvider');
  }
  return context;
};

export const SkillsProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching skills...'); // Debug
      const data = await skillsApi.getAllSkills();
      console.log('Skills fetched:', data); // Debug
      setCategories(data.categories || []);
    } catch (err) {
      console.error('Failed to fetch skills:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getSkillById = (skillId) => {
    for (const category of categories) {
      const skill = category.skills?.find(s => s.id === skillId);
      if (skill) {
        return { ...skill, categoryColor: category.color };
      }
    }
    return null;
  };

  const getTotalSkills = () => {
    return categories.reduce((sum, cat) => sum + (cat.skills?.length || 0), 0);
  };

  const value = {
    categories,
    loading,
    error,
    fetchSkills,
    getSkillById,
    getTotalSkills
  };

  return <SkillsContext.Provider value={value}>{children}</SkillsContext.Provider>;
};