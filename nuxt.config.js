import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  // target:server,
  head: {
    titleTemplate: '%s - ກະຊວງພາຍໃນ',
    title: 'admin',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Lao+Looped:wght@100;200;300;400;500;600&display=swap'}
      // { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Lao+Looped:wght@100;200;300;400;500;600&display=swap'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  publicRuntimeConfig: {
    api: 'http://localhost:9000/api/v1',
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/axios' },
    { src: '~/plugins/jsonExel.js'},
    { src: '~/plugins/global' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  pwa: {
    meta: {
      title: 'admin',
      author: 'Me',
    },
    manifest: {
      name: 'admin',
      short_name: 'admin',
      description: 'fantastic pwa for weather done locally',
      lang: 'en',
      theme_color: '#222',
      backgroud_color: '#222',
      start_url: '/',
      prefer_related_applications: true,
    },
    icon: {
      fileName: 'logo.png',
      size: [64, 120, 144, 152, 192, 384, 512],
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'cookie-universal-nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/moment',
    [
      '@nuxtjs/toast',
      {
        duration: 3000,
        position: 'top-right',
        iconPack: 'mdi',
        type: 'error',
        closeOnSwipe: false,
        width:'300px'
      },
    ],
  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      light: true,
      themes: {
        light: {
          primary: colors.teal.lighten1,
          accent: colors.grey.lighten3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning:colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  server: {
    host: '0.0.0.0',
  },
}
