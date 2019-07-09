import React, { useState, useEffect, useContext } from 'react'
import { Router, Switch } from 'react-router'
import { Link, Route } from 'react-router-dom'
import RouterView from '@/router/router-view'
import MyContext from './my-context'
import { ShowName1, ShowName2 } from './show-name'
import { Demo1, Demo2 } from './demo1'

function HookDemo (props) {
  return (
    <div>
      <Link to="/hook/useState">useState</Link>
      <RouterView routes={props.route.children}/>
    </div>
  )
}

export default HookDemo
