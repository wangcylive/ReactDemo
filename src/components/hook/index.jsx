import React from 'react'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import RouterView from '@/router/router-view'

function HookDemo (props) {
  const match = props.match.path
  const routes = props.route.children.map((route) => ({
    ...route,
    path: match + route.path
  }))
  return (
    <div>
      <ul>
        {
          props.route.children.map((item) => <li key={item.path}><Link to={match + item.path}>{item.path}</Link></li>)
        }
      </ul>
      <RouterView routes={routes}/>
    </div>
  )
}

export default withRouter(HookDemo)
