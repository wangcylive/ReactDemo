const path = require('path')
const {merge} = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJsPlugin = require('terser-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const webpackBaseConf = require('./webpack.common')
const {getAssetsPath} = require('./path-conf')

module.exports = () => {
  const publicPath = '/'

  return merge(webpackBaseConf(), {
    optimization: {
      minimizer: [new TerserJsPlugin({}), new OptimizeCssAssetsPlugin({})],
    },

    output: {
      path: path.resolve('./dist'),
      publicPath,
      filename: getAssetsPath('js/[name].[chunkhash].js'),
      chunkFilename: getAssetsPath('js/[name].[chunkhash].js'),
    },

    devtool: false,

    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: getAssetsPath('css/[name].[contenthash].css'),
        chunkFilename: getAssetsPath('css/[id].[contenthash].css'),
      }),
    ],
  })
}
