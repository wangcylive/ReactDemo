import React, { useEffect, useState } from 'react'
import { hot } from 'react-hot-loader/root'
import { Link } from 'react-router-dom'

function List (props) {
  const [ count, setCount ] = useState(0)
  const [ display, setDisplay ] = useState({})

  const el = React.createRef()

  useEffect(() => {
    if (props.isActive) {
      console.log('显示')
      setDisplay({})
    } else {
      setTimeout(() => {
        setDisplay({ display: 'none' })
      }, 0)
      console.log(el.current.getBoundingClientRect())
      console.log('隐藏')
    }
  }, [props.isActive])

  return (
    <div style={display} ref={el}>
      <div>
        <ul>
          <li>
            <Link to="/keep-active/detail/1">Detail 1</Link>
          </li>
          <li>
            <Link to="/keep-active/detail/2">Detail 2</Link>
          </li>
        </ul>
      </div>

      <span>count: {count}</span>
      <button type="button" onClick={() => setCount(count + 1)}>Click</button>
    </div>
  )
}

export default hot(List)
