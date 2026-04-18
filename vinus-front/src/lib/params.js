// appParams.js
export const appParams = {
  // Ponemos la URL directa para no depender de variables de entorno si fallan
  apiUrl: import.meta.env.VITE_API_URL || 'https://vinus-backend-i7y3.onrender.com/api',

  // Limpiamos todo lo que no usas (tokens, localStorage, etc)
  env: import.meta.env.MODE,
  isDevelopment: import.meta.env.DEV,
};