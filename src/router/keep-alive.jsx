import React, { useState } from 'react'
import PropTypes from 'prop-types'
import history from '@/router/history'
import RouterView from './router-view'

function DisplayControl (props) {
  let isActive = history.location.pathname.startsWith(props.path)
  return (
    <props.component {...props} isActive={isActive}/>
  )
}

function KeepAlive (props) {
  const aliveRoutes = props.routes.filter((route) => route.keepAlive)
  const normalRoutes = props.routes.filter((route) => !route.keepAlive)

  return (
    <>
      {
        aliveRoutes.map((route) => (<DisplayControl {...route} key={route.path}/>))
      }
      <RouterView routes={normalRoutes}/>
    </>
  )
}

KeepAlive.propTypes = {
  routes: PropTypes.array
}

export const usekeepAliveDisplayState = () => {
  const [ style, setStyle ] = useState({})

  const timeoutSetStyle = (bool) => {
    setTimeout(() => {
      setStyle(bool ? null : { display: 'none' })
    }, 0)
  }

  return [ style, timeoutSetStyle ]
}

export default KeepAlive
