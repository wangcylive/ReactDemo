import React, {useEffect} from 'react'
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
  useEffect(() => {
    document.body.className = 'bg-indigo-50 sm:bg-yellow-50 md:bg-blue-50 lg:bg-red-50 xl:bg-green-50'
  }, [])
  return (
    <Provider store={state}>
      <HistoryRouter history={history}>
        <div>
          <ul className="flex flex-wrap sm:text-lg">
            {routes.map((route, index) => (
              <li key={index} className="m-1">
                <NavLink activeClassName="text-red-500" to={route.path}>
                  {route.path === '/' ? 'Home' : route.path.substring(1)}
                </NavLink>
              </li>
            ))}
          </ul>
          <span className="text-sm text-primary text-30">明哥</span>
          <RoutesElement />
        </div>
      </HistoryRouter>
    </Provider>
  )
}

export default hot(View)
