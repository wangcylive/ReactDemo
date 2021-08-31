import React, {useEffect, useState} from 'react'

const Orientation: React.FC = () => {
  const [winAngle, setWinAngle] = useState<string>('0')
  const [screenAngle, setScreenAngle] = useState<number>(0)
  const [orientationChangeEvent, setOrientationChangeEvent] = useState<number>(0)
  const [changeEvent, setChangeEvent] = useState<number>(0)
  const [resizeEvent, setResizeEvent] = useState<number>(0)
  useEffect(() => {
    setWinAngle(window.orientation + '')
    setScreenAngle(window.screen?.orientation?.angle)

    window.addEventListener('orientationchange', () => {
      setOrientationChangeEvent(performance.now())
      setWinAngle(window.orientation + '')
      setScreenAngle(window.screen?.orientation?.angle)
    })
    window.addEventListener('resize', () => {
      setResizeEvent(performance.now())
    })
    window.screen?.orientation?.addEventListener('change', event => {
      console.log(event)
      setChangeEvent(performance.now())
    })
  }, [])

  const onLock = async () => {
    try {
      await document.documentElement?.requestFullscreen()
      await window.screen?.orientation?.lock('landscape-primary')
    } catch (e) {
      console.log(e)
    }
  }
  const onUnlock = async () => {
    try {
      document?.exitFullscreen()
      window.screen?.orientation?.unlock()
    } catch (e) {
      console.log(e)
    }

    // document.exitFullscreen()
  }
  return (
    <div>
      <ul>
        <li>
          <label>window.orientation</label> <strong>{winAngle}</strong>
        </li>
        <li>
          <label>window.screen.orientation.angle</label> <strong>{screenAngle}</strong>
        </li>
        <li>
          <label>orientationchange Event</label> <strong>{orientationChangeEvent}</strong>
        </li>
        <li>
          <label>screen orientation change Event</label> <strong>{changeEvent}</strong>
        </li>
        <li>
          <label>resize Event</label> <strong>{resizeEvent}</strong>
        </li>
      </ul>
      <button onClick={onLock}>Lock</button>
      <button onClick={onUnlock}>unlock</button>
    </div>
  )
}

export default Orientation
