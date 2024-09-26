// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  pinia: {
    storesDirs: ["./stores/**", "./custom-folder/stores/**"],
  },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@element-plus/nuxt",
    "dayjs-nuxt",
    "@nuxt/eslint",
    "nuxt-aos",
    "nuxt-icons",
  ],
  eslint: {
    // options here
  },

  plugins: [{ src: "~/plugins/aos.client.ts", mode: "client" }], // 注册插件
  css: ["~/assets/styles/tailwind.scss", "aos/dist/aos.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      tmdbApiKey: process.env.TMDB_API_KEY, // 配置公开的 API 密钥
    },
  },
});
