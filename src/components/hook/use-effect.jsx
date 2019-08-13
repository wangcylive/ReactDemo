import React, { useState, useRef, useEffect } from 'react'

function HookUseEffect (props) {
  const [ name, setName ] = useState('')
  const [ number, setNumber ] = useState(0)
  const [ count, setCount ] = useState(0)
  const [ id, setId ] = useState()
  const inputEl = useRef(null)

  const onStart = () => {
    const id = setInterval(() => {
      console.log('setInterval', performance.now())
      setCount((val) => val + 1)
    }, 1000)

    setId(id)
  }

  const onStop = () => {
    clearInterval(id)
  }

  useEffect(() => {
    return () => {
      clearInterval(id)
    }
  }, [id])

  useEffect(() => {
    console.log('only one useEffect', performance.now())
    inputEl.current.focus()

    return () => {
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