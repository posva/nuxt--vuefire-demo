import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const __dirname = new URL('.', import.meta.url).pathname
const vuefirePkg = JSON.parse(
  readFileSync(resolve(__dirname, 'node_modules/vuefire/package.json'), 'utf-8')
)
const nuxtVuefirePkg = JSON.parse(
  readFileSync(
    resolve(__dirname, 'node_modules/nuxt-vuefire/package.json'),
    'utf-8'
  )
)

export default defineNuxtConfig({
  // Having SSR allows us to use `nuxt generate`, turn it off if you don't care
  ssr: true,
  devtools: { enabled: true },

  app: {
    head: {
      title: 'Nuxt VueFire Demo',
      link: [
        {
          href: 'https://cdn.jsdelivr.net/npm/water.css@2/out/water.css',
          rel: 'stylesheet',
        },
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/vuefire.svg',
        },
      ],
    },
  },

  css: ['~/assets/style.css'],

  nitro: {
    preset: 'firebase',

    // for the upcoming preset
    firebase: {
      gen: 2,
      nodeVersion: '20',
    },
  },

  modules: ['nuxt-vuefire', '@vueuse/nuxt'],

  vuefire: {
    emulators: {
      // uncomment this line to run the application in production mode without emulators during dev
      enabled: false,
      auth: {
        options: {
          disableWarnings: true,
        },
      },
    },
    auth: {
      enabled: true,
      // no cookie minting means no SSR on authenticated pages
      sessionCookie: false,
    },

    appCheck: {
      provider: 'ReCaptchaEnterprise',
      // site key, NOT secret key
      key: '6LfYrWwoAAAAAG0STXT3cs1AEEPRNyg2llU4cTIS',
    },

    config: {
      apiKey: 'AIzaSyDNQlDniNjhsUcU0yMw4lzUv7hXovjUVF0',
      authDomain: 'nuxtotravez.firebaseapp.com',
      databaseURL: 'https://nuxtotravez-default-rtdb.firebaseio.com',
      projectId: 'nuxtotravez',
      storageBucket: 'nuxtotravez.appspot.com',
      messagingSenderId: '180069394096',
      appId: '1:180069394096:web:d1fc10341b516650207d75',
      measurementId: 'G-7LQM93XBHP',
    },
  },

  experimental: {
    payloadExtraction: false,
  },

  //this is just to show the versions on the page
  runtimeConfig: {
    public: {
      // to show the versions in the app
      vuefireVersion: vuefirePkg.version,
      nuxtVuefireVersion: nuxtVuefirePkg.version,
    },
  },

  // Customize this to your needs and try to server side render only what is needed
  // https://nuxt.com/docs/guide/concepts/rendering#hybrid-rendering
  routeRules: {
    // Make some pages client only (since we have an SPA)
    // useful for authenticated pages that require the user to be logged in to be
    // displayed

    // these routes are not dependent on any data and can be prerendered
    // it's a good idea to pre render all routes that you can
    '/': { prerender: true },
    '/login': { prerender: true },

    // Note SWR is not supported on all Hosting Providers
    '/counter': { swr: 5 }, // time in seconds

    // these routes require authentication and can't be prerendered
    // we disabled auth.sessionCookie so they will be client only
    '/notes': { ssr: false },
    '/profile': { ssr: false },
  },
})
