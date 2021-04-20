import React, {useEffect, useReducer, useState} from 'react'
import {hot} from 'react-hot-loader/root'
const LazyComponent = React.lazy(() => import('./lazy-comp'))

function LazyTest() {
  const [state, dispatch] = useReducer(state => state + 1, 1)
  const [loading, setLoading] = useState(false)
  const [Component2, setComponent] = useState(null)
  useEffect(() => {
    setLoading(true)
    import('./lazy-comp2').then(res => {
      setComponent(React.createElement(res.default))
      setLoading(false)
    })
  }, [])
  return (
    <div>
      <h3>test lazy components</h3>
      <React.Suspense fallback={<div>loading...</div>}>
        <LazyComponent count={state} dispatch={dispatch} />
      </React.Suspense>
      <div>{loading ? '加载中' : Component2}</div>
    </div>
  )
}

export default hot(LazyTest)
