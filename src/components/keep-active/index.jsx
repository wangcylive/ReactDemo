import React from 'react'
import { Link } from 'react-router-dom'
import RouterView from '@/router/router-view'
import KeepAlive from '@/router/keep-alive'

function User (props) {
  console.log('User render', performance.now())
  return (
    <div>
      <div>header</div>
      <div>
        <KeepAlive routes={props.route.children}/>
      </div>
    </div>
  )
}

export default User
