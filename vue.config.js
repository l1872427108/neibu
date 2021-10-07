const path = require('path');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const resolve = (dir) => {
    return path.join(__dirname, dir);
};

const projectConfig = {
  pages: {
    index: {
      entry: './src/main.js',
      template: './public/index.html',
      filename: 'index.html'
    }
  },
  devServerProxy: {
    [process.env.BASE_URL]: {
      target: process.env.VUE_APP_BASE_API,
      changeOrigin: true,
      pathRewrite: {
        ['^' + process.env.BASE_URL + '$']: ''
      }
    },
    '/inside/inside': {
      target: process.env.VUE_APP_BASE_API,
      changeOrigin: true,
      pathRewrite: {
        // '^/inside$': ''
      }
    },
    '/pay': {
      target: process.env.VUE_APP_BASE_API,
      changeOrigin: true,
      pathRewrite: {
        '/pay': ''
      }
    }
  }
};

module.exports = {
    lintOnSave: true,
    publicPath: './',
    productionSourceMap: false,
    pages: {
      ...projectConfig.pages
    },
    devServer: {
        open: true,
        port: 8888,
        // https: true,
        hotOnly: false,
        host: '',
        proxy: {
            ...projectConfig.devServerProxy
        }
    },
    css: {
      sourceMap: false
    },
    chainWebpack: (config) => {
      config
      .when(process.env.NODE_ENV !== 'development',
      config => {
        config.externals({
          vue: 'Vue',
          'vue-router': 'VueRouter',
          axios: 'axios',
          'element-ui': 'ELEMENT'
        });
        // config
        //     .optimization.splitChunks({
        //       chunks: 'all',
        //       cacheGroups: {
        //         libs: {
        //           name: 'chunk-libs',
        //           test: /[\\/]node_modules[\\/]/,
        //           priority: 10,
        //           chunks: 'initial' // only package third parties that are initially dependent
        //         }
        //       }
        //     });
            // config.plugin('compression-webpack-plugin').use(new CompressionWebpackPlugin({
            //   filename: '[path].gz[query]',
            //     algorithm: 'gzip',
            //     test: /.(html|js|css|map|ttf)$/,
            //     threshold: 8192,
            //     minRatio: 0.8
            // }));
            // config.module
            // .rule('images')
            // .use('image-webpack-loader')
            // .loader('image-webpack-loader')
            // .options({ bypassOnDebug: true })
            // .end();
      });
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
