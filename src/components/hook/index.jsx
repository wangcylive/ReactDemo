import React from 'react'
import { hot } from 'react-hot-loader/root'
import { withRouter } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import RouterView from '@/router/router-view'
import ErrorBoundary from '@/components/error-boundary'

function HookDemo (props) {
  const match = props.match.path
  const routes = props.route.children.map((route) => ({
    ...route,
    path: match + route.path
  }))
  return (
    <div>
      <ul className="nav">
        {
          props.route.children.map((item) => <li key={item.path} style={{ marginLeft: "10px" }}><NavLink activeClassName="active" to={match + item.path}>{item.path.substring(1)}</NavLink></li>)
        }
      </ul>
      <ErrorBoundary>
        <RouterView routes={routes}/>
      </ErrorBoundary>
    </div>
  )
}

export default hot(withRouter(HookDemo))
