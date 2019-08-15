import React, { useState, useEffect, useDebugValue, useRef } from 'react'

function usePrevious (value) {
  const ref = useRef(value)
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

const date = new Date()

function HookUseState () {
  const [ name, setName ] = useState('name')
  const [ count, setCount ] = useState(0)
  const [ dateStr, setDateStr ] = useState(()=> {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  })
  const prevName = usePrevious(name)
  const nameLength = name.length
  const prevNameLength = usePrevious(nameLength)

  useEffect(() => {
    console.log(name, prevName)
  })

  useDebugValue(name)

  const onChange = (event) => {
    setName(event.target.value)
  }

  return (
    <div>
      <p>
      <input value={name} onChange={onChange}/>
      <button onClick={e => setName('SS')}>set name</button>
      </p>
      <p>name: {name} <span>prev name: {prevName}</span></p>
      <p><span>name length: {nameLength}</span> <span>prev name length: {prevNameLength}</span></p>
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
