import React, { useReducer } from 'react'
import { hot } from 'react-hot-loader/root'
const LazyComponent = React.lazy(() => import('./lazy-comp'))

function LazyTest () {
  const [ state, dispatch ] = useReducer(state => state + 1, 1)
  return (
    <div>
      <h3>test lazy components</h3>
      <React.Suspense fallback={<div>loading...</div>}>
        <LazyComponent count={state} dispatch={dispatch}/>
      </React.Suspense>
    </div>
  )
}

export default hot(LazyTest)
