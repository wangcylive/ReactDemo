import React, {useEffect, useRef} from 'react'
import styled from 'styled-components'
import orientation from '@/components/orientation'

const Wrap = styled.div`
  background-color: #ccc;
  padding: 20px;

  &:fullscreen {
    background-color: #588b1c;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const VideoGroup = styled.div`
  margin: 30px 0;
  position: relative;

  .wrap {
    position: relative;
    padding-top: calc(400 / 960 * 100%);
    background-color: #000;
  }

  .video {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
  }

  .controls {
    margin-top: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &:fullscreen {
    .wrap {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      padding: 0;
    }

    .controls {
      position: absolute;
      padding: 20px;
      box-sizing: border-box;
      left: 0;
      bottom: 0;
      width: 100%;
      z-index: 1;
    }
  }
`

const ScreenOrientation: React.FC = () => {
  const refEl = useRef<HTMLDivElement>(null)
  const refVideoWrap = useRef<HTMLDivElement>(null)
  const refVideo = useRef<HTMLVideoElement>(null)
  const onFullscreen = () => {
    if (refEl.current?.requestFullscreen) {
      refEl.current
        .requestFullscreen()
        .then(res => {})
        .catch(err => {
          console.log(err)
        })
    }
  }

  const onExit = () => {
    console.log(document.fullscreenElement)
    document.exitFullscreen?.()
  }

  const onlock = async () => {
    if (!document.fullscreenElement) {
      await refEl.current.requestFullscreen()
    }

    screen.orientation?.lock('landscape-primary').catch(e => {
      console.log(e)
    })
  }

  const onunlock = () => {
    screen.orientation?.unlock()
  }

  const onPlayVideo = async () => {
    try {
      if (refVideoWrap.current?.requestFullscreen) {
        await refVideoWrap.current.requestFullscreen()
      }
      if (screen.orientation.lock) {
        await screen.orientation.lock('landscape-primary')
      }
    } catch (e) {
      console.log('full & lock', e)
    }

    refVideo.current.play()
  }

  const onPauseVideo = () => {
    refVideo.current.pause()
  }

  const onVideoExitFullscreen = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen()
    }

    screen.orientation?.unlock()
  }

  useEffect(() => {
    const fullscreenchange = (event: Event) => {
      console.log(event, document.fullscreenElement, document.fullscreenEnabled)
    }
    document.addEventListener('fullscreenchange', fullscreenchange)

    const orientationchange = (event: Event) => {
      console.log(event, screen.orientation.angle, screen.orientation.type)
    }

    screen.orientation.addEventListener('change', orientationchange)

    return () => {
      document.removeEventListener('fullscreenchange', fullscreenchange)
      screen.orientation.removeEventListener('change', orientationchange)
    }
  }, [])

  return (
    <div>
      <h3>ScreenOrientation: lock() 方法</h3>
      <p>
        通常方向锁定仅在移动设备上启用，并且当浏览器上下文为全屏时。如果支持锁定，那么它必须适用于下面列出的所有参数值。
      </p>
      <p>
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation/lock" target="_blank">
          mozilla
        </a>
      </p>

      <Wrap ref={refEl}>
        <button onClick={onFullscreen}>fullscreen</button>
        <button onClick={onExit}>exitFullscreen</button>
        <button onClick={onlock}>lock</button>
        <button onClick={onunlock}>unlock</button>
      </Wrap>

      <VideoGroup ref={refVideoWrap}>
        <div className={'wrap'}>
          <video
            className={'video'}
            ref={refVideo}
            src={'https://vjs.zencdn.net/v/oceans.mp4'}
            playsInline={true}
            controls={true}
            muted={true}
            preload="metadata"
            poster={'https://www.apple.com.cn/ipad-pro/images/overview/hero/hero_combo__fcqcc3hbzjyy_small_2x.jpg'}
          />
        </div>
        <div className="controls">
          <button onClick={onPlayVideo}>Play</button>
          <button onClick={onPauseVideo}>Pause</button>
          <button onClick={onVideoExitFullscreen}>ExitFullscreen</button>
        </div>
      </VideoGroup>
    </div>
  )
}

export default ScreenOrientation
