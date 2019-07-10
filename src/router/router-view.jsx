import React from 'react'
import { Route, Redirect, Switch, BrowserRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import history from '@/router/history'

function RouterView (props) {
  const redirectRoutes = []
  props.routes.forEach((route) => {
    if (route.redirect) {
      redirectRoutes.push(route)
    }
  })

  return (
    <Switch>
      {
        redirectRoutes.map((route, index) => (
          <Redirect to={route.redirect} from={route.path} key={index} exact={true}/>
        ))
      }
      {
        props.routes.map((route, index) => {
          return (
            <Route path={route.path} exact={!!route.exact} key={index} render={props => (
              <route.component {...props} route={route}/>
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
