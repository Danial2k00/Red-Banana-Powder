import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('rbp_admin_auth') === 'true';
  });
  
  const [adminUser, setAdminUser] = useState(() => {
    return localStorage.getItem('rbp_admin_user') 
      ? JSON.parse(localStorage.getItem('rbp_admin_user')) 
      : null;
  });

  const login = (email, password) => {
    if (email === 'admin@rbp.com' && password === 'rbpadmin123') {
      setIsAuthenticated(true);
      const user = { email: 'admin@rbp.com', name: 'Admin' };
      setAdminUser(user);
      localStorage.setItem('rbp_admin_auth', 'true');
      localStorage.setItem('rbp_admin_user', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdminUser(null);
    localStorage.removeItem('rbp_admin_auth');
    localStorage.removeItem('rbp_admin_user');
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, adminUser, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
