import { defineConfig, loadEnv } from 'vite'
import type { UserConfigExport, ConfigEnv } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
// import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
const baseConfig: UserConfigExport = {
  plugins: [
    vue(),
    // vueDevTools()
  ],
  base: '/finance-vue3-admin-template/',
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, './src'),
      },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        404: resolve(__dirname, '404.html'),
      },
    },
  },
}

export default (configEnv: ConfigEnv) => {
  // sample, can be removed
  setTimeout(() => {
    const envVariables = {
      ...process.env,
      ...loadEnv(configEnv.mode, process.cwd()),
    }

    const filteredData = Object.entries(envVariables)
      .filter(([key]) => /(NODE|VITE)/.test(key))
      .map(([key, value]) => {
        return {
          key: key.trim(),
          value: value?.trim().slice(0, 50),
        }
      })

    console.log('👋🏻🌎. ⬇️env variables, which contains VITE and NODE prefixes')
    filteredData.forEach((item) => {
      console.log(`    key: ${item.key}, value: ${item.value}`)
    })
  }, 10)

  return defineConfig({ ...baseConfig })
}
