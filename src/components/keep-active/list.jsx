import React, { useEffect, useState } from 'react'

function List (props) {
  const [ count, setCount ] = useState(0)

  return (
    <div>
      <span>count: {count}</span>
      <button type="button" onClick={() => setCount(count + 1)}>Click</button>
    </div>
  )
}

export default List
