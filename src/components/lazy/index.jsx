import React, {useEffect, useReducer, useState} from 'react'
const LazyComponent = React.lazy(() => import('./lazy-comp'))

function LazyTest() {
  const [state, dispatch] = useReducer(state => state + 1, 1)
  const [lazyLoading, setLazyLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const [Component2, setComponent] = useState(null)
  useEffect(() => {
    // setLoading(true)
    // import('./lazy-comp2').then(res => {
    //   setComponent(React.createElement(res.default))
    //   setLoading(false)
    // })
  }, [])
  const onLoadComp = () => {
    setLoading(true)
    import('./lazy-comp2').then(res => {
      console.log('res', res)
      setComponent(React.createElement(res.default))
      setLoading(false)
    })
  }
  return (
    <div>
      <h3>test lazy components</h3>
      <button onClick={() => setLazyLoading(false)}>React.lazy加载组件</button>
      <React.Suspense fallback={<div>loading...</div>}>
        {/*{Component2}*/}
        {!lazyLoading && <LazyComponent count={state} dispatch={dispatch} />}
      </React.Suspense>
      <button onClick={onLoadComp}>点击加载组件</button>
      <div>{loading ? '加载中' : Component2}</div>
    </div>
  )
}

export default LazyTest
