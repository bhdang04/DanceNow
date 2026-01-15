import { apiCall } from './api.js';

export const progressApi = {
  // Get all user progress
  getUserProgress: async () => {
    return await apiCall('/progress');
  },

  // Get progress statistics
  getProgressStats: async () => {
    return await apiCall('/progress/stats');
  },

  // Mark skill as complete
  markSkillComplete: async (skillId, notes = '') => {
    return await apiCall(`/progress/complete/${skillId}`, {
      method: 'POST',
      body: JSON.stringify({ notes })
    });
  },

  // Mark skill as incomplete
  markSkillIncomplete: async (skillId) => {
    return await apiCall(`/progress/incomplete/${skillId}`, {
      method: 'POST'
    });
  },

  // Update progress
  updateProgress: async (skillId, data) => {
    return await apiCall(`/progress/${skillId}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  // Delete progress
  deleteProgress: async (skillId) => {
    return await apiCall(`/progress/${skillId}`, {
      method: 'DELETE'
    });
  }
};