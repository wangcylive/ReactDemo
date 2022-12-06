import React, {useEffect, useRef} from 'react'
import styled from 'styled-components'

const Wrap = styled.div`
  video {
    display: block;
    width: 300px;
    height: 140px;
    object-fit: contain;
    object-position: center;
    background-color: #000;
  }

  label {
    display: inline-block;
    vertical-align: top;
  }

  .div1 {
    box-shadow: 0 0 2px 3px #eee;
  }
`

const ShadowDom: React.FC = () => {
  const refDiv1 = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const div = refDiv1.current
    const shadowDom = div.attachShadow({mode: 'open'})
    const span = document.createElement('span')
    span.textContent = div.textContent + ': ' + div.getAttribute('tips')
    const style = document.createElement('style')
    style.innerText = `
    :host {
      border: 1px solid #ccc;
    }
    :host(:focus) {
      border-color: blue;
    }
    :host-context(.main) {
      font-weight: bold;
    }
    `
    shadowDom.appendChild(span)
    shadowDom.appendChild(style)
  }, [])
  return (
    <Wrap>
      <video controls={true} muted={true} autoPlay={true} src={'http://vjs.zencdn.net/v/oceans.mp4'} />
      <input type="number" placeholder="please enter number." />
      <label>
        <input type="radio" />
        Radio
      </label>
      <label>
        <input type="file" />
      </label>
      <label>
        <input type="checkbox" />
        Checkbox
      </label>
      <textarea placeholder="please enter number." maxLength={100} />

      <div ref={refDiv1} className="div1 main" tips="tips" tabIndex={0}>
        Shadow DOM
      </div>
    </Wrap>
  )
}

export default ShadowDom
