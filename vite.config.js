import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // 配置别名
  resolve: {
    alias: {
      '@': '/src', // 例如，将 '@' 别名指向 '/src' 目录
    },
  },
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port:5173
  }
})
