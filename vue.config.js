const path = require('path')
const {
  lintOnSave
} = require('./src/config/website')
const resolve = (dir) => {
  return path.join(__dirname, dir)
}

// const CompressionWebpackPlugin = require('compression-webpack-plugin');
// const productionGzipExtensions = ['html', 'js', 'css', 'svg'];
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const projectConfig = {
  devServerProxy: {
    '/system': {
      target: process.env.VUE_APP_BASE_API,
      changeOrigin: true,
      pathRewrite: {
        '^/system': ''
      }
    },
    '/inside/inside': {
      target: process.env.VUE_APP_BASE_API,
      changeOrigin: true,
      pathRewrite: {
        '^/inside$': ''
      }
    },
    '/pay': {
      target: process.env.VUE_APP_BASE_API,
      changeOrigin: true,
      pathRewrite: {
        '^/pay': ''
      }
    }
  }
}

module.exports = {
  lintOnSave,
  productionSourceMap: false,
  runtimeCompiler: true,
  devServer: {
    open: false,
    port: '8888',
    hotOnly: false,
    disableHostCheck: true,
    host: 'bzj.puge.net.cn',
    proxy: projectConfig.devServerProxy
  },
  css: {
    sourceMap: false
  },
  chainWebpack: (config) => {
    config
      .when(process.env.NODE_ENV === 'production', config => {
        config.entry('app').clear().add('./src/main-prod.js')
        config.plugins.delete('prefetch').delete('preload')
        config.set('externals', {
          vue: 'Vue',
          'vue-router': 'VueRouter',
          axios: 'axios',
          'element-ui': 'ELEMENT'
        })
        config.plugin('html').tap(args => {
          args[0].isProd = true
          return args
        })

        config.optimization.usedExports = true
        // config.optimization.splitChunks({
        //   chunks: 'all',
        //   minSize: 30000,
        //   maxSize: 0,
        //   minChunks: 1,
        //   maxAsyncRequests: 6,
        //   maxInitialRequests: 4,
        //   automaticNameDelimiter: '~',
        //   cacheGroups: {
        //     libs: {
        //       name: `chunk-lib`,
        //       test: /[\\/]node_modules[\\/]_?(pdfjs-dist|sign-canvas|html2canvas)(.*)/,
        //       priority: 20,
        //     },
        // //     i18n: {
        // //       name: `i18n`,
        // //       test: /[\\/]vue-i18n[\\/]/,
        // //       priority: 10,
        // //     },
        //     corejs: {
        //       name: `chunk-core`,
        //       test: /[\\/]core-js[\\/]/,
        //       priority: 10,
        //       minChunks: 2
        //     },
        //     vendors: {
        //       name: `chunk-vendors`,
        //       test: /[\\/]node_modules[\\/]/,
        //       priority: -10
        //     },
        //     common: {
        //       priority: -20,
        //       reuseExistingChunk: true
        //     }
        //   }
        // })
      })
    console.log(process.env.NODE_ENV)
    config
      .when(process.env.NODE_ENV === 'development', config => {
        config.entry('app').clear().add('./src/main-dev.js')
        config.plugin('html').tap(args => {
          args[0].isProd = false
          return args
        })
      })
  },

  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json', '.css'],
      alias: {
        '~': resolve('src'),
        assets: resolve('src/assets'),
        components: resolve('src/components')
      }
    }
    // plugins: [
    //   isProd ? new
    // ]
  }
}
