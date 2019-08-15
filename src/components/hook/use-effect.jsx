import React, { useState, useRef, useEffect } from 'react'

function HookUseEffect (props) {
  const [ name, setName ] = useState('')
  const [ number, setNumber ] = useState(0)
  const [ count, setCount ] = useState(0)
  const intervalRef = useRef()
  const inputEl = useRef(null)

  const onStart = () => {
    intervalRef.current = setInterval(() => {
      console.log('setInterval', performance.now())
      setCount((val) => val + 1)
    }, 1000)
  }

  const onStop = () => {
    clearInterval(intervalRef.current)
  }

  useEffect(() => {
    console.log('only one useEffect', performance.now())
    inputEl.current.focus()

    return () => {
      clearInterval(intervalRef.current)
      console.log('only one userEffect destroy', performance.now())
    }
  }, [])

  useEffect(() => {
    console.log('useEffect', performance.now())
    return () => {
      console.log('HookUseEffect destroy', performance.now())
    }
  }, [name])

  const onChange = (event) => {
    setName(event.target.value)
  }

  const onChangeNumber = (event) => {
    setNumber(event.target.valueAsNumber)
  }

  return (
    <div>
      <div><input ref={inputEl} value={name} onChange={onChange}/></div>
      <div><input type="number" value={number} onChange={onChangeNumber}/></div>
      <div>count: {count} <button onClick={onStart}>Start</button> <button onClick={onStop}>Stop</button></div>
    </div>
  )
}

export default HookUseEffect
