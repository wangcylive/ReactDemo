import React from 'react'
import { Link } from 'react-router-dom'
import RouterView from '@/router/router-view'
import KeepAlive from '@/router/keep-alive'

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
        <KeepAlive routes={props.route.children}/>
      </div>
    </div>
  )
}

export default User
