import React, { Component } from 'react'
import Loadable from 'react-loadable'
import Loading from './loading'

export default (loader) => Loadable({
  loader,
  loading: Loading,
  timeout: 10 * 1e4,
  delay: 300000
})
