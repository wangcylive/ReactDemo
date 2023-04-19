import React, {useEffect, useRef, useState} from 'react'
import styled from 'styled-components'

const TextInput = styled.input`
  display: block;
  padding: 10px;
  width: 200px;
  margin: 10px 0;
  border: 1px solid #666;
`

const FixedBottomInput = styled.div`
  height: 100px;

  .wrap {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100vw;
    padding: 10px;
    box-sizing: border-box;
    background-color: #fff;
    z-index: 1;
    box-shadow: 0 0 3px hsla(0, 0%, 0%, 0.1);
  }

  .input {
    display: block;
    padding: 10px;
    width: 100%;
    margin: 10px 0;
    border: 1px solid #666;
    box-sizing: border-box;
  }
`

const DivFlex = styled.div`
  display: flex;
  justify-content: space-between;

  > div {
    width: 80px;
    background-color: #ccc;
    text-align: center;
  }
`

const LengthItem: React.FC<{height: string}> = props => {
  const [heightPx, setHeightPx] = useState<string>('')
  const refEl = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const resize = () => {
      if (refEl.current) {
        setHeightPx(refEl.current.clientHeight + 'px')
      }
    }
    resize()

    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])
  return (
    <div style={{height: props.height}} ref={refEl}>
      <p>{props.height}</p>=<p>{heightPx}</p>
    </div>
  )
}

const types = ['resizes-visual', 'resizes-content', 'overlays-content']

const InteractiveWidget: React.FC = () => {
  const setViewport = (value: string) => {
    const metaEl = document.querySelector('meta[name="viewport"]')
    if (metaEl) {
      const content = metaEl.getAttribute('content')
      console.log(content)
      const defaultContent =
        'width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=0, viewport-fit=cover'
      metaEl.setAttribute('content', defaultContent + ', interactive-widget=' + value)
    }
  }

  return (
    <div>
      <p>
        浏览器的交互式 UI 组件可以影响页面视口的大小。最常见的这种 UI
        组件是虚拟键盘。要控制浏览器应该使用哪种调整大小的行为，可以设置 <code>interactive-widget</code> 属性。
      </p>
      <p>
        默认值<code>resizes-visual</code> 虚拟视口被交互式组件调整大小。
      </p>
      <p>
        <code>resizes-content</code> 视口被交互式组件调整大小。
      </p>
      <p>
        <code>overlays-content</code> 虚拟视口和视口都不会被交互式组件调整大小。
      </p>

      {types.map((item, index) => (
        <button key={index} onClick={() => setViewport(item)}>
          {item}
        </button>
      ))}

      <TextInput placeholder={'请输入'} />

      <DivFlex>
        <LengthItem height={'100vh'} />
        <LengthItem height={'100dvh'} />
        <LengthItem height={'100lvh'} />
        <LengthItem height={'100svh'} />
      </DivFlex>

      <FixedBottomInput>
        <div className="wrap">
          <input type="text" className="input" enterKeyHint="send" placeholder={'请输入'} />
        </div>
      </FixedBottomInput>
    </div>
  )
}

export default InteractiveWidget
