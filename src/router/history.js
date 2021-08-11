import React from 'react'
import {Router} from 'react-router-dom'
import {createBrowserHistory} from 'history'

const history = createBrowserHistory()

history.listen(a => {
  console.log('aaa', a)
})

export default history

export function HistoryRouter({children, history}) {
  let [state, dispatch] = React.useReducer((_, action) => action, {
    action: history.action,
    location: history.location,
  })

  React.useEffect(() => history.listen(dispatch), [history])

  return <Router children={children} action={state.action} location={state.location} navigator={history} />
}
