const { production } = require('./env.conf')
process.env.NODE_ENV = production

const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJsPlugin = require('terser-webpack-plugin')
const CleanWebpack = require('clean-webpack-plugin')
const webpackBaseConf = require('./webpack.base.conf')

const {
  getAssetsPath
} = require('./path.conf')

module.exports = webpackMerge(webpackBaseConf, {
  mode: production,

  optimization: {
    minimizer: [new TerserJsPlugin({}), new OptimizeCssAssetsPlugin({})]
  },

  output: {
    path: path.resolve('./dist'),
    publicPath: '/',
    filename: getAssetsPath('js/[name].[chunkhash].js'),
    chunkFilename: getAssetsPath('js/[name].[chunkhash].js')
  },

  devtool: 'none',

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(production)
      }
    }),
    new CleanWebpack([ 'dist' ], {
      root: path.resolve(__dirname, '..')
    }),
    new MiniCssExtractPlugin({
      filename: getAssetsPath('css/layout.[contenthash].css'),
      chunkFilename: getAssetsPath('css/[id].[contenthash].css')
    })
  ]
})
