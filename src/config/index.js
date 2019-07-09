const envConfig = require(`./${process.env.NODE_ENV}`).default
const config = {
  api: ''
}

export default Object.assign(config, envConfig)
