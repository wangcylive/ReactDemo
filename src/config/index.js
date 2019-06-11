import dev from './development'
const envConfig = require(`./${process.env.NODE_ENV}`)
console.log('envConfig', envConfig)
console.log('devConfig', dev)
const config = {
  api: ''
}

export default Object.assign(config, envConfig.default)
