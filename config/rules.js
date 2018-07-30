const { getEnv } = require('./env.conf');
const ExtractTextPlugin = require('mini-css-extract-plugin');
const { getAssetsPath } = require('./path.conf');

const { isProd, isDev } = getEnv();

function getLoader(type, option) {
    const loader = `${type}-loader`;
    const options = Object.assign({}, option, {
        sourceMap: true
    });
    return {
        loader,
        options
    }
}

const limit = 10000;

const cssLoader = getLoader('css', {
    minimize: isProd
});
const styleLoader = getLoader('style');
const postcssLoader = getLoader('postcss');
const sassLoader = getLoader('sass');
const lessLoader = getLoader('less');
const vueStyleLoader = getLoader('vue-style');

const cssUse = [cssLoader, postcssLoader];
const sassUse = [cssLoader, postcssLoader, sassLoader];
const lessUse = [cssLoader, postcssLoader, lessLoader];


module.exports = {
    getVueLoaderOptions() {
        function generateLoaders(use) {
            if (isProd) {
                return ExtractTextPlugin.extract({
                    use,
                    fallback: vueStyleLoader
                })
            } else {
                return {
                    use,
                    fallback: vueStyleLoader
                }
            }
        }

        return {
            css: generateLoaders(cssUse),
            sass: generateLoaders(sassUse),
            scss: generateLoaders(sassUse),
            less: generateLoaders(lessUse)
        }
    },
    getCssLoader() {
        const use = [...cssUse];

        if (isDev) {
            use.unshift(styleLoader);
            return use;
        }

        if (isProd) {
            return ExtractTextPlugin.extract({
                use
            })
        }
    },
    getSassLoader() {
        const use = [...sassUse];

        if (isProd) {
            return ExtractTextPlugin.extract({
                use
            })
        } else {
            use.unshift(styleLoader);
            return use;
        }
    },
    getLessLoader() {
        const use = [...lessUse];

        if (isProd) {
            return ExtractTextPlugin.extract({
                use
            })
        } else {
            use.unshift(styleLoader);
            return use;
        }
    },
    getFontOptions() {
        const name = getAssetsPath('font/[name]' + (isProd ? '.[hash]' : '') + '.[ext]');
        return {
            limit,
            name
        }
    },
    getImgOptions() {
        const name = getAssetsPath('img/[name]' + (isProd ? '.[hash]' : '') + '.[ext]');
        return {
            limit,
            name
        }
    }
};
