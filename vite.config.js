import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  // base: '/tuanziBlog' // 开发或生产环境服务的公共基础路径
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '/src/assets/css/variables.scss';` // sass全局变量
      }
    }
  },
  resolve: {
    alias: { // 导入别名
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.js', '.json'] // 导入可省略后缀
  },
  // network
  server: {
    host: true, // 监听所有地址
    // proxy: { // 跨域
    //   '/api': {
    //     target: 'http://api.example.com',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   }
    // }, 
  },
  build: {
    gzip: true,
  },
  // optimizeDeps: {
  //   force: true // 强制进行依赖预构建
  // },
})
