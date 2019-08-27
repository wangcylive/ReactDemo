const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { getCssLoader, getSassLoader, getLessLoader, getFontOptions, getImgOptions } = require('./rules')

module.exports = {
  context: path.resolve(__dirname, '..'),
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
        oneOf: [
          {
            resourceQuery: /module/,
            use: getCssLoader(true)
          },
          {
            use: getCssLoader()
          }
        ]
      },
      {
        test: /\.s[ac]ss$/,
        oneOf: [
          {
            resourceQuery: /module/,
            use: getSassLoader(true)
          },
          {
            use: getSassLoader()
          }
        ]
      },
      {
        test: /\.less$/,
        oneOf: [
          {
            resourceQuery: /module/,
            use: getLessLoader(true)
          },
          {
            use: getLessLoader()
          }
        ]
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
    extensions: [ '.js', '.jsx', '.json' ],

    alias: {
      'react-dom': '@hot-loader/react-dom',
      '@': path.resolve(__dirname, '../src')
    }
  },

  stats: {
    modules: false,
    children: false
  },

  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: -20,
          chunks: 'all'
        }
      }
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'React Demo',
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.html')
    })
  ]
}
