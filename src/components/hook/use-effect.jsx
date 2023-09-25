import React, {useState, useRef, useEffect, useCallback} from 'react'

const Demo = () => {
  useEffect(() => {
    console.log('Demo useEffect', performance.now())
  }, [])
  return <div>Children</div>
}

function HookUseEffect(props) {
  const [name, setName] = useState('')
  const [number, setNumber] = useState(0)
  const [count, setCount] = useState(0)
  const intervalRef = useRef()
  const inputEl = useRef(null)

  const onStart = () => {
    intervalRef.current = setInterval(() => {
      console.log('setInterval', performance.now())
      setCount(val => val + 1)
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
    console.log('useEffect', name, performance.now())
    return () => {
      console.log('HookUseEffect destroy', name, performance.now())
    }
  }, [name])

  useEffect(() => {
    if (count > 10) {
      return
    }

    return () => {
      console.log('useEffect callback', count)
    }
  }, [count])

  const onChange = event => {
    setName(event.target.value)
  }

  const onChangeNumber = event => {
    setNumber(event.target.valueAsNumber)
  }

  console.log('useEffect', performance.now())

  return (
    <div>
      <div>
        <input ref={inputEl} value={name} onChange={onChange} />
      </div>
      <div>
        <input type="number" value={number} onChange={onChangeNumber} />
      </div>
      <div>
        count: {count} <button onClick={onStart}>Start</button> <button onClick={onStop}>Stop</button>
      </div>
      <Demo />
    </div>
  )
}

export default HookUseEffect
