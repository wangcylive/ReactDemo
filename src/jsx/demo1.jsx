import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader/root'

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

function ShowName (props) {
  return (
    <div>
      {
        props.render()
      }
    </div>
  )
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
    <div>
      <h3>demo1</h3>
      <ShowName render={() => <li>1</li>}/>
    </div>
  )
}

export default hot(Demo1)
