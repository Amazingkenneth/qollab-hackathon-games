import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: { port: 5175, strictPort: true },
  preview: { port: 5175, strictPort: true },
});
