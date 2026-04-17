import React, { createContext, useState, useContext, useEffect } from 'react';
import apiClient from '@/api/apiClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    console.log("AuthProvider: Iniciando chequeo de usuario...");
    checkUserAuth();
  }, []);

  const checkUserAuth = async () => {
    const token = localStorage.getItem('vinus_token');

    if (!token) {
      console.log("AuthProvider: No hay token en localStorage.");
      setIsLoadingAuth(false);
      setIsAuthenticated(false);
      return;
    }

    try {
      console.log("AuthProvider: Haciendo petición a /auth/me...");
      const response = await apiClient.get('/auth/me');
      console.log("AuthProvider: Datos recibidos:", response.data);

      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("AuthProvider: Error en la petición /auth/me:", error);
      localStorage.removeItem('vinus_token');
      setIsAuthenticated(false);
      setAuthError('Sesión no válida');
    } finally {
      console.log("AuthProvider: Terminando estado de carga.");
      setIsLoadingAuth(false);
    }
  };

  const login = (userData, token) => {
    localStorage.setItem('vinus_token', token);
    setUser(userData);
    setIsAuthenticated(true);
    setAuthError(null);
  };

  const logout = () => {
    localStorage.removeItem('vinus_token');
    setUser(null);
    setIsAuthenticated(false);
    setAuthError(null);
    window.location.href = '/welcome';
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, isLoadingAuth, authError, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de un AuthProvider');
  return context;
};