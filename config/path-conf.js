const path = require('path')
const {isProduction} = require('./env-conf')

const assetsPath = 'assets'

function getAssetsPath(pathname) {
  return path.join(isProduction ? assetsPath : '', pathname)
}

module.exports = {
  assets: 'assets',
  getAssetsPath,
}
