const { development } = require('./env.conf')
const packageJson = require('../package')
const hostIp = require('./hostIp')
process.env.NODE_ENV = development

const serverPort = packageJson.serverPort

const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const webpackBaseConf = require('./webpack.base.conf')

// 测试服
const proxyServer = 'http://111.230.180.86:10095'

module.exports = webpackMerge(webpackBaseConf, {
  mode: development,

  output: {
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].js'
  },

  devtool: 'eval-source-map',

  devServer: {
    contentBase: path.resolve(__dirname, '../src'),

    // 启用 gzip 压缩
    compress: true,

    port: serverPort,
    // inline: true,
    historyApiFallback: true,

    host: '0.0.0.0',

    disableHostCheck: true,

    proxy: {
      '/mng': {
        target: proxyServer,
        changeOrigin: true
      },
      '/common': {
        target: proxyServer,
        changeOrigin: true
      }
    }
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(development)
      }
    }),
  ]
})

console.log(`start ${packageJson.name} server:
http://localhost:${serverPort}
http://${hostIp()}:${serverPort}
`)
