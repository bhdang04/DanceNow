// personalizationApi.js
import { apiCall } from './api.js';

export const personalizationApi = {
  // Save personalization
  save: async (personalizationData) => {
    console.log('💾 Saving personalization:', personalizationData);
    const response = await apiCall('/personalization', {
      method: 'POST',
      body: JSON.stringify(personalizationData)
    });
    console.log('💾 Save response:', response);
    return response;
  },

  // Get personalization
  get: async () => {
    console.log('📥 Fetching personalization...');
    const response = await apiCall('/personalization');
    console.log('📥 Fetch response:', response);
    return response;
  },

  // Delete personalization
  delete: async () => {
    console.log('🗑️ Deleting personalization...');
    const response = await apiCall('/personalization', {
      method: 'DELETE'
    });
    console.log('🗑️ Delete response:', response);
    return response;
  }
};