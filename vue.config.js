const path = require('path');
const {
  publicPath,
  devPort,
  outputDir,
  assetsDir,
  lintOnSave
} = require('./src/config/website');
const resolve = (dir) => {
    return path.join(__dirname, dir);
};


// const CompressionWebpackPlugin = require('compression-webpack-plugin');
// const productionGzipExtensions = ['html', 'js', 'css', 'svg'];

const projectConfig = {
  pages: {
    index: {
      entry: './src/main.js',
      template: './public/index.html',
      filename: 'index.html'
    }
  },
  devServerProxy: {
    '/system': {
      target: process.env.VUE_APP_BASE_API,
      changeOrigin: true,
      pathRewrite: {
        // ['^' + process.env.BASE_URL + '$']: ''
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
};

module.exports = {
    lintOnSave,
    publicPath,
    productionSourceMap: false,
    assetsDir,
    outputDir,
    runtimeCompiler: true,
    pages: {
      ...projectConfig.pages
    },
    devServer: {
        open: true,
        port: '8888',
        // https: true,
        // hotOnly: false,
        disableHostCheck: true,
        host: 'rck.puge.net.cn',
        proxy: {
            ...projectConfig.devServerProxy
        }
    },
    css: {
      sourceMap: false
    },
    chainWebpack: (config) => {
      // const cdn = {
      //   css: [
      //     'https://cdn.staticfile.org/element-ui/2.13.0/theme-chalk/index.css'
      //   ],
      //   js: [
      //     'https://cdn.staticfile.org/vue/2.6.10/vue.min.js',
      //     'https://cdn.staticfile.org/vue-router/3.1.3/vue-router.min.js',
      //     'https://cdn.staticfile.org/axios/0.19.0/axios.min.js',
      //     'https://cdn.staticfile.org/element-ui/2.13.0/index.js'
      //   ]
      // };
      // config.plugin('html')
      // .tap(args => {
      //   args[0].cdn = cdn;
      //   return args;
      // });
      // config
      // .when(process.env.NODE_ENV !== 'development',
      // config => {
      //   // 属性名称 'element-ui' 表示遇到 import xxx 不去node_modules 中找，而是去全局变量Element中找
      //   config.externals({
      //     vue: 'Vue',
      //     'vue-router': 'VueRouter',
      //     axios: 'axios',
      //     'element-ui': 'ELEMENT'
      //   });
      // });
      // config
      // .when(process.env.NODE_ENV !== 'development', config => {
      //   config.devtool('source-map');
      // });
      // config
      // .when(process.env.NODE_ENV !== 'development', config => {
        // config.performance.set('hints', false);
        // config.devtool('none');
        // config.optimization.splitChunks({
          // chunks: 'all',
          // cacheGroups: {
          //   libs: {
          //     name: 'chunk-libs',
          //     test: /[\\/]node_modules[\\/]/,
          //     priority: 10,
          //     chunks: 'initial'
          //   }
            // elementUI: {
            //   name: 'chunk-elementUI',
            //   priority: 20,
            //   test: /[\\/]node_modules[\\/]_?element-ui(.*)/
            // }
        //     // fortawesome: {
        //     //   name: 'chunk-fortawesome',
        //     //   priority: 20,
        //     //   test: /[\\/]node_modules[\\/]_?@fortawesome(.*)/
        //     // },
        //     // commons: {
        //     //   name: 'chunk-commons',
        //     //   test: resolve('src/components'),
        //     //   minChunks: 3,
        //     //   priority: 5,
        //     //   reuseExistingChunk: true
        //     // }
          // }
        // });
      // config
      //   .plugin('compression')
      //   .use(CompressionWebpackPlugin, [
      //     {
      //       filename: '[path].gz[query]',
      //       algorithm: 'gzip',
      //       test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
      //       threshold: 8192,
      //       minRatio: 0.8
      //     }
      //   ])
      //   .end();
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
      }
};
