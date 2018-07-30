const { production } = require('./env.conf');
process.env.NODE_ENV = production;

const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpack = require('clean-webpack-plugin');
const webpackBaseConf = require('./webpack.base.conf');

const {
    getAssetsPath
} = require('./path.conf');

module.exports = webpackMerge(webpackBaseConf, {
    mode: production,

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
        /*new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        }),*/
        new CleanWebpack(['dist'], {
            root: path.resolve(__dirname, '..')
        }),
        /*new ExtractTextPlugin({
            filename: getAssetsPath('css/layout.[contenthash].css')
        }),
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
        new HtmlWebpackPlugin({
            template: './src/template/index.html'
        })*/
    ]
});
