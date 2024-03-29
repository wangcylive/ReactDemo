import React, {Component} from 'react'
import {Link, Outlet} from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Link to="native">native</Link>
        <Link to="localforage">localforage</Link>
        <Link to="dexie">dexie</Link>
        <Link to="cefsql">cefsql</Link>
        <Outlet />
      </div>
    )
  }
}

export default App
