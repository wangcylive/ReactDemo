import React from 'react'
import Loading from './loading'
import loadable from '@loadable/component'
import LoadableErrorBoundary from '@/router/splitting/loadable-error-boundary'

const { createElement } = React

function loadableHoc (loader) {
  return (props) => {
    return createElement(LoadableErrorBoundary,
      props,
      createElement(loadable(loader, {
        fallback: createElement(Loading)
      }), props))
  }
}

export default loadableHoc
