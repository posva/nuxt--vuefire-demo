export default defineNuxtConfig({
  // Having SSR allows us to use `nuxt generate`, turn it off if you don't care
  ssr: true,
  devtools: { enabled: true },

  app: {
    head: {
      title: 'Nuxt + VueFire Blaze Plan Example',
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
    prerender: {
      // these routes are not dependent on any data and can be prerendered
      // it's a good idea to pre render all routes that you can
      routes: ['/', '/analytics'],
    },
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

    // appCheck: {
    //   provider: 'ReCaptchaV3',
    //   // site key, NOT secret key
    //   key: '6LeS5q0nAAAAABH3u13ntLwuIOkiNjHlXJOXoN5T',
    //   isTokenAutoRefreshEnabled: true,
    // },

    config: {
      apiKey: 'AIzaSyDNQlDniNjhsUcU0yMw4lzUv7hXovjUVF0',
      authDomain: 'nuxtotravez.firebaseapp.com',
      databaseURL: 'https://nuxtotravez-default-rtdb.firebaseio.com',
      projectId: 'nuxtotravez',
      storageBucket: 'nuxtotravez.appspot.com',
      messagingSenderId: '180069394096',
      appId: '1:180069394096:web:d1fc10341b516650207d75',
    },
  },

  experimental: {
    payloadExtraction: false,
  },

  // Customize this to your needs and try to server side render only what is needed
  // https://nuxt.com/docs/guide/concepts/rendering#hybrid-rendering
  routeRules: {
    // Make some pages client only (since we have an SPA)
    // useful for authenticated pages that require the user to be logged in to be
    // displayed
    '/admin': { ssr: false },
    '/login': { ssr: false },
    '/analytics': { ssr: false },
    // removed because of sessionCookie: false
    '/users': { ssr: false },
    '/posts/new': { ssr: false },
    '/emoji-panel': { ssr: false },
    // you don't need to add ssr: true to any route, it's the default
    // '/users': { ssr: true },
    // '/posts/new': { ssr: true },
    // '/emoji-panel': { swr: true },
  },
})
