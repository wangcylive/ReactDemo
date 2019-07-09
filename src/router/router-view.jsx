import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'

function RouterView (props) {
  return (
    <>
      {
        props.routes.map((route, index) => (
          <Route key={index} exact={!!route.exact} path={route.path} render={props => (
            <route.component { ...props } route={route}/>
          )}/>
        ))
      }
    </>
  )
}

RouterView.propTypes = {
  routes: PropTypes.array.isRequired
}

export default RouterView
