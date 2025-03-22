import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

// Hardcoded credentials for demo purposes
const VALID_CREDENTIALS = {
  lab: {
    username: 'lab',
    password: 'lab123',
    role: 'lab'
  },
  icu: {
    username: 'icu',
    password: 'icu123',
    role: 'icu'
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    try {
      // Check if credentials match our hardcoded values
      const validUser = Object.values(VALID_CREDENTIALS).find(
        user => user.username === credentials.username && 
               user.password === credentials.password &&
               user.role === credentials.role
      );

      if (!validUser) {
        throw new Error('Invalid credentials');
      }

      // Create a mock token (in a real app, this would come from the server)
      const mockToken = btoa(JSON.stringify({ 
        username: validUser.username, 
        role: validUser.role 
      }));

      const userData = {
        username: validUser.username,
        role: validUser.role,
        token: mockToken
      };

      setUser(userData);
      localStorage.setItem('token', mockToken);
      return userData;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};