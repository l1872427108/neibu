const path = require('path');
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
        ['^' + process.env.BASE_URL]: ''
      }
    }
  }
};

module.exports = {
    lintOnSave: true,
    // runtimeCompiler: true,
    pages: {
      ...projectConfig.pages
    },
    devServer: {
        open: true,
        host: '0.0.0.0',
        port: 8888,
        https: false,
        hotOnly: false,
        proxy: {
            ...projectConfig.devServerProxy
        }
    },
    chainWebpack: (config) => {

    },
    configureWebpack: {
        devtool: process.env.NODE_ENV === 'dev' ? 'cheap-module-eval-source-map' : 'source-map',
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
