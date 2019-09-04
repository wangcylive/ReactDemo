import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import history from '@/router/history'
import LoadableErrorBoundary from '@/router/splitting/loadable-error-boundary'

function RouterView (props) {
  console.log('RouterView Render', performance.now())

  useEffect(() => {
    props.routes.forEach((route) => {
      if (route.redirect && history.location.pathname === route.path) {
        history.replace(route.redirect)
      }
    })
  })

  return (
    <Switch>
      {
        props.routes.map((route, index) => {
          return (
            <Route path={route.path} exact={!!route.exact} key={index} render={props => (
              <LoadableErrorBoundary><route.component {...props} route={route}/></LoadableErrorBoundary>
            )}/>
          )
        })
      }
    </Switch>
  )
}

RouterView.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]).isRequired,
    component: PropTypes.any,
    exact: PropTypes.bool,
    redirect: PropTypes.string,
    children: PropTypes.array,
  })),
}

export default RouterView
