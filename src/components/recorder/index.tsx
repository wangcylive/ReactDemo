import React, {useEffect, useMemo, useRef, useState} from 'react'
import Recorder from 'js-audio-recorder'
import styled from 'styled-components'
import {ReactComponent as MicSvg} from './mic.svg'

const HandlerGroup = styled.div`
  margin: 10px 0;
  display: flex;
  flex-wrap: wrap;

  button {
    margin: 0 8px 8px 0;
  }
`

const InfoGroup = styled.div`
  height: 20px;
  line-height: 20px;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;

  > label:not(:first-child) {
    margin-left: 15px;
  }

  span {
    width: 60px;
  }

  .mic {
    position: relative;
    width: 20px;
    height: 29px;
  }
`
// rgb(143,149,183)
// rgb(105,132,255)

const DivDraw = styled.div`
  position: relative;
  margin: 10px 0;
  width: 300px;
  height: 150px;
  background-color: #eee;
  &::before,
  &::after {
    content: '';
    position: absolute;
    border: 0 dashed #52c41a;
  }

  &::before {
    left: 0;
    top: 50%;
    width: 100%;
    height: 0;
    border-top-width: 1px;
  }

  &::after {
    left: 50%;
    top: 0;
    height: 100%;
    width: 0;
    border-left-width: 1px;
  }

  canvas {
    display: block;
    width: 100%;
    height: 100%;
  }
`

const fillRoundedRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) => {
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.arcTo(x + width, y, x + width, y + height, radius)
  ctx.arcTo(x + width, y + height, x, y + height, radius)
  ctx.arcTo(x, y + height, x, y, radius)
  ctx.arcTo(x, y, x + width, y, radius)
  ctx.closePath()
  ctx.fill()
}

const dpr = window.devicePixelRatio || 1

const RecorderPage: React.FC = () => {
  const refRecorder = useRef<Recorder>(null)
  const [isRecording, setRecording] = useState<boolean>(false)
  const [info, setInfo] = useState<{duration: number; fileSize: number; vol: number}>({
    duration: 0,
    fileSize: 0,
    vol: 0,
  })
  const refCanvas1 = useRef<HTMLCanvasElement>(null)
  const refCanvas2 = useRef<HTMLCanvasElement>(null)
  const refCanvas3 = useRef<HTMLCanvasElement>(null)
  const refCanvas4 = useRef<HTMLCanvasElement>(null)

  const fillColor = useMemo<string>(() => {
    // rgb(143,149,183)
    // rgb(105,132,255)

    let r = 143
    let rv = 143 - 105
    let g = 149
    let gv = r - 132
    let b = 183
    const bv = b - 255

    const s = info.vol / 100

    r = r - Math.floor(rv * s)
    g = g - Math.floor(gv * s)
    b = b - Math.floor(bv * s)

    return `rgb(${r}, ${g}, ${b})`
  }, [info.vol])

  useEffect(() => {
    const recorder = (refRecorder.current = new Recorder({
      sampleBits: 16, // 采样位数，支持 8 或 16，默认是16
      sampleRate: 16000, // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
      numChannels: 1, // 声道，支持 1 或 2， 默认是1
    }))

    recorder.onprogress = params => {
      setInfo(params)
      // console.log('onprogress', params)
    }

    return () => {
      recorder.destroy()
    }
  }, [])

  useEffect(() => {
    let id1 = -1
    let id2 = -1
    let id3 = -1
    let id4 = -1
    if (isRecording) {
      const canvas1 = refCanvas1.current
      const canvas2 = refCanvas2.current
      const canvas3 = refCanvas3.current
      const canvas4 = refCanvas4.current
      const width = canvas1.width
      const height = canvas1.height
      const ctx1 = canvas1.getContext('2d')
      const ctx2 = canvas2.getContext('2d')
      const ctx3 = canvas3.getContext('2d')
      const ctx4 = canvas4.getContext('2d')

      const renderFrame1 = () => {
        const ctx = ctx1
        id1 = requestAnimationFrame(renderFrame1)

        const buffer: Uint8Array = refRecorder.current.getRecordAnalyseData()

        ctx.clearRect(0, 0, width, height)

        ctx.lineWidth = 2
        ctx.strokeStyle = '#000'

        ctx.beginPath()

        const sliceWidth = width / buffer.length
        let x = 0
        for (let i = 0; i < buffer.length; i++) {
          const v = buffer[i] / 128
          const y = (v * height) / 2
          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
          x += sliceWidth
        }
        ctx.lineTo(width, height / 2)
        ctx.stroke()
      }

      renderFrame1()

      const renderFrame2 = () => {
        const ctx = ctx2
        id2 = requestAnimationFrame(renderFrame2)
        const buffer: Uint8Array = refRecorder.current.getRecordAnalyseData()
        const bufferLengthAlt = buffer.length

        ctx.fillStyle = '#fff'
        ctx.fillRect(0, 0, width, height)

        const barCount = 20
        const barWrap = Math.floor(width / barCount)
        const barMargin = 4
        const barWidth = barWrap - barMargin
        let barHeight
        let x = 0

        for (let i = 0; i < bufferLengthAlt; i += barWrap) {
          const v = buffer[i] / 256
          barHeight = Math.floor(v * height)

          ctx.fillStyle = '#f00'
          ctx.fillRect(x, 0, barWidth, barHeight)

          x += barWrap
        }
      }

      // renderFrame2()

      const renderFrame3 = () => {
        const ctx = ctx3
        id3 = requestAnimationFrame(renderFrame3)
        const buffer: Uint8Array = refRecorder.current.getRecordAnalyseData()
        const bufferLengthAlt = buffer.length

        ctx.fillStyle = '#fff'
        ctx.fillRect(0, 0, width, height)

        const barCount = 10
        const barWrap = Math.floor(width / barCount)
        const barMargin = 10
        const barWidth = barWrap - barMargin
        let barHeight
        let x = 0

        for (let i = 0; i < bufferLengthAlt; i += barWrap) {
          const v = buffer[i] / 256
          barHeight = Math.floor(v * height)

          ctx.fillStyle = '#f00'
          fillRoundedRect(ctx, x, (height - barHeight) / 2, barWidth, barHeight, 8)
          // ctx.fillRect(x, (height - barHeight) / 2, barWidth, barHeight)

          x += barWrap
        }
      }
      // renderFrame3()

      const renderFrame4 = () => {
        const ctx = ctx4
        id4 = requestAnimationFrame(renderFrame4)
        const buffer: Uint8Array = refRecorder.current.getRecordAnalyseData()
        const bufferLengthAlt = buffer.length

        ctx.fillStyle = '#6984FF'
        ctx.fillRect(0, 0, width, height)

        const barCount = 16
        const barWrap = Math.floor(width / barCount)
        const barMargin = 4
        const barWidth = 4
        let barHeight
        let x = 0

        for (let i = 0; i < bufferLengthAlt; i += barWrap) {
          const chunks = buffer.slice(i, i + barWrap)
          const average = chunks.reduce((sum, value) => sum + value, 0) / barWrap
          let v = average / 128
          v = v * v
          barHeight = Math.floor(v * 30)

          ctx.fillStyle = '#fff'
          fillRoundedRect(ctx, x, (height - barHeight) / 2, barWidth, barHeight, 2)
          x += barWrap
        }
      }

      renderFrame4()
    }

    return () => {
      window.cancelAnimationFrame(id1)
      window.cancelAnimationFrame(id2)
      window.cancelAnimationFrame(id3)
      window.cancelAnimationFrame(id4)
    }
  }, [isRecording])

  const onStart = () => {
    refRecorder.current
      .start()
      .then(res => {
        setRecording(true)
      })
      .catch(e => {
        console.log('start error', e)
      })
  }

  const onStop = () => {
    refRecorder.current.stop()
    setRecording(false)
  }

  const onDestroy = () => {
    refRecorder.current.destroy()
    setRecording(false)
  }

  const canvasProps = {
    width: 300 * dpr,
    height: 150 * dpr,
  }

  return (
    <div>
      <HandlerGroup>
        <button onClick={onStart}>Start</button>
        <button onClick={onStop}>Stop</button>
        <button onClick={onDestroy}>destroy</button>
      </HandlerGroup>

      <InfoGroup>
        <label>duration:</label>
        <span>{Math.floor(info.duration * 10) / 10}s</span>
        <label>vol:</label>
        <div className={'mic'}>
          <svg width="20" height="29" viewBox="0 0 20 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_1_15)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.16667 0.666666C6.68139 0.666666 4.66667 2.68138 4.66667 5.16667V14.8333C4.66667 17.3186 6.68139 19.3333 9.16667 19.3333H10.8333C13.3186 19.3333 15.3333 17.3186 15.3333 14.8333V5.16666C15.3333 2.68138 13.3186 0.666666 10.8333 0.666666H9.16667ZM2.66667 11.3333V14C2.66667 18.0501 5.94991 21.3333 10 21.3333C14.0501 21.3333 17.3333 18.0501 17.3333 14V11.3333H19.3333V14C19.3333 18.8168 15.6844 22.7814 11 23.2804V27.3333H9V23.2804C4.31557 22.7814 0.666666 18.8168 0.666666 14V11.3333H2.66667Z"
                fill={fillColor}
              />
            </g>
            <defs>
              <filter
                id="filter0_d_1_15"
                x="0.666666"
                y="0.666666"
                width="18.6667"
                height="27.6667"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="1" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_15" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_15" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
        <span>{Math.floor(info.vol)}</span> <label>fileSize:</label>
        <span>{Math.floor((info.fileSize * 100) / 1024) / 100}KB</span>
      </InfoGroup>

      <DivDraw>
        <canvas ref={refCanvas1} {...canvasProps} />
      </DivDraw>
      <DivDraw>
        <canvas ref={refCanvas2} {...canvasProps} />
      </DivDraw>
      <DivDraw>
        <canvas ref={refCanvas3} {...canvasProps} />
      </DivDraw>
      <DivDraw>
        <canvas ref={refCanvas4} {...canvasProps} />
      </DivDraw>
    </div>
  )
}

export default RecorderPage
