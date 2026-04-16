import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

// Adiciona o token automaticamente em todas as requisições se ele existir
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("@sistema:token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});