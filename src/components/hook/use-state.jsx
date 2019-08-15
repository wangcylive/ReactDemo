import React, { useState, useEffect, useDebugValue } from 'react'

const date = new Date()

function HookUseState () {
  const [ name, setName ] = useState('name')
  const [ count, setCount ] = useState(0)
  const [ dateStr, setDateStr ] = useState(()=> {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  })

  useDebugValue(name)

  const onChange = (event) => {
    setName(event.target.value)
  }

  return (
    <div>
      <p>
        <input value={name} onChange={onChange}/>
        <span>name: {name}</span>
      </p>
      <p>
        <button onClick={e => setCount(val => val + 1)}>Increment</button>
        <button onClick={e => setCount(val => val - 1)}>Decrement</button>
        <span>count: {count}</span>
      </p>
      <p>date: {dateStr}</p>
    </div>
  )
}

export default HookUseState
