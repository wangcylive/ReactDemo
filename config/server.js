process.env.NODE_ENV = 'development';


const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.server');
const { development } = require('./env');

const compiler = Webpack(webpackConfig);
const devServerOptions = Object.assign({}, webpackConfig.devServer, {
    stats: {
        color: true
    }
});

const server = new WebpackDevServer(compiler, devServerOptions);

server.listen(webpackConfig.devServer.port, '127.0.0.1', () => {
    console.log('Starting server on http://localhost');
});
