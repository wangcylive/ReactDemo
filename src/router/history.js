import React from 'react'
import {createBrowserHistory} from 'history'

const history = createBrowserHistory()

export default history

history.listen(listener => {
  console.log('history listener', listener)
})
