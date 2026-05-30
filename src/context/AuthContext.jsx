import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Initial default users for testing
const DEFAULT_USERS = [
  {
    name: 'Anjali Sharma',
    email: 'anjali@example.com',
    password: 'Password123',
    avatar: 'https://ui-avatars.com/api/?name=Anjali+Sharma&background=1e293b&color=fff',
    estd: '2026'
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'Password123',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=334155&color=fff',
    estd: '2026'
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize Auth State from localStorage
  useEffect(() => {
    // 1. Set up default users in localStorage if not already exists
    if (!localStorage.getItem('edeco_users')) {
      localStorage.setItem('edeco_users', JSON.stringify(DEFAULT_USERS));
    }

    // 2. Check for active session
    const activeSession = localStorage.getItem('edeco_session');
    if (activeSession) {
      try {
        setUser(JSON.parse(activeSession));
      } catch (e) {
        localStorage.removeItem('edeco_session');
      }
    }
    setLoading(false);
  }, []);

  // Helper to fetch registered users
  const getRegisteredUsers = () => {
    try {
      return JSON.parse(localStorage.getItem('edeco_users')) || DEFAULT_USERS;
    } catch (e) {
      return DEFAULT_USERS;
    }
  };

  // Helper to save registered users
  const saveRegisteredUsers = (users) => {
    localStorage.setItem('edeco_users', JSON.stringify(users));
  };

  // Simulate network API call
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Log in user
  const login = async (email, password) => {
    setLoading(true);
    await delay(1000); // 1s simulation

    const users = getRegisteredUsers();
    const foundUser = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase().trim()
    );

    if (!foundUser) {
      setLoading(false);
      return { success: false, error: 'No account found with this email address.' };
    }

    if (foundUser.password !== password) {
      setLoading(false);
      return { success: false, error: 'Incorrect password. Please try again.' };
    }

    // Create session
    const sessionUser = {
      name: foundUser.name,
      email: foundUser.email,
      avatar: foundUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(foundUser.name)}&background=1f2937&color=fff`,
      estd: foundUser.estd || '2026'
    };

    localStorage.setItem('edeco_session', JSON.stringify(sessionUser));
    setUser(sessionUser);
    setLoading(false);
    return { success: true };
  };

  // Register / Sign up user
  const signup = async (name, email, password) => {
    setLoading(true);
    await delay(1000); // 1s simulation

    const users = getRegisteredUsers();
    const emailExists = users.some(
      (u) => u.email.toLowerCase() === email.toLowerCase().trim()
    );

    if (emailExists) {
      setLoading(false);
      return { success: false, error: 'An account with this email address already exists.' };
    }

    // Add new user
    const newUser = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: password,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1e293b&color=fff`,
      estd: new Date().getFullYear().toString()
    };

    const updatedUsers = [...users, newUser];
    saveRegisteredUsers(updatedUsers);

    // Create session directly
    const sessionUser = {
      name: newUser.name,
      email: newUser.email,
      avatar: newUser.avatar,
      estd: newUser.estd
    };

    localStorage.setItem('edeco_session', JSON.stringify(sessionUser));
    setUser(sessionUser);
    setLoading(false);
    return { success: true };
  };

  // Sign out user
  const logout = () => {
    localStorage.removeItem('edeco_session');
    setUser(null);
  };

  // Update profile details
  const updateProfile = (name, avatar) => {
    if (!user) return;
    const updatedUser = { ...user, name, avatar };
    setUser(updatedUser);
    localStorage.setItem('edeco_session', JSON.stringify(updatedUser));

    // Update in users database
    const users = getRegisteredUsers();
    const updatedUsers = users.map((u) => {
      if (u.email.toLowerCase() === user.email.toLowerCase()) {
        return { ...u, name, avatar };
      }
      return u;
    });
    saveRegisteredUsers(updatedUsers);
  };

  const value = {
    user,
    isLoggedIn: !!user,
    loading,
    login,
    signup,
    logout,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
