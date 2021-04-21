import React from 'react'
import state from '@/store/index'
import {Provider} from 'react-redux'
import {hot} from 'react-hot-loader/root'
import {NavLink, BrowserRouter, useRoutes, useLocation} from 'react-router-dom'
import routes from '@/router'
import history, {HistoryRouter} from '@/router/history'
import '@/css/index.scss'
import '@/css/common.scss'
import ErrorBoundary from '@/components/error-boundary'

const RoutesElement = () => {
  const location = useLocation()
  // console.log('location', location)
  // console.log('RoutesElement', performance.now(), location.pathname)
  // const newRoutes = routes.map(route => {
  //   if (route.children) {
  //     route.children = route.children.map(route => ({
  //       ...route,
  //       element: {route.element}</ErrorBoundary>,
  //     }))
  //   }
  //   route.element = <ErrorBoundary from="router">333{route.element}</ErrorBoundary>
  //   return route
  // })
  const element = useRoutes(routes)
  return <ErrorBoundary>{element}</ErrorBoundary>
}

function View(props) {
  return (
    <Provider store={state}>
      <HistoryRouter history={history}>
        <div>
          <ul className="flex flex-wrap sm:text-lg">
            {routes.map((route, index) => (
              <li key={index} className="m-2">
                <NavLink activeClassName="text-red-500" to={route.path}>
                  {route.path === '/' ? 'Home' : route.path.substring(1)}
                </NavLink>
              </li>
            ))}
          </ul>
          <RoutesElement />
        </div>
      </HistoryRouter>
    </Provider>
  )
}

export default hot(View)
