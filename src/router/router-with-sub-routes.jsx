import React from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'

function NavLink () {
  return (
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
        <li><Link to="/indexedDB/native">indexedDB Native</Link></li>
        <li><Link to="/indexedDB/localforage">indexedDB localForage</Link></li>
        <li><Link to={"/indexedDB/dexie"}>indexedDB dexie</Link></li>
        <li><Link to={"/indexedDB/cefsql"}>cef sql</Link></li>
        <li><Link to="/context-demo">Context</Link></li>
        <li><Link to={"/focus"}>Focus</Link></li>
      </ul>

      <hr/>
    </div>
  )
}

export default ({ routes }) => {
  return (
    <BrowserRouter>
      <div>
        <NavLink/>
        <Switch>
          {
            routes.map((route, index) => (
              <Route key={index} exact={!!route.exact} path={route.path} render={props => (
                <route.component { ...props } { ...route }/>
              )}/>
            ))
          }
        </Switch>
      </div>
    </BrowserRouter>
  )
}
