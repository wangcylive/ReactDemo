const ExtractTextPlugin = require('mini-css-extract-plugin')
const {isProduction} = require('./env-conf')
const {getAssetsPath} = require('./path-conf')

module.exports = () => {
  // 文件内联大小限制
  const fileInlineLimit = 4000

  // css module name设置
  let localIdentName = '_[hash:base64:8]'
  if (!isProduction) {
    localIdentName = '[path][name]__[local]'
  }

  function getLoader(type, options) {
    const loader = `${type}-loader`
    return {
      loader,
      options,
    }
  }

  const defaultOptions = {
    sourceMap: true,
  }

  const cssLoader = getLoader('css', defaultOptions)
  const cssModuleLoader = getLoader('css', {
    ...defaultOptions,
    modules: {
      localIdentName,
    },
  })
  const styleLoader = getLoader('style')
  const postcssLoader = getLoader('postcss', defaultOptions)
  const sassLoader = getLoader('sass', defaultOptions)
  const lessLoader = getLoader('less', defaultOptions)

  const cssUse = [postcssLoader]
  const sassUse = [postcssLoader, sassLoader]
  const lessUse = [postcssLoader, lessLoader]

  const lastLoader = isProduction ? ExtractTextPlugin.loader : styleLoader

  return {
    getCssLoader(modules) {
      const use = [modules ? cssModuleLoader : cssLoader, ...cssUse]

      return [lastLoader, ...use]
    },
    getSassLoader(modules) {
      const use = [modules ? cssModuleLoader : cssLoader, ...sassUse]

      return [lastLoader, ...use]
    },
    getLessLoader(modules) {
      const use = [modules ? cssModuleLoader : cssLoader, ...lessUse]

      return [lastLoader, ...use]
    },
    getFontOptions() {
      let filename = '[path][name].[ext]'
      if (isProduction) {
        filename = 'font/[contenthash].[ext]'
      }
      const name = getAssetsPath(filename)
      return {
        limit: fileInlineLimit,
        name,
      }
    },
    getImgOptions() {
      let filename = '[path][name].[ext]'
      if (isProduction) {
        filename = 'img/[contenthash].[ext]'
      }
      const name = getAssetsPath(filename)
      return {
        limit: fileInlineLimit,
        name,
      }
    },
  }
}
