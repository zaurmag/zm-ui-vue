import { fileURLToPath, URL } from 'node:url'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

const isStorybook = process.env.STORYBOOK === 'true'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
      vue(),
      ...(!isStorybook ? [vueDevTools()] : []),
      createSvgIconsPlugin({
        // https://github.com/vbenjs/vite-plugin-svg-icons
        // Specify the icon folder to be cached
        iconDirs: [
          fileURLToPath(new URL('src/app/assets/icons', import.meta.url)),
        ],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: 3000,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use '/src/app/styles/variables' as *;
          @use '/src/app/styles/functions' as *;
          @use '/src/app/styles/font' as *;
          @use 'sass:color' as color;
        `,
        },
      },
    },
  }
)
