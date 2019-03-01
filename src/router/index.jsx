import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import state from '@/store/index'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader'

import Home from '@/jsx/home'
import Demo2 from '../jsx/demo2'
import Demo6 from '../jsx/demo6'
import Demo7 from '../jsx/demo7'
import TodoList from '@/components/todo-list'
import ClickCounter from '@/components/click-counter'
import ControlPanel from '@/components/control-panel'
import IndexedDBDemo from '../components/indexedDB'
import ContextDemo from '../jsx/context'

import '@/css/nav.scss'

const DemoIndex = () => (
  <Provider store={ state }>
  <Router>
    <div>
      <ul className={ "nav" }>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/demo2">demo2</Link></li>
        <li><Link to="/demo6">demo6</Link></li>
        <li><Link to="/demo7">demo7</Link></li>
        <li><Link to="/todo-list">TodoList🤓</Link></li>
        <li><Link to="/click-counter">ClickCounter</Link></li>
        <li><Link to="/control-panel">ControlPanel</Link></li>
        <li><Link to="/indexedDB">indexedDB</Link></li>
        <li><Link to="/context-demo">Context</Link></li>
      </ul>

      <hr/>
      <Route path="/" component={ Home } />
      <Route path="/demo2" component={ Demo2 } />
      <Route path="/demo6" component={ Demo6 } />
      <Route path="/demo7" component={ Demo7 }/>
      <Route path="/todo-list" component={TodoList}/>
      <Route path="/click-counter" component={ClickCounter}/>
      <Route path="/control-panel" component={ ControlPanel } />
      <Route path="/indexedDB" component={ IndexedDBDemo } />
      <Route path="/context-demo" component={ ContextDemo }/>
    </div>
  </Router>
  </Provider>
)

export default hot(module)(DemoIndex)
