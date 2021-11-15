export default {
  srcDir: "./src",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s | CIA",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        type: "text/css",
        href: "//fonts.googleapis.com/css?family=Maven+Pro"
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/scss/theme.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // filters
    { src: "~/filters/capitalize.js" },
    { src: "~/filters/lowercase.js" },
    { src: "~/filters/uppercase.js" },
    { src: "~/filters/trim.js" },
    { src: "~/filters/placeholder.js" },
    { src: "~/filters/formatDate.js" },
    { src: "~/filters/formatCurrency.ts" },
    { src: "~/filters/convertCurrency.ts" },
    { src: "~/filters/markdown.ts" },
    { src: "~/filters/date.ts" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    "@nuxt/typescript-build",
    "@nuxtjs/moment",
    // https://github.com/whardier/nuxt-hero-icons
    // '@nuxtjs/google-fonts',
    "@nuxt-hero-icons/outline/nuxt",
    "@nuxt-hero-icons/solid/nuxt",
    "@nuxtjs/vuetify",
    "@nuxtjs/tailwindcss",
    [
      "nuxt-vuex-localstorage",
      {
        mode: process.env.NODE_ENV === "development" ? "debug" : undefined,
        localStorage: ["settings"]
      }
    ]
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/i18n",
    "@nuxtjs/pwa",
    "@nuxt/image",
    "@nuxtjs/auth-next"
  ],

  moment: {
    defaultLocale: "en",
    locales: ["de", "fr"]
  },

  router: {
    middleware: ["auth"]
  },

  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.js' },
      { code: 'fr', iso: 'fr-FR', file: 'fr.js' },
    ],
    langDir: '~/locales',
    lazy: true,
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
    }
  },

  auth: {
    redirect: {
      login: '/auth',
      logout: '/auth',
      home: '/wallet'
    },
    strategies: {
      custom: {
        scheme: "refresh",
        token: {
          property: "access",
          maxAge: 1800,
          global: true
          // type: 'Bearer'
        },
        refreshToken: {
          property: "refresh",
          data: "refresh",
          maxAge: 60 * 60 * 24 * 30
        },
        user: {
          property: ""
          // autoFetch: true
        },
        endpoints: {
          login: { url: "/auth/token/", method: "post" },
          refresh: { url: "/auth/token/refresh/", method: "post" },
          user: { url: "/auth/user/", method: "get" },
          logout: { url: "/auth/token/", method: "delete" }
        }
        // autoLogout: false
      }
    }
  },

  vuetify: {
    customVariables: ["~/assets/scss/vuetify/variables/_index.scss"],
    treeShake: true,
    theme: {
      themes: {
        // dark theme colors
        dark: {
          textbase: "#edf0f2",
          background: "#05090c",
          surface: "#111b27",
          primary: "#0C4A7C",
          secondary: "#B04632",
          accent: "#59bbbb",
          error: "#FF5252",
          info: "#2196F3",
          success: "#05c075",
          warning: "#FFC107"
        },

        // light theme colors
        light: {
          textbase: "#222222",
          background: "#ffffff",
          surface: "#f2f5f8",
          primary: "#0C4A7C",
          secondary: "#B04632",
          accent: "#59bbbb",
          error: "#ef476f",
          info: "#2196F3",
          success: "#05c075",
          warning: "#ffd166"
        }
      }
    },
    defaultAssets: {
      font: false
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.BASE_URL ?? 'http://localhost:8000/api', // Used as fallback if no runtime config is provided
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en"
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  image: {
    provider: "cloudinary",
    cloudinary: {
      baseURL: "https://res.cloudinary.com/dbiiwbqnv"
    }
  }
};
