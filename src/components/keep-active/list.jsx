import React, {useEffect, useState} from 'react'
import {Link} from 'react-router'

function List(props) {
  const [count, setCount] = useState(0)

  const el = React.createRef()

  return (
    <div ref={el}>
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
      <button type="button" onClick={() => setCount(count + 1)}>
        Click
      </button>
    </div>
  )
}

export default List
