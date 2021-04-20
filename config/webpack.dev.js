const path = require('path')
const webpack = require('webpack')
const {merge} = require('webpack-merge')
const {development} = require('./env-conf')
const packageJson = require('../package')
const internalIp = require('internal-ip')
const webpackBaseConf = require('./webpack.common')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const serverPort = packageJson.serverPort

// 代理服务器
const proxyServer = '/api'

module.exports = env => {
  process.env.NODE_ENV = development
  const defineEnv = {}
  if (env) {
    Object.entries(env).forEach(([key, value]) => {
      defineEnv[key] = JSON.stringify(value)
      process.env[key] = value
    })
  }
  return merge(webpackBaseConf(development, env), {
    mode: development,

    output: {
      publicPath: '/',
      filename: '[name].js',
      chunkFilename: '[name].js',
    },

    devtool: 'eval-source-map',

    devServer: {
      contentBase: path.resolve(__dirname, '../src'),
      compress: true,
      hot: true,
      port: serverPort,
      historyApiFallback: true,
      host: '0.0.0.0',
      disableHostCheck: true,
      proxy: {
        '/api': {
          target: proxyServer,
          changeOrigin: true,
        },
      },
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(development),
          ...defineEnv,
        },
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
    ],
  })
}

console.log(`start ${packageJson.name} server:
http://localhost:${serverPort}
http://${internalIp.v4.sync()}:${serverPort}
`)
