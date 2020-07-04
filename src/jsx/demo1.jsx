import React, { useEffect, useRef } from 'react'
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

const Modal = (props) => {
  const refEl = useRef(document.createElement('div'))
  useEffect(() => {
    document.body.appendChild(refEl.current)

    return () => {
      document.body.removeChild(refEl.current)
    }
  }, [])
  return ReactDOM.createPortal(
    props.children,
    refEl.current
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

  const onClick = (event) => {
    console.log(event.type, event.target)
  }

  return (
    <div onClick={onClick}>
      <h3>demo1</h3>
      <ShowName render={() => <li>1</li>}/>
      <Modal><h1>呵呵哒</h1></Modal>
    </div>
  )
}

export default hot(Demo1)
