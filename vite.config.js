import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/resource/llmops/', // 让打包后的文件带上装X路径
  server: {
    proxy: {
      '/api': { // 开发环境下，把 /api 转发给后端的 3000 端口
        target: 'http://127.0.0.1:3000',
        changeOrigin: true
      }
    }
  }
})