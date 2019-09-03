import React from 'react'

function LazyComponent (props) {
  const onClick = () => {
    props.dispatch()
  }
  return (
    <div>
      <hr/>
      <div>count: { props.count }</div>
      <div><button onClick={onClick}>dispatch</button></div>
    </div>
  )
}

export default LazyComponent
