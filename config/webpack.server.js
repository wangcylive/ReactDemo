const {development} = require('./env.conf');
process.env.NODE_ENV = development;

const path = require("path");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const webpackBaseConf = require("./webpack.base.conf");

// 测试服
const proxyServer = "http://111.230.180.86:10095";

module.exports = webpackMerge(webpackBaseConf, {
  mode: development,

  output: {
    publicPath: "/",
    filename: "[name].js",
    chunkFilename: "[name].js"
  },

  devtool: 'eval-source-map',

  devServer: {
    contentBase: path.resolve(__dirname, '../src'),

    // 启用 gzip 压缩
    compress: true,

    port: 15002,
    // inline: true,
    historyApiFallback: true,

    proxy: {
      "/mng": {
        target: proxyServer,
        changeOrigin: true
      },
      "/common": {
        target: proxyServer,
        changeOrigin: true
      }
    },

    stats: {
      modules: false
    },
  },

  plugins: [

  ]
});
