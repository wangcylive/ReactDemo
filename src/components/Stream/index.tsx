import React, {useRef, useState} from 'react'
import PngDemo from '@/components/Stream/png'

const StreamDemo: React.FC = () => {
  const refRsControllerClose = useRef<any>()
  const refCancelStream = useRef<any>()
  const refCancelReader = useRef<any>()
  const [data, setData] = useState<string[]>([])

  const onStart = () => {
    const rStream = new ReadableStream<string>({
      start(controller) {
        console.log('stream start', controller)
        const interval = setInterval(function () {
          const chunk = (Math.random() + '').replace(/\D/g, '')
          controller.enqueue(chunk)
          console.log('stream controller', controller, chunk)
        }, 1000)

        refRsControllerClose.current = function (close = true) {
          clearInterval(interval)
          close && controller.close()
          controller.error()
        }
      },
      pull(controller) {
        console.log('stream pull', controller)
      },
      cancel(reason) {
        refRsControllerClose.current?.(false)
        console.log('stream cancel callback', reason)
      },
    })

    refCancelStream.current = function () {
      if (rStream.locked) {
        console.log('Stream locked')
        return
      }
      rStream
        .cancel(new Error('Stream Cancel'))
        .then(() => {
          console.log('Stream Cancel Success')
        })
        .catch(err => {
          console.log('Stream Cancel Fail', err)
        })
    }

    const reader = rStream.getReader()
    reader.read().then(function processValue({done, value}) {
      console.log('read', 'done=', done, 'value=', value, 'locked=', rStream.locked)
      if (done) {
        console.log('read done', rStream)
        return
      }
      setData(prevState => {
        return [...prevState, value]
      })
      reader.read().then(processValue)
    })

    refCancelReader.current = function () {
      reader
        .cancel(new Error('Reader Cancel'))
        .then(() => {
          console.log('Reader cancel success')
        })
        .catch(err => {
          console.log('Reader cancel fail.', err)
        })
    }
  }

  const onStopStream = () => {
    refRsControllerClose.current?.()
  }
  const onCancelStream = () => {
    refCancelStream.current?.()
  }
  const onCancelReader = () => {
    refCancelReader.current?.()
  }

  const onStreamPipe = () => {
    fetch('https://unpkg.com/browse/jquery@3.6.2/AUTHORS.txt')
      .then(res => {
        return res.body
      })
      .then(res => res.pipeThrough(new TextDecoderStream()))
      .then(res => {
        const reader = res.getReader()
        const stream = new ReadableStream({
          start(controller) {
            reader.read().then(function progress({value, done}) {
              if (done) {
                controller.close()
                return
              }
              console.log('chunk', value)
              controller.enqueue(value)
              reader.read().then(progress)
            })
          },
        })
        console.log(res)
      })
  }

  return (
    <div>
      <button onClick={onStart}>Start</button>
      <button onClick={onStopStream}>Stop</button>
      <button onClick={onCancelStream}>Stream Cancel</button>
      <button onClick={onCancelReader}>Reader Cancel</button>
      <hr />
      <button onClick={onStreamPipe}>Stream PipeThough TextDecoderStream</button>
      <div>
        <ul>
          {data.map((item, index) => (
            <li key={item + '_' + index}>{item}</li>
          ))}
        </ul>
        <div>All Chunk length: {data.length}</div>
      </div>
      <PngDemo />
    </div>
  )
}

export default StreamDemo
