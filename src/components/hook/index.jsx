import React, {useMemo} from 'react'
import {NavLink, Outlet, useLocation, useMatch, useOutlet, matchRoutes} from 'react-router-dom'
import ErrorBoundary from '@/components/error-boundary'
import routes from '@/router'

function HookDemo(props) {
  const outlet = useOutlet()
  const location = useLocation()
  console.log(outlet, location)
  const currentRoutes = useMemo(() => {
    const match = matchRoutes(routes, location.pathname)
    if (match && match.length > 0) {
      return match[0]
    }
    return []
  }, [location.pathname])
  return (
    <div>
      <ul className="nav">
        {currentRoutes.route.children.map(item => (
          <li key={item.path} style={{marginLeft: '10px'}}>
            <NavLink to={item.path}>
              {item.path}
            </NavLink>
          </li>
        ))}
      </ul>
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    </div>
  )
}

export default HookDemo
