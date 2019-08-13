import React, { useState, useEffect } from 'react'

function HookUseState () {
  const [ name, setName ] = useState('name')

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