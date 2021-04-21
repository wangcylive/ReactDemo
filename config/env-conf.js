const [development, production] = ['development', 'production']

const isProduction = process.env.NODE_ENV === production

module.exports = {
  development,
  production,
  isProduction,
}
