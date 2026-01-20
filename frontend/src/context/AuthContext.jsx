import React, { createContext, useState, useContext, useEffect } from 'react';
import { authApi } from '../utils/authApi';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    console.log('Checking auth - Token exists:', !!token); // Debug log
    
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const data = await authApi.getCurrentUser();
      console.log('Auth check successful, user:', data.user); // Debug log
      setUser(data.user);
    } catch (err) {
      console.error('Auth check failed:', err);
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const register = async (username, email, password) => {
    try {
      setError(null);
      const data = await authApi.register(username, email, password);
      console.log('Register successful:', data); // Debug log
      setUser(data.user);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      const data = await authApi.login(email, password);
      console.log('Login successful:', data); // Debug log
      setUser(data.user);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
      localStorage.removeItem('token');
    }
  };

  const updateProfile = async (userData) => {
    try {
      setError(null);
      const data = await authApi.updateProfile(userData);
      setUser(data.user);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const value = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    updateProfile,
    isAuthenticated: !!user
  };

  console.log('Auth state - User:', user, 'Authenticated:', !!user); // Debug log

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};