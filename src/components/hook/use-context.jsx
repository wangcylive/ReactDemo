import React, { useEffect, useState, useContext } from 'react'
import { hot } from 'react-hot-loader/root'
import MyContext from './my-context'

export function Demo2 (props) {
  const context = useContext(MyContext)

  useEffect(() => {
    console.log(context)
  })

  const onClick = () => {
    context.changeName('Demo2')
  }

  return (
    <div>
      <div>context name: {context.name}</div>
      <div>context time: {context.time + ''}</div>
      <div>children change name <button onClick={onClick}>Click</button></div>
    </div>
  )
}

const time = Date.now()
function HookUseContext (props) {
  const [ name, setName ] = useState('')

  const onChange = (event) => {
    setName(event.target.value)
  }

  const contextValue = {
    name,
    time,
    changeName (name) {
      setName(name)
    }
  }

  return (
    <div>
      <MyContext.Provider value={contextValue}>
        <input type="text" value={name} onChange={onChange}/>
        <Demo2/>
      </MyContext.Provider>
    </div>
  )
}

export default hot(HookUseContext)
