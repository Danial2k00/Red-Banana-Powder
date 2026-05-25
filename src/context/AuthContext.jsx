import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('rbp_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('rbp_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('rbp_user');
    }
  }, [user]);

  const login = (email, password) => {
    // Elegant mock login
    const mockUser = {
      name: email.split('@')[0].toUpperCase(),
      email,
      phone: '+91 98765 43210'
    };
    setUser(mockUser);
    setIsAuthOpen(false);
    return { success: true };
  };

  const signup = (name, email, phone, password) => {
    // Elegant mock signup
    const mockUser = {
      name,
      email,
      phone
    };
    setUser(mockUser);
    setIsAuthOpen(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthOpen,
        setIsAuthOpen,
        login,
        signup,
        logout,
      }}
    >
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
