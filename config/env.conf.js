const [ development, production ] = [ 'development', 'production'];

function getEnv() {
    const nodeEnv = process.env.NODE_ENV;

    const isProd = nodeEnv === production;
    const isDev = nodeEnv === development;

    return {
        isProd,
        isDev,
        nodeEnv
    }
}

module.exports = {
    development,
    production,
    getEnv,
};
