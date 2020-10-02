const {GenerateSW} = require('workbox-webpack-plugin');

module.exports = {
  publicPath: '/firebase/',
  'transpileDependencies': [
    'vuetify'
  ],
  configureWebpack: {
    plugins: [
      new GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
        exclude: [/\.(?:png|jpg|jpeg|svg)$/],
        runtimeCaching: [{
          urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'images',
            expiration: {
              maxEntries: 10,
            },
          },
        }],
      })
    ]
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  },
  pwa: {
    name: 'Firebase',
    themeColor: '#4DBA87',
    icons: [{
      "src": "./img/icons/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }, {
      "src": "./img/icons/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }, {
      "src": "./img/icons/android-chrome-maskable-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable"
    }, {
      "src": "./img/icons/android-chrome-maskable-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }],
    manifestOptions: {
      display: 'standalone',
      background_color: '#42B883'
    },
  }
}