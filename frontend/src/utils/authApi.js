import { apiCall } from './api.js';

export const authApi = {
  // Register new user
  register: async (username, email, password) => {
    const data = await apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password })
    });
    
    // Store token in localStorage
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    
    return data;
  },

  // Login user
  login: async (email, password) => {
    const data = await apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    
    // Store token in localStorage
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    
    return data;
  },

  // Logout user
  logout: async () => {
    try {
      await apiCall('/auth/logout', {
        method: 'POST'
      });
    } finally {
      // Always remove token
      localStorage.removeItem('token');
    }
  },

  // Get current user
  getCurrentUser: async () => {
    return await apiCall('/auth/me');
  },

  // Update user profile
  updateProfile: async (userData) => {
    return await apiCall('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(userData)
    });
  }
};