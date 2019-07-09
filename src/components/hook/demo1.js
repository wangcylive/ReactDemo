import React, { useEffect, useState, useContext } from 'react'
import MyContext from './my-context'

export function Demo1 (props) {
  const [ count, setCount ] = useState(2)

  const b = useState({name: 'b'})

  let el1 = null

  // componentDidMount componentDidUpdate
  useEffect(() => {
    console.log('1 useEffect', count, b[0], el1.innerText)

    // componentWillUnmount
    return () => {
      console.log('destroy', count)
    }
  })

  useEffect(() => {
    console.log('2 useEffect')
  })

  return (
    <div>
      <p ref={el => el1 = el}>you clicked {count} times.</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}

export function Demo2 (props) {
  const context = useContext(MyContext)

  useEffect(() => {
    console.log(context)
  })

  console.log('start', context)

  return (
    <div>
      <div>context name: {context.name}</div>
      <div>context time: {context.time + ''}</div>
    </div>
  )
}
