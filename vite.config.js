import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ReactWorkshop_2024_Week7_Hexschool/', // 替換為您的 repository 名稱
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
