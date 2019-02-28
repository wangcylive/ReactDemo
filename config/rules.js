const { getEnv } = require('./env.conf')
const ExtractTextPlugin = require('mini-css-extract-plugin')
const { getAssetsPath } = require('./path.conf')

const { isProd, isDev } = getEnv()

function getLoader (type, option) {
  const loader = `${type}-loader`
  const options = Object.assign({}, option, {
    sourceMap: true
  })
  return {
    loader,
    options
  }
}

const limit = 10000

const cssLoader = getLoader('css')
const cssModuleLoader = getLoader('css', {
  modules: true
})
const styleLoader = getLoader('style')
const postcssLoader = getLoader('postcss')
const sassLoader = getLoader('sass')
const lessLoader = getLoader('less')

const cssUse = [ postcssLoader ]
const sassUse = [  postcssLoader, sassLoader ]
const lessUse = [  postcssLoader, lessLoader ]


module.exports = {
  getCssLoader (modules) {
    const use = [ modules ? cssModuleLoader : cssLoader, ...cssUse ]

    if (isDev) {
      use.unshift(styleLoader)
      return use
    }

    if (isProd) {
      return ExtractTextPlugin.extract({
        use
      })
    }
  },
  getSassLoader (modules) {
    const use = [ modules ? cssModuleLoader : cssLoader, ...sassUse ]

    if (isProd) {
      return ExtractTextPlugin.extract({
        use
      })
    } else {
      use.unshift(styleLoader)
      return use
    }
  },
  getLessLoader (modules) {
    const use = [ modules ? cssModuleLoader : cssLoader, ...lessUse ]

    if (isProd) {
      return ExtractTextPlugin.extract({
        use
      })
    } else {
      use.unshift(styleLoader)
      return use
    }
  },
  getFontOptions () {
    const name = getAssetsPath('font/[name]' + (isProd ? '.[hash]' : '') + '.[ext]')
    return {
      limit,
      name
    }
  },
  getImgOptions () {
    const name = getAssetsPath('img/[name]' + (isProd ? '.[hash]' : '') + '.[ext]')
    return {
      limit,
      name
    }
  }
}
