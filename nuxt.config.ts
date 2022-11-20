import { defineNuxtConfig } from "nuxt";
import { IntlifyModuleOptions } from "@intlify/nuxt3";
import UnpluginComponentsVite from "unplugin-vue-components/vite";
import IconsResolver from "unplugin-icons/resolver";

declare module "@nuxt/schema" {
  interface NuxtConfig {
    intlify?: IntlifyModuleOptions;
  }
}

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  // server side rendering mode
  ssr: true,
  typescript: {
    strict: true,
  },

  // app
  app: {
    head: {
      title: "Nuxt 3 Awesome Starter",
      titleTemplate: "%s - Nuxt 3 Awesome Starter",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: "Nuxt 3 Awesome Starter",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  // css
  css: [
    // 'virtual:windi-base.css',
    // 'virtual:windi-components.css',
    // 'virtual:windi-utilities.css',
    "~/assets/sass/vendor.scss",
    "~/assets/sass/app.scss",
    "leaflet/dist/leaflet.css",
  ],

  // plugins
  plugins: [{ src: "~/plugins/leaflet.ts", mode: "client" }],

  // build
  //   build: {
  //     transpile: ['@headlessui/vue'],
  //   },

  // modules
  modules: [
    "@nuxtjs/eslint-module",
    "@nuxtjs/tailwindcss",
    "unplugin-icons/nuxt",
    // '@nuxtjs/svg',
    // 'nuxt-windicss',
    "@intlify/nuxt3",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxt/content",
    // '@pinia/nuxt',
  ],

  // experimental features
  experimental: {
    reactivityTransform: true,
  },

  // auto import components
  components: true,

  // vite plugins
  vite: {
    plugins: [
      UnpluginComponentsVite({
        dts: true,
        resolvers: [
          IconsResolver({
            prefix: "Icon",
          }),
        ],
      }),
    ],
  },

  // localization - i18n config
  intlify: {
    localeDir: "locales",
    vueI18n: {
      locale: "en",
      fallbackLocale: "en",
      availableLocales: ["en", "id", "ja", "ko"],
    },
  },

  // vueuse
  vueuse: {
    ssrHandlers: true,
  },

  // windicss
  windicss: {
    analyze: {
      analysis: {
        interpretUtilities: false,
      },
      server: {
        port: 4000,
        open: false,
      },
    },
    scan: true,
  },

  // content
  content: {
    // documentDriven: true,
    // mdc: true,
    // highlight: {
    //   theme: {
    //     default: 'github-light',
    //     dark: 'github-dark',
    //   },
    // },
  },

  publicRuntimeConfig: {
    accessToken: process.env.accessToken,
  },
  runtimeConfig: {
    accessToken: process.env.accessToken,
  },
});
