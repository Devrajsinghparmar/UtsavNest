'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { DemoUser, defaultDemoUsers } from '@/lib/auth';

interface AuthContextType {
  user: DemoUser | null;
  role: 'customer' | 'provider' | 'admin';
  setRole: (role: 'customer' | 'provider' | 'admin') => void;
  isAuthenticated: boolean;
  login: (role?: 'customer' | 'provider' | 'admin') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: defaultDemoUsers.customer,
  role: 'customer',
  setRole: () => {},
  isAuthenticated: true,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<'customer' | 'provider' | 'admin'>('customer');
  const [user, setUser] = useState<DemoUser | null>(defaultDemoUsers.customer);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  useEffect(() => {
    const savedRole = localStorage.getItem('utsav_user_role') as 'customer' | 'provider' | 'admin';
    if (savedRole && defaultDemoUsers[savedRole]) {
      setRoleState(savedRole);
      setUser(defaultDemoUsers[savedRole]);
    }
  }, []);

  const setRole = (newRole: 'customer' | 'provider' | 'admin') => {
    setRoleState(newRole);
    setUser(defaultDemoUsers[newRole]);
    setIsAuthenticated(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('utsav_user_role', newRole);
    }
  };

  const login = (chosenRole: 'customer' | 'provider' | 'admin' = 'customer') => {
    setRole(chosenRole);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        setRole,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
