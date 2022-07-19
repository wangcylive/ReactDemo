import React, {useEffect, useRef} from 'react'

const url = 'https://m.baidu.com'
const IframeDemo: React.FC = () => {
  const refIframe = useRef<HTMLIFrameElement>()
  const refDiv = useRef<HTMLDivElement>()

  const onMove = (index: number) => {
    const div = refDiv.current.children[index]
    div.appendChild(refIframe.current)
  }
  useEffect(() => {
    const iframe = document.createElement('iframe')
    iframe.src = url
    iframe.frameBorder = 'none'
    iframe.width = '300px'
    iframe.height = '300px'
    iframe.onload = () => {
      console.log('iframe onload', performance.now())
    }

    refIframe.current = iframe
  }, [])
  return (
    <div>
      <button onClick={() => onMove(0)}>1</button>
      <button onClick={() => onMove(1)}>2</button>
      <div ref={refDiv}>
        <div>1</div>
        <div>2</div>
      </div>
    </div>
  )
}

export default IframeDemo
