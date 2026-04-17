import axios from 'axios';

const apiClient = axios.create({
  // Si estamos en Vercel, el proxy se encargará de esto.
  // Si estamos en local, usaremos nuestra variable de entorno.
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  // Cambiamos a 'true' si necesitas manejar cookies de sesión (es lo recomendado)
  withCredentials: false,
});

export default apiClient;