import React, { Component } from 'react'
import PropTypes from 'prop-types'
import history from '@/router/history'

function KeepAlive (props) {
  const aliveRoutes = props.routes.filter((route) => route.keepAlive)
  const normalRoutes = props.routes.filter((route) => !route.keepAlive)

}

KeepAlive.propTypes = {
  routes: PropTypes.array
}

export default KeepAlive
