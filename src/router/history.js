import React from 'react'
import {Router} from 'react-router-dom'
import {createBrowserHistory} from 'history'

const history = createBrowserHistory()

export default history

history.listen(listener => {
  console.log('history listener', listener)
})

export function HistoryRouter({children, history}) {
  const [state, dispatch] = React.useReducer((_, action) => action, {
    action: history.action,
    location: history.location,
  })

  React.useEffect(() => history.listen(dispatch), [history])

  return <Router children={children} action={state.action} location={state.location} navigator={history} />
}
