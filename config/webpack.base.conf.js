const path = require("path");
const webpack = require("webpack");
const {getCssLoader, getSassLoader, getLessLoader, getFontOptions, getImgOptions} = require('./rules');
const HtmlWebpackPlugin = require('html-webpack-plugin')

console.log(path.resolve(__dirname, '../src/index.html'))

module.exports = {
  context: path.resolve(__dirname, ".."),
  entry: {
    main: './src/main.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
          test: /\.css$/,
          use: getCssLoader()
      },
      {
          test: /\.s[ac]ss$/,
          use: getSassLoader()
      },
      {
          test: /\.less$/,
          use: getLessLoader()
      },
      {
        // 处理图片文件
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: getImgOptions()
      },
      {
        // 处理字体文件
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: getFontOptions()
      },
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx'],

    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },

  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          priority: -20,
          chunks: "all"
        }
      }
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'React Demo',
      template: path.resolve(__dirname, '../src/index.html')
    })
  ]
}
