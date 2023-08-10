import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import bacicSsl from '@vitejs/plugin-basic-ssl'
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint(),
    bacicSsl()],
  server: {
    https: true,
    host: '0.0.0.0',
  }
})
