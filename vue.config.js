const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const webpack = require('webpack');
const fs = require('fs');
const mime = require('mime');

const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')
const versionAutoUpdate = require("./webpackPlugin/webpack-version-auto-update")
const lottieAssetsCopy = require('./webpackPlugin/webpack-lottie-assets-copy.js')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.VUE_APP_BASE_URL,
  productionSourceMap: false,
  outputDir: process.env.VUE_APP_OUT_DIR,
  devServer: {
    onBeforeSetupMiddleware(server) {
      server.app.use((req, res, next) => {
        //用于处理开发模式下找不到lottie图片资源的问题
        const lottieAssets = /\/jsonImg\/.*\/images(\/[^\/]+)*\/[^\/]+\.[^\/]+/
        if (lottieAssets.test(req.url)) {
          const filePath = path.join(__dirname, '/assets', req.url);
          fs.readFile(filePath, (err, data) => {
            if (err) {
              console.error('Error reading file:', err);
              res.sendStatus(404);
            } else {
              const mimeType = mime.getType(filePath);
              res.set('Content-Type', mimeType);
              res.send(data);
            }
          });
        } else {
          next();
        }
      })
    }
  },
  configureWebpack: {
    entry: './main.ts',
    /* experiments: {
      topLevelAwait: true
    },  */
    resolve: {
      extensions: ['.js', '.ts', '.vue'],
      alias: {
        "~~": `${path.resolve(__dirname)}`,
        '~': `${path.resolve(__dirname)}`,
        '@': `${path.resolve(__dirname)}`,
        'vue$': 'vue/dist/vue.runtime.esm-bundler.js'
      },
    },
    module: {
      rules: [
        {
          test: /\.json$/,
          use: [
            {
              loader: path.resolve(__dirname, './webpackLoader/lottie-json-loader.js')
            }
          ]
        }
      ]
    },
    plugins: [
      new WindiCSSWebpackPlugin(),
      new webpack.DefinePlugin({
        __IS_DEVELOPMENT__: JSON.stringify(process.env.NODE_ENV === 'development'),
      }),
      new versionAutoUpdate({ outputDir: 'dist' }),
      new lottieAssetsCopy(),
      // "unplugin-vue-components"会导致WindiCSS的首次热更新不及时
      /* require('unplugin-vue-components/webpack')({
        dirs: [],
        extensions: ['vue'],
        include: [/\.vue$/, /\.vue\?vue/],
        dts: 'components.d.ts', 
      }), */
      require('unplugin-auto-import/webpack')({
        imports: [
          'vue',
          'vue-router',
          '@vueuse/core',
          'vue-i18n',
        ],
        dts: 'auto-imports.d.ts',
        dirs: ['composables', 'composables/*/index.{ts,js,mjs,mts}', 'store/**'],
        vueTemplate: true,
      })
    ],
  },
})
