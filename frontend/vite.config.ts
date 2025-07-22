/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Configuração para o build do Vite
  plugins: [react()],
  base: '/', // Garante que os caminhos dos arquivos sejam relativos à raiz

  // Sua configuração de testes do Vitest (está correta)
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',

    coverage: {
      provider: 'v8', 
      reporter: ['text', 'html'], 
      all: true, 

      include: ['src/**/*.{ts,tsx}'],

      exclude: [
        'coverage/**', 
        'dist/**',
        'vite.config.ts', 
        
        'src/main.tsx', 
        'src/vite-env.d.ts',
        'src/styles/**', 
        'src/types/**', 
        'src/mocks/**', 
        
        'src/**/styles.ts',
        'src/**/style.ts',
        'src/**/styled.ts', 
        'src/**/*.test.{ts,tsx}', 
      ],
    },
  },
});