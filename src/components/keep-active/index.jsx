import React, {Activity, Suspense} from 'react'
import {Link, Outlet, useLocation} from 'react-router'
import Detail from './detail'
import List from './list'
import RouterView from '@/router/router-view'
import KeepAlive from '@/router/keep-alive'

function User(props) {
  const location = useLocation()
  const isList = location.pathname === '/keep-active/list'
  console.log('location', location)
  return (
    <div>
      <div>KeepAlive 测试</div>
      {/*<Suspense fallback={<div>Loading...</div>}>*/}
      {/*  <Outlet />*/}
      {/*</Suspense>*/}
      <Activity mode={isList ? 'visible' : 'hidden'}>
        <List />
      </Activity>
      <Activity mode={!isList ? 'visible' : 'hidden'}>
        <Detail />
      </Activity>
      <div>{/*<KeepAlive routes={props.route.children}/>*/}</div>
    </div>
  )
}

export default User
