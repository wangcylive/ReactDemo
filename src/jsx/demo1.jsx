import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

function init () {
  const div = document.createElement('div')

  document.body.appendChild(div)

  const tick = () => {
    const element = (
      <div>
        <h1 className='h1-ele'>Hello, World!!!</h1>
        <div>Time: {Date.now()}</div>
      </div>
    )

    ReactDOM.render(
      element,
      div,
    )
  }

  init.intervalID = setInterval(tick, 1000)

  return div
}

function Demo1 () {
  useEffect(() => {
    const div = init()

    return () => {
      clearInterval(init.intervalID)
      div.parentElement.removeChild(div)
    }
  }, [])

  return (
    <div>demo1</div>
  )
}

export default Demo1
