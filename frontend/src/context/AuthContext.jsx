import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../utils/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize Auth State from backend using JWT token
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('edeco_token');
      if (token) {
        try {
          const data = await api.auth.getProfile();
          if (data.success) {
            setUser(data.user);
          } else {
            localStorage.removeItem('edeco_token');
          }
        } catch (e) {
          console.error('Session validation failed:', e.message);
          localStorage.removeItem('edeco_token');
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  // Log in user
  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await api.auth.login(email, password);
      if (data.success) {
        setUser(data.user);
        setLoading(false);
        return { success: true };
      } else {
        setLoading(false);
        return { success: false, error: data.error || 'Login failed' };
      }
    } catch (error) {
      setLoading(false);
      return { success: false, error: error.message || 'An error occurred during login.' };
    }
  };

  // Register / Sign up user
  const signup = async (name, email, password) => {
    setLoading(true);
    try {
      const data = await api.auth.signup(name, email, password);
      if (data.success) {
        setUser(data.user);
        setLoading(false);
        return { success: true };
      } else {
        setLoading(false);
        return { success: false, error: data.error || 'Signup failed' };
      }
    } catch (error) {
      setLoading(false);
      return { success: false, error: error.message || 'An error occurred during registration.' };
    }
  };

  // Sign out user
  const logout = () => {
    localStorage.removeItem('edeco_token');
    setUser(null);
  };

  // Update profile details
  const updateProfile = async (name, avatar) => {
    if (!user) return;
    try {
      const data = await api.auth.updateProfile(name, avatar);
      if (data.success) {
        setUser(data.user);
        return { success: true };
      }
      return { success: false, error: data.error };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Toggle saving a college to favorites
  const toggleSavedCollege = async (collegeId) => {
    if (!user) return;
    try {
      const data = await api.auth.toggleSavedCollege(collegeId);
      if (data.success) {
        setUser(prev => ({
          ...prev,
          savedColleges: data.savedColleges
        }));
        return { success: true, savedColleges: data.savedColleges };
      }
      return { success: false };
    } catch (error) {
      console.error('Error toggling saved college:', error.message);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    isLoggedIn: !!user,
    loading,
    login,
    signup,
    logout,
    updateProfile,
    toggleSavedCollege
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
