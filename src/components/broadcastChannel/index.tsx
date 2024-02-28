import React, {useEffect, useRef, useState} from 'react'
import styled from 'styled-components'

const Page = styled.div`
  height: 100vh;
  height: 100dvh;
  position: relative;
  user-select: none;
`

const PlaceholderDiv = styled.div`
  position: absolute;
  padding: 20px;
  width: 100vw;
  box-sizing: border-box;
  font-size: 16px;
  color: #999;
  text-align: center;
`

const MoveDiv = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: #344cb7ee;
  z-index: 1;
`

const IframeDiv = styled.iframe`
  position: absolute;
  right: 0;
  top: 0;
  width: 30vw;
  height: 30vw;
  pointer-events: none;
  border: 1px solid hsla(0, 0%, 0%, 0.1);
`

export interface Position {
  x: number
  y: number
}

const BroadcastChannelDemo: React.FC = () => {
  const [position, setPosition] = useState<Position>({x: 0, y: 0})
  const [visibleIframe] = useState<boolean>(() => {
    return window.top === window
  })
  const refIsStart = useRef<boolean>(false)
  const refElStartPosition = useRef<Position>({x: 0, y: 0})
  const refMoveStartPosition = useRef<Position>({x: 0, y: 0})

  const onStart = (event: React.MouseEvent) => {
    refIsStart.current = true
    refElStartPosition.current = position
    const {clientX, clientY} = event
    refMoveStartPosition.current.x = clientX
    refMoveStartPosition.current.y = clientY
  }

  const onEnd = () => {
    refIsStart.current = false
  }

  useEffect(() => {
    const broadcastChannel = new BroadcastChannel('broadcastTest')

    broadcastChannel.addEventListener(
      'message',
      event => {
        const {data, origin, lastEventId, source, ports} = event
        const {type, payload} = data
        if (type === 'changePosition') {
          setPosition(payload)
        }
      },
      false,
    )

    broadcastChannel.addEventListener(
      'messageerror',
      event => {
        console.log(event)
      },
      false,
    )

    const onMove = (event: MouseEvent) => {
      if (!refIsStart.current) {
        return
      }
      const {clientX, clientY} = event
      const changeX = clientX - refMoveStartPosition.current.x
      const changeY = clientY - refMoveStartPosition.current.y

      const x = refElStartPosition.current.x + changeX
      const y = refElStartPosition.current.y + changeY
      setPosition({x, y})
      broadcastChannel.postMessage({
        type: 'changePosition',
        payload: {x, y},
      })
    }

    const onLevel = (event: MouseEvent) => {
      console.log(event.type)
      refIsStart.current = false
    }

    const html = document.documentElement

    html.addEventListener('mousemove', onMove, false)
    html.addEventListener('mouseleave', onLevel, false)

    return () => {
      html.removeEventListener('mousemove', onMove, false)
      html.removeEventListener('mouseleave', onLevel, false)

      broadcastChannel.close()
    }
  }, [])

  return (
    <Page>
      <PlaceholderDiv>BroadcastChannel</PlaceholderDiv>
      <MoveDiv onMouseDown={onStart} onMouseUp={onEnd} style={{left: position.x + 'px', top: position.y + 'px'}} />
      {visibleIframe && <IframeDiv src={location.href} />}
    </Page>
  )
}

export default BroadcastChannelDemo
