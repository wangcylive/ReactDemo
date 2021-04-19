import React from 'react'
import state from '@/store/index'
import {Provider} from 'react-redux'
import {hot} from 'react-hot-loader/root'
import {NavLink, BrowserRouter, useRoutes} from 'react-router-dom'
import routes from '@/router'
import history from '@/router/history'
import '@/css/nav.scss'
import ErrorBoundary from '@/components/error-boundary'

const RoutesElement = () => {
  const newRoutes = routes.map(route => {
    if (route.children) {
      route.children = route.children.map(route => ({
        ...route,
        element: <ErrorBoundary>{route.element}</ErrorBoundary>,
      }))
    }
    route.element = <ErrorBoundary>{route.element}</ErrorBoundary>
    return route
  })
  const element = useRoutes(newRoutes)
  return <div>{element}</div>
}

function View(props) {
  return (
    <Provider store={state}>
      <BrowserRouter history={history}>
        <div>
          <ul className="nav">
            {routes.map((route, index) => (
              <li key={index}>
                <NavLink activeClassName="active" to={route.path}>
                  {route.path === '/' ? 'Home' : route.path.substring(1)}
                </NavLink>
              </li>
            ))}
          </ul>
          <RoutesElement />
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default hot(View)
