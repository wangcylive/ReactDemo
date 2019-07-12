import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect, Switch, BrowserRouter } from 'react-router-dom'
import history from '@/router/history'
import RouterView from './router-view'

function DisplayControl (props) {
  const style = {}
  console.log(history, props)
  // if (history.location.pathname !== props.path) {
  //   style.display = 'none'
  // }
  return (
    <div style={style}>
      <props.component/>
    </div>
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

export default KeepAlive
