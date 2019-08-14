import React, { useState, useEffect, useDebugValue, useRef } from 'react'

function usePrevious (value) {
  const ref = useRef(value)
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

function HookUseState () {
  const [ name, setName ] = useState('name')
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
      <input value={name} onChange={onChange}/>
      <button onClick={e => setName('SS')}>set name</button>
      <p>name: {name} <span>prev name: {prevName}</span></p>
      <p><span>name length: {nameLength}</span> <span>prev name length: {prevNameLength}</span></p>
    </div>
  )
}

export default HookUseState
