import React from 'react'
import state from '@/store/index'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader/root'
import { NavLink, Router } from 'react-router-dom'
import RouterView from '@/router/router-view'
import routes from '@/router'
import history from '@/router/history'
import '@/css/nav.scss'
import ErrorBoundary from '@/components/error-boundary'

function View (props) {
  console.log('View Render', performance.now())
  return (
    <Provider store={ state }>
      <Router history={history}>
        <div>
          <ul className="nav">
            {
              routes.map((route, index) => (
                <li key={index}><NavLink activeClassName="active" exact={route.path === '/'} to={route.path}>{route.path === '/' ? 'Home' : route.path.substring(1)}</NavLink></li>
              ))
            }
          </ul>
          <ErrorBoundary>
            <RouterView routes={routes}/>
          </ErrorBoundary>
        </div>
      </Router>
    </Provider>
  )
}

export default hot(View)
