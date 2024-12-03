import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  preview: {
    port: 8080
  },
  test: {
    environment: 'jsdom', // Use jsdom for React testing
    globals: true, // Optional: For Jest-style globals like `expect`
    setupFiles: './test/setup.js' // Optional: Setup file for custom configurations
  }
});
