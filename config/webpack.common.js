const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('./html-conf')
const entry = require('./main-conf')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = () => {
  const {getCssLoader, getSassLoader, getLessLoader, getFontOptions, getImgOptions} = require('./rules-conf')()
  const isDev = process.env.NODE_ENV === 'development'
  return {
    context: path.resolve(__dirname, '..'),
    mode: process.env.NODE_ENV,
    target: isDev ? 'web' : 'browserslist',
    entry,
    module: {
      rules: [
        {
          test: /\.[t|j]sx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            plugins: [isDev && require.resolve('react-refresh/babel')].filter(Boolean),
          },
        },
        {
          test: /\.css$/,
          oneOf: [
            {
              resourceQuery: /module/,
              use: getCssLoader(true),
            },
            {
              use: getCssLoader(),
            },
          ],
        },
        {
          test: /\.s[ac]ss$/,
          oneOf: [
            {
              resourceQuery: /module/,
              use: getSassLoader(true),
            },
            {
              use: getSassLoader(),
            },
          ],
        },
        {
          test: /\.less$/,
          oneOf: [
            {
              resourceQuery: /module/,
              use: getLessLoader(true),
            },
            {
              use: getLessLoader(),
            },
          ],
        },
        {
          test: /\.svg(\?.*)?$/,
          use: ['@svgr/webpack', 'url-loader'],
        },
        {
          // 处理图片文件
          test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
          loader: 'url-loader',
          options: getImgOptions(),
        },
        {
          // 处理字体文件
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: getFontOptions(),
        },
      ],
    },

    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],

      alias: {
        src: path.resolve(__dirname, '../src'),
        '@': path.resolve(__dirname, '../src'),
      },
    },

    stats: {
      modules: false,
      children: false,
    },

    optimization: {
      runtimeChunk: {
        name: 'manifest',
      },
      splitChunks: {
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -20,
            chunks: 'all',
          },
        },
      },
    },

    plugins: [
      ...htmlWebpackPlugin,
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
      }),
      isDev && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),
  }
}
