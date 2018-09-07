import React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import Demo2 from '../jsx/demo2'
import Demo6 from '../jsx/demo6'
import Demo7 from '../jsx/demo7'
import TodoList from '@/components/todo-list'
import ClickCounter from '@/components/click-counter'
import ControlPanel from '@/components/control-panel'

import '@/css/nav.scss'

const DemoIndex = () => (
  <Router>
    <div>
      <ul className={"nav"}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/demo6">demo6</Link></li>
        <li><Link to="/demo7">demo7</Link></li>
        <li><Link to="/todo-list">TodoList🤓</Link></li>
        <li><Link to="/click-counter">ClickCounter</Link></li>
        <li><Link to="/control-panel">ControlPanel</Link></li>
      </ul>

      <hr/>

      <Route path="/demo2" component={Demo2}/>
      <Route path="/demo6" component={Demo6}/>
      <Route path="/demo7" component={Demo7}/>
      <Route path="/todo-list" component={TodoList}/>
      <Route path="/click-counter" component={ClickCounter}/>
      <Route path="/control-panel" component={ ControlPanel } />
    </div>
  </Router>
)

export default DemoIndex
