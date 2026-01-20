import { apiCall } from './api.js';

export const personalizationApi = {
  // Save personalization
  save: async (personalizationData) => {
    return await apiCall('/personalization', {
      method: 'POST',
      body: JSON.stringify(personalizationData)
    });
  },

  // Get personalization
  get: async () => {
    return await apiCall('/personalization');
  },

  // Delete personalization
  delete: async () => {
    return await apiCall('/personalization', {
      method: 'DELETE'
    });
  }
};