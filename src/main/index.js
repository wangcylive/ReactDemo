import 'core-js/stable'
import 'regenerator-runtime/runtime'

import React from 'react'
import ReactDom from 'react-dom/client'
// import ReactDom from 'react-dom'
import View from '../view'

const root = ReactDom.createRoot(document.getElementById('app'))
root.render(React.createElement(View))

// ReactDom.render(React.createElement(View), document.getElementById('app'))
