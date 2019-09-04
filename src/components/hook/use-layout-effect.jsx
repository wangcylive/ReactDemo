import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { hot } from 'react-hot-loader/root'

function HookUseLayoutEffect (props) {
  const [ name, setName ] = useState('')
  const spanEl = useRef(null)

  useEffect(() => {
    console.log('useEffect', spanEl.current.innerHTML, performance.now())

    return () => {
      console.log('userEffect destroy', performance.now())
    }
  })

  useLayoutEffect(() => {
    console.log('useLayoutEffect', spanEl.current.innerHTML, performance.now())

    return () => {
      console.log('userLayoutEffect destroy', performance.now())
    }
  })

  return (
    <div>
      <input type="text" value={name} onChange={e => setName(e.target.value)}/>
      <span ref={spanEl}>name: {name}</span>
    </div>
  )
}

export default hot(HookUseLayoutEffect)
