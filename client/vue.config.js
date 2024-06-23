// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })
const { DefinePlugin } = require('webpack');
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'img': '@/assets/images'
      }
    },
    plugins: [
      new DefinePlugin({
        '__VUE_PROD_DEVTOOLS__': false,
        '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': false,
        // 其他需要的特性标志
      })
    ]
  },
  pwa: {
    name: 'My PWA App',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
      runtimeCaching: [
        {
          urlPattern: new RegExp(`^${process.env.VUE_APP_API_BASE_URL}`),
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-cache',
            networkTimeoutSeconds: 10,
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        // 静态资源缓存
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg|gif|css|js)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'static-resources',
            expiration: {
              maxEntries: 60,
              maxAgeSeconds: 30 * 24 * 60 * 60 // 30 天
            }
          }
        }
      ]
    }
  },
  // 公共路径(必须有的)
  publicPath: "./",
  outputDir: 'dist',
  devServer: {                    // 跨域处理
    open: true,
    host: 'localhost',
    port: '8080',
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost', // 要请求的地址
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}