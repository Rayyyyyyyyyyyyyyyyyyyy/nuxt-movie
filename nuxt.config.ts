// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@element-plus/nuxt',
    'dayjs-nuxt',
    '@nuxt/eslint',
  ],
  eslint: {
    // options here
  },
  css: ['~/assets/styles/tailwind.scss'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

})
