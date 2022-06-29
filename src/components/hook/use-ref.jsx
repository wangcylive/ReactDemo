import React, { useRef, useEffect, useCallback, useState } from 'react'

function useClientHeight () {
  const [ clientHeight, setClientHeight ] = useState(null)

  const ref = useCallback((node) => {
    if (node !== null) {
      setClientHeight(node.clientHeight)
    }
  }, [])

  return [ clientHeight, ref ]
}

function HookUseRef (props) {
  const [ val, setVal ] = useState('')
  const inputEl = useRef(null)
  const [ ulClientHeight, ulRef ] = useClientHeight()

  const divEl = useCallback((node) => {
    if (node !== null) {
      console.log('useCallback', node.clientHeight)
    }
  }, [val])

  const pEl = useRef(null)

  useEffect(() => {
    inputEl.current.focus()
    console.log('useRef', pEl.clientHeight)
  })

  return (
    <div>
      <input ref={inputEl} value={val} onChange={(e) => setVal(e.target.value)}/>
      <div ref={divEl}>useCallback</div>
      <p ref={pEl}>useRef</p>
      <ul ref={ulRef}>
        <li>ulClientHeight: {ulClientHeight}</li>
      </ul>
    </div>
  )
}

export default HookUseRef
