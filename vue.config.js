const path = require('path');
const resolve = (dir) => {
    return path.join(__dirname, dir);
};

const projectConfig = {
  pages: {
    index: {
      entry: './src/main.js',
      template: './public/index.html',
      filename: 'index.html',
    }
  },
  devServerProxy: {
    '/api': {
      target: process.env.VUE_APP_BASE_API,
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  }
};

module.exports = {
    // productionSourceMap: false,
    publicPath: process.env.NODE_ENV === 'production' ? '/production/api' : './',
    outputDir: 'build',
    assetsDir: 'static',
    indexPath: 'index.html',
    lintOnSave: true,
    filenameHashing: true,
    // 是否使用包含运行时编译器的 Vue 构建版本
    runtimeCompiler: process.env.NODE_ENV === 'development',
    // 构建后的文件是部署在 CDN 上的，启用该选项可以提供额外的安全性。
    integrity: true,
    // css: {
    //     extract: true,
    //     sourceMap: false,
    // },
    pages: {
      ...projectConfig.pages
    },
    devServer: {
        open: true,
        host: '0.0.0.0',
        port: 1222,
        https: false,
        hotOnly: false,
        proxy: {
            ...projectConfig.devServerProxy
        },
    },
    chainWebpack: (config) => {
    // 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。
    // 允许对内部的 webpack 配置进行更细粒度的修改。
      // config.externals({
      //   'vue': 'Vue',
      //   'vue-router': 'VueRouter',
      //   'vuex': 'Vuex',
      //   'axios': 'axios',
      //   'element-ui': 'ELEMENT',
      // });
    },
    configureWebpack: {
        // 如果是对象，则会通过 webpack-merge 合并到最终的配置中
        // 值是一个函数，则会接收被解析的配置作为参数
        // 该函数及可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
        resolve: {
            // extensions: ['.js', '.vue', '.json', ".css"],
            alias: {
                '~': resolve('src'),
                'assets': resolve('src/assets'),
                'components': resolve('src/components')
            }
        }
      }
};
  