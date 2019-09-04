import React, { useState, useMemo, useEffect } from 'react'
import { hot } from 'react-hot-loader/root'

function HookUseMemo (props) {
  const [ name, setName ] = useState('')
  const [ age, setAge ] = useState('')

  const userInfo = useMemo(() => {
    return `name: ${name}, age: ${age}`
  }, [name, age])

  return (
    <div>
      <input value={name} placeholder="enter name" onChange={e => setName(e.target.value)} />
      <input type="number" value={age} onChange={e => setAge(e.target.valueAsNumber)} placeholder="enter age"/>
      <p><span>name: {name}</span> <span>age: {age}</span></p>
      <p><strong>userMemo</strong> user info: {userInfo}</p>
    </div>
  )
}

export default hot(HookUseMemo)
