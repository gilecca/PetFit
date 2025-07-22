// src/lib/api.ts

import axios from 'axios';

// Cria uma instância do Axios com configurações pré-definidas.
export const api = axios.create({

  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});



api.interceptors.request.use(
  (config) => {
    // Pega o token do localStorage
    const token = localStorage.getItem('token');

    // Se o token existir, adiciona ao header 'Authorization'
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Retorna a configuração da requisição para que ela possa continuar
    return config;
  },
  (error) => {
    // Se ocorrer um erro ao configurar a requisição, ele é rejeitado
    return Promise.reject(error);
  }
);

