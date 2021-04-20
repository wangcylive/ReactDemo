import React, {useEffect, useRef} from 'react'
import ReactDOM from 'react-dom'
import {useNavigate, useResolvedPath} from 'react-router-dom'
import {hot} from 'react-hot-loader/root'

function init() {
  const div = document.createElement('div')

  document.body.appendChild(div)

  const tick = () => {
    const element = (
      <div>
        <h1 className="h1-ele">Hello, World!!!</h1>
        <div>Time: {Date.now()}</div>
      </div>
    )

    ReactDOM.render(element, div)
  }

  init.intervalID = setInterval(tick, 1000)

  return div
}

function ShowName(props) {
  const aa = useResolvedPath('/www/demo1')
  console.log('aa', aa)
  return <div>{props.render()}</div>
}

const Modal = props => {
  const refEl = useRef(document.createElement('div'))
  useEffect(() => {
    document.body.appendChild(refEl.current)

    return () => {
      document.body.removeChild(refEl.current)
    }
  }, [])
  return ReactDOM.createPortal(props.children, refEl.current)
}

function Demo1() {
  const navigate = useNavigate()

  useEffect(() => {
    const div = init()

    return () => {
      clearInterval(init.intervalID)
      div.parentElement.removeChild(div)
    }
  }, [])

  const onClick = event => {
    console.log(event.type, event.target)
  }

  const onPushHistory = () => {
    navigate('/demo2?name=333')
  }

  return (
    <div onClick={onClick}>
      <h3 className="text-center">demo1</h3>
      <ShowName render={() => <li>1</li>} />
      <Modal>
        <h1 className="my-4 text-indigo-600">呵呵哒</h1>
      </Modal>

      <button onClick={onPushHistory}>Push State</button>
    </div>
  )
}

export default hot(Demo1)
