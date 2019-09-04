import React from 'react'
import { hot } from 'react-hot-loader/root'
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

export default hot(User)
