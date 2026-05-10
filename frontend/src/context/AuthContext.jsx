import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

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

  useEffect(() => {
    // Check active session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session?.user);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session?.user);
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const register = async (name, email, password) => {
    try {
      setError(null);
      console.log('Registering user:', email);
      
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name // Store name in user metadata
          }
        }
      });

      if (signUpError) throw signUpError;

      console.log('✅ Registration successful:', data);
      
      // Supabase automatically sets the user, but we can return data for compatibility
      return { user: data.user, success: true };
      
    } catch (err) {
      console.error('❌ Registration error:', err);
      setError(err.message);
      throw err;
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      console.log('Logging in user:', email);
      
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (signInError) throw signInError;

      console.log('✅ Login successful:', data);
      
      // Return data in the format your app expects
      return { user: data.user, success: true };
      
    } catch (err) {
      console.error('❌ Login error:', err);
      setError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      console.log('Logging out user');
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      setUser(null);
      console.log('✅ Logout successful');
      
    } catch (err) {
      console.error('❌ Logout error:', err);
      setError(err.message);
    }
  };

  const updateProfile = async (userData) => {
    try {
      setError(null);
      console.log('Updating profile:', userData);
      
      // Update user metadata
      const { data, error: updateError } = await supabase.auth.updateUser({
        data: userData
      });

      if (updateError) throw updateError;

      console.log('✅ Profile updated:', data);
      
      // Return updated user
      return { user: data.user, success: true };
      
    } catch (err) {
      console.error('❌ Update profile error:', err);
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

  console.log('Auth state - User:', user, 'Authenticated:', !!user);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};