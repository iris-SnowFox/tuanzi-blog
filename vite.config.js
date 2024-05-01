import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
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
    proxy: { // 跨域
      // '/api': {
      //   target: 'http://api.example.com',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, '')
      // }
      '/docs': {
        target: 'http://localhost:5500', // 假设 VitePress 开发服务器运行在 3001 端口  
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/docs/, '')
      }
    },
    static: {
      directory: [
        {
          // 添加 utils 包的路径
          root: './src/utils',
          prefix: '/utils/'
        },
      ],
    },
  },
  build: {
    gzip: true,
    assetsDir: 'assets',
  },
  // optimizeDeps: {
  //   force: true // 强制进行依赖预构建
  // },
})
