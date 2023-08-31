import React, {useEffect, useRef} from 'react'
import {observer} from 'mobx-react'
import ReactDOM from 'react-dom'
import ClientReactDom from 'react-dom/client'
import {useNavigate, useResolvedPath} from 'react-router-dom'
import styled from 'styled-components'
import marketStore from '@/store/marketStore'

const H1 = styled.h1`
  font-family: 'ssdingdang';
`

const ThreeSection = styled.div`
  width: 718px;
  background-color: #33394b;
  .header {
    height: 220px;
    background: 0 0 / contain no-repeat url(https://hd-static.yystatic.com/09097760379797304.png);
  }
  .main {
    background: 0 0 / contain repeat-y url(https://hd-static.yystatic.com/7504412656845041.png);
    display: flex;
    flex-direction: column;
  }
  .container {
    margin: -210px 0 -40px 0;

    p {
      margin: 0;
      padding: 0.5em 1em;
    }
  }
  .footer {
    height: 50px;
    background: 0 0 / contain no-repeat url(https://hd-static.yystatic.com/3027504787533204.png);
  }
`

function init() {
  const div = document.createElement('div')
  document.body.appendChild(div)

  const app = ClientReactDom.createRoot(div)

  const tick = () => {
    const element = (
      <div>
        <H1 className="text-lg">Hello, World!!!</H1>
        <div>Time: {Date.now()}</div>
      </div>
    )

    app.render(element)
  }

  init.intervalID = setInterval(tick, 1000)

  return div
}

function ShowName(props) {
  const resolvedPath = useResolvedPath('/www/demo1')
  console.log('useResolvedPath', resolvedPath)
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

  const onChangeMarket = () => {
    marketStore.updateInfo({
      opentype: 'test' + Date.now(),
    })
  }

  return (
    <div onClick={onClick}>
      <h3 className="text-3xl">demo1</h3>
      <ShowName render={() => <p>1</p>} />
      <Modal>
        <h1 className="my-4 text-indigo-600">呵呵哒</h1>
      </Modal>

      <button onClick={onPushHistory}>Push State</button>

      <ThreeSection>
        <div className="header"></div>
        <div className="main">
          <div className="container">
            {Array.from({length: 30}).map((_, index) => (
              <p key={index}>智慧中国、中国制造 {index}</p>
            ))}
          </div>
        </div>
        <div className="footer"></div>
      </ThreeSection>

      <button onClick={onChangeMarket}>Change market</button>
      <div>{marketStore.opentype}</div>
    </div>
  )
}

export default observer(Demo1)
