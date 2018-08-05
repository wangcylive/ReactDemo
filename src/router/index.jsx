import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Demo6 from '../jsx/demo6'
import Demo7 from '../jsx/demo7'

const DemoIndex = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/demo1">demo1</Link></li>
        <li><Link to="/demo2">demo2</Link></li>
        <li><Link to="/demo3">demo3</Link></li>
        <li><Link to="/demo4">demo4</Link></li>
        <li><Link to="/demo5">demo5</Link></li>
        <li><Link to="/demo6">demo6</Link></li>
        <li><Link to="/demo7">demo7</Link></li>
      </ul>

      <hr/>

      <Route path="/demo6" component={ Demo6 } />
      <Route path="/demo7" component={ Demo7 }/>
    </div>
  </Router>
)

export default DemoIndex
