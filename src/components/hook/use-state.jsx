import React, { useState, useEffect, useDebugValue } from 'react'

function HookUseState () {
  const [ name, setName ] = useState('name')

  useDebugValue(name)

  const onChange = (event) => {
    setName(event.target.value)
  }

  return (
    <div>
      <input value={name} onChange={onChange}/>
      <div>name: {name}</div>
    </div>
  )
}

export default HookUseState
