const path = require('path')
const {merge} = require('webpack-merge')
const packageJson = require('../package')
const internalIp = require('internal-ip')
const webpackBaseConf = require('./webpack.common')
const serverPort = packageJson.serverPort

// 代理服务器
const proxyServer = '/api'

const https = process.env.https === '1'

module.exports = () => {
  return merge(webpackBaseConf(), {
    output: {
      publicPath: '/',
      filename: '[name].js',
      chunkFilename: '[name].js',
    },

    devtool: 'eval-source-map',

    // externals: {
    //   react: `React`,
    //   'react-dom': 'ReactDOM',
    //   'react-router': 'ReactRouter',
    //   'react-router-dom': 'ReactRouterDOM',
    //   history: 'HistoryLibrary',
    // },

    devServer: {
      contentBase: path.resolve(__dirname, '../src'),
      compress: true,
      hot: true,
      port: serverPort,
      https,
      historyApiFallback: true,
      host: '0.0.0.0',
      disableHostCheck: true,
      proxy: {
        '/api': {
          target: 'https://api.agora.io',
          pathRewrite: {'^/api': ''},
          changeOrigin: true,
          secure: false,
        },
      },
    },
  })
}

console.log(`start ${packageJson.name} server:
http${https ? 's' : ''}://localhost:${serverPort}
http${https ? 's' : ''}://${internalIp.v4.sync()}:${serverPort}
`)
