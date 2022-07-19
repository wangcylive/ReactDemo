const path = require('path')
const findSync = require('./find-path-sync')
const HtmlConf = require('html-webpack-plugin')
const htmlPath = findSync('./src/html')

const array = []

htmlPath.forEach(item => {
  const filename = item.split(path.sep).pop()

  const chunks = filename.substring(0, filename.lastIndexOf('.'))

  array.push(
    new HtmlConf({
      template: './' + item,
      filename,
      chunks: ['manifest', 'vendors', chunks],
      files: {
        js: [
          'https://unpkg.com/react@18.2.0/umd/react.development.js',
          'https://unpkg.com/react-dom@18.2.0/umd/react-dom.development.js',
          'https://unpkg.com/history@5.1.0/umd/history.development.js',
          'https://unpkg.com/react-router@6.3.0/umd/react-router.development.js',
          'https://unpkg.com/react-router-dom@6.3.0/umd/react-router-dom.development.js',
        ],
      },
    }),
  )
})

module.exports = array
