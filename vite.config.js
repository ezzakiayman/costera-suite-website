import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { proxy: { '/costera_intake/catalog': { target: 'https://costerasuite.com', changeOrigin: true } } },
  preview: {
    proxy: { '/costera_intake/catalog': { target: 'https://costerasuite.com', changeOrigin: true } },
    allowedHosts: ['.trycloudflare.com'],
  },
});
