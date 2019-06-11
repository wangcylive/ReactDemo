import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDom from 'react-dom'
import DemoIndex from './router/index'
import config from '@/config'

ReactDom.render(
  React.createElement(DemoIndex),
  document.getElementById('app')
)

console.log('evn', process.env.NODE_ENV)
console.log('config', config)
