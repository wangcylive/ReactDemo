import React from 'react'
import Loading from './loading'
import loadable from '@loadable/component'

const { createElement } = React

function loadableHoc (loader) {
  return loadable(loader, {
    fallback: createElement(Loading)
  })
}

export default loadableHoc
