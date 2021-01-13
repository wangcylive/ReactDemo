const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const { development } = require('./env-conf')

module.exports = (env) => {
  process.env.NODE_ENV = development
  const defineEnv = {}
  if (env) {
    Object.entries(env).forEach(([key, value]) => {
      defineEnv[key] = JSON.stringify(value)
      process.env[key] = value
    })
  }
  return {
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
      ],
    },
    mode: development,
    context: path.resolve(__dirname, '..'),
    entry: './server/index.js',
    output: {
      path: path.join(__dirname, '../build'),
      filename: '[name].js',
      chunkFilename: '[name].js',
    },
    resolve: {
      extensions: [ '.js', '.jsx', '.json' ],
      alias: {
        '@': path.resolve(__dirname, '../src'),
      },
    },
    target: 'node',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(development),
          ...defineEnv
        }
      }),
    ],
  }
}
