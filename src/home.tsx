import React from 'react'
import {routes} from '@/router'
import {NavLink, Outlet} from 'react-router-dom'

const Home: React.FC = () => {
  return (
    <div>
      <div>
        <ul className="nav">
          {routes[0].children.map((route, index) => (
            <li key={index}>
              <NavLink to={route.path}>{route.path === '/' ? 'Home' : route.path.substring(1)}</NavLink>
            </li>
          ))}
        </ul>
        <Outlet />
      </div>
    </div>
  )
}

export default Home
