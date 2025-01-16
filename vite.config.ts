import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/todo_list/',
  server: {
    open: true, // 自動でブラウザを開く
    port: 3000,
  },
  build: {
    outDir: 'dist',
  },
  plugins: [react()],
});