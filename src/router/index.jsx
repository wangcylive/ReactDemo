import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Demo2 from '../jsx/demo2'
import Demo6 from '../jsx/demo6'
import Demo7 from '../jsx/demo7'
import IndexedDBDemo from '../components/indexedDB'

import '@/css/nav.scss'

const DemoIndex = () => (
  <Router>
    <div>
      <ul className={ "nav" }>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/demo2">demo2</Link></li>
        <li><Link to="/demo6">demo6</Link></li>
        <li><Link to="/demo7">demo7</Link></li>
        <li><Link to="/indexedDB">indexedDB</Link></li>
      </ul>

      <hr/>

      <Route path="/demo2" component={ Demo2 } />
      <Route path="/demo6" component={ Demo6 } />
      <Route path="/demo7" component={ Demo7 }/>
      <Route path="/indexedDB" component={ IndexedDBDemo }></Route>
    </div>
  </Router>
)

export default DemoIndex
