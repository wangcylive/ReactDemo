const { getEnv } = require('./env.conf');
const { isProd } = getEnv();

const assetsPath = 'assets';


function getAssetsPath(path) {
    return isProd ? assetsPath + '/' + path : path
}

module.exports = {
    assets: 'assets',
    getAssetsPath
};
