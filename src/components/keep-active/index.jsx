import React from 'react'
import RouterView from '@/router/router-view'
import { Link } from 'react-router-dom'

function User (props) {
  return (
    <div>
      <div>header</div>
      <div>
        <ul>
          <li>
            <Link to="/keep-active/detail/1">Detail 1</Link>
          </li>
          <li>
            <Link to="/keep-active/detail/2">Detail 2</Link>
          </li>
        </ul>
      </div>
      <div>
        <RouterView routes={props.route.children}/>
      </div>
    </div>
  )
}

export default User
