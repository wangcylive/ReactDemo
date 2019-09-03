const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJsPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpackBaseConf = require('./webpack.common')
const { production } = require('./env-conf')
const { getAssetsPath } = require('./path-conf')

module.exports = (env) => {
  process.env.NODE_ENV = production
  const publicPath = '/'

  return webpackMerge(webpackBaseConf(production, env), {
    mode: production,

    optimization: {
      minimizer: [ new TerserJsPlugin({}), new OptimizeCssAssetsPlugin({}) ],
    },

    output: {
      path: path.resolve('./dist'),
      publicPath,
      filename: getAssetsPath(production,'js/[name].[chunkhash].js'),
      chunkFilename: getAssetsPath(production,'js/[name].[chunkhash].js'),
    },

    devtool: 'none',

    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(production),
        },
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: getAssetsPath(production,'css/layout.[contenthash].css'),
        chunkFilename: getAssetsPath(production,'css/[id].[contenthash].css'),
      }),
    ],
  })
}
