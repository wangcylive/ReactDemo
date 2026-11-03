import * as lightningcss from 'lightningcss'
import browserslist from 'browserslist'
// const transform = require('lightningcss')

// console.log(
//   lightningcss.browserslistToTargets(
//     browserslist(['chrome >= 70', 'Android >= 5', 'iOS >= 10', 'last 2 versions', '> 0.2%', 'not dead']),
//   ),
// )
//
// return

let customToken = null

let res = lightningcss.transform({
  filename: 'test.css',
  minify: true,
  code: Buffer.from(`
    @media screen and (max-width: 100px) {
      body {
        font-size: 12ipx;
      }
    }
  `),
  visitor: {
    // MediaQuery(media) {
    //   console.log('media', media)
    //   return media
    // },

    Token: {
      dimension(token) {
        // console.log('token', token)

        if (token.unit === 'ipx') {
          // customToken = token
          // return {
          //   raw: '14PX',
          // }
          return {
            type: 'length',
            value: {
              unit: 'px',
              value: token.value,
            },
          }
        }
      },
    },
    Length(length) {
      console.log('length', length)
      if (length.unit === 'px') {
        // if (customToken && customToken.value === length.value && customToken.unit === 'ipx') {
        //   customToken = null
        //   return {
        //     unit: 'px',
        //     value: length.value,
        //   }
        // }
        return {
          unit: 'rem',
          value: length.value,
        }
      }
    },
  },
})

console.log(res.code.toString())
