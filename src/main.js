import 'babel-polyfill'
import React from 'react'
import ReactDom from 'react-dom'
import DemoIndex from './router/index'

ReactDom.render(
  React.createElement(DemoIndex),
  document.getElementById('app')
)
