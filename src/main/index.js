import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDom from 'react-dom'
import View from '../view'

ReactDom.render(
  React.createElement(View),
  document.getElementById('app')
)
