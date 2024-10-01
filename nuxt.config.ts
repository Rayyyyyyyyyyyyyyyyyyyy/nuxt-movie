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
    "@nuxtjs/i18n",
    "@nuxt/image",
  ],
  eslint: {
    // options here
  },
  image: {
    domains: ["http://localhost:3000"],
  },

  nitro: {
    routeRules: {
      "/proxy/**": { proxy: "https://image.tmdb.org/t/p/original/**" },
    },
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
      baseURL: process.env.BASE_URL || "https://api.themoviedb.org/3",
      tmdbApiKey: process.env.TMDB_API_KEY || "",
    },
  },
  i18n: {
    detectBrowserLanguage: {
      useCookie: true,
      fallbackLocale: "en",
    },
    strategy: "no_prefix",
    locales: [
      {
        code: "en",
        name: "English",
        file: "en.json",
      },
      {
        code: "de-DE",
        name: "Deutsch",
        file: "de-DE.json",
      },
      {
        code: "es-ES",
        name: "Español",
        file: "es-ES.json",
      },
      {
        code: "it",
        name: "Italiano",
        file: "it.json",
      },
      {
        code: "ja",
        name: "日本語",
        file: "ja.json",
      },
      {
        code: "zh-CN",
        name: "简体中文",
        file: "zh-CN.json",
      },
      {
        code: "pt-PT",
        name: "Português",
        file: "pt-PT.json",
      },
      {
        code: "pt-BR",
        name: "Português do Brasil",
        file: "pt-BR.json",
      },
      {
        code: "ru-RU",
        name: "Русский",
        file: "ru-RU.json",
      },
      {
        code: "fr-FR",
        name: "Français",
        file: "fr-FR.json",
      },
      {
        code: "uk-UA",
        name: "Українська",
        file: "uk-UA.json",
      },
    ],
    lazy: true,
    langDir: "internationalization",
    defaultLocale: "en",
  },
});
