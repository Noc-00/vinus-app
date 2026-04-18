import axios from 'axios';

const apiClient = axios.create({
baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  // Cambiamos a 'true' si necesitas manejar cookies de sesión (es lo recomendado)
  withCredentials: false,
});

export default apiClient;