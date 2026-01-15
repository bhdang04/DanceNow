import { apiCall } from './api.js';

export const skillsApi = {
  // Get all skills organized by categories
  getAllSkills: async () => {
    return await apiCall('/skills');
  },

  // Get all categories
  getCategories: async () => {
    return await apiCall('/skills/categories');
  },

  // Get skills by category
  getSkillsByCategory: async (categoryId) => {
    return await apiCall(`/skills/category/${categoryId}`);
  },

  // Get specific skill by ID
  getSkillById: async (skillId) => {
    return await apiCall(`/skills/${skillId}`);
  },

  // Create new skill (admin)
  createSkill: async (skillData) => {
    return await apiCall('/skills', {
      method: 'POST',
      body: JSON.stringify(skillData)
    });
  },

  // Update skill (admin)
  updateSkill: async (skillId, skillData) => {
    return await apiCall(`/skills/${skillId}`, {
      method: 'PUT',
      body: JSON.stringify(skillData)
    });
  },

  // Delete skill (admin)
  deleteSkill: async (skillId) => {
    return await apiCall(`/skills/${skillId}`, {
      method: 'DELETE'
    });
  },

  // Seed initial data
  seedSkills: async () => {
    return await apiCall('/skills/seed', {
      method: 'POST'
    });
  }
};