// src/lib/api.ts

import axios from 'axios';

// Cria uma instância do Axios com configurações pré-definidas.
export const api = axios.create({
  /**
   * Define a URL base para todas as requisições.
   * Ele vai tentar usar a variável de ambiente VITE_API_URL.
   * Se não encontrar, usará http://localhost:8080 como padrão (ideal para desenvolvimento local).
   */
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * INTERCEPTOR DE REQUISIÇÃO:
 * Isso é extremamente útil! A função abaixo será executada ANTES de CADA requisição.
 * A principal função dela aqui é pegar o token que salvamos no localStorage
 * e adicioná-lo ao cabeçalho (header) de autorização.
 * Assim, você não precisa adicionar o token manualmente em cada chamada para uma rota protegida.
 */
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