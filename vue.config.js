module.exports = {
  configureWebpack: {
    resolve: {
      mainFields: ['main', 'browser']
    }
  },

  chainWebpack: config => {
    if (process.env.NODE_ENV === 'development') {
      config
        .output
        .filename('[name].[hash].js')
        .end()
    }

    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.transformAssetUrls = {
          img: 'src',
          image: 'xlink:href',
          'b-img': 'src',
          'b-img-lazy': ['src', 'blank-src'],
          'b-card': 'img-src',
          'b-card-img': 'src',
          'b-card-img-lazy': ['src', 'blank-src'],
          'b-carousel-slide': 'img-src',
          'b-embed': 'src'
        }

        return options
      })
  },
  pluginOptions: {
    i18n: {
      locale: 'fr',
      fallbackLocale: 'fr',
      localeDir: 'locales',
      enableInSFC: true
    },
    electronBuilder: {
      builderOptions: {
        appId: 'workshop.group4.fr',
        productName: 'CoronaChat',
        copyright: 'Copyright © 2020 ${author}',
        mac: {
          category: 'public.app-category.social-networking',
          darkModeSupport: true,
          type: 'distribution',
          icon: './build/icons/icon.icns',
          target: 'dmg',
        },
        win: {
          target: 'portable'
        }
      }
    }
  }
}
