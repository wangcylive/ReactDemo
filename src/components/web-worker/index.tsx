import React, {useEffect, useRef} from 'react'

let timeoutID = -1
let workerTimeoutId = -1

let count = 0
const WebWorkerPage: React.FC = () => {
  const refWorker = useRef<Worker>(null)
  const onStartInterval = () => {
    timeoutID = window.setInterval(() => {
      console.log('window count', ++count)
    }, 1000)

    ++workerTimeoutId
    refWorker.current.postMessage({
      type: 'setInterval',
      payload: workerTimeoutId,
    })
  }

  const onStopInterval = () => {
    window.clearInterval(timeoutID)

    refWorker.current.postMessage({
      type: 'clearInterval',
      payload: workerTimeoutId,
    })
  }

  const onDestroyWorker = () => {
    refWorker.current.terminate()

    console.log(refWorker.current)
  }

  const onWorkerFetch = () => {
    refWorker.current.postMessage({
      type: 'fetch',
      payload: 'https://raw.githubusercontent.com/facebook/react/main/README.md',
    })

    refWorker.current.postMessage({
      type: 'fetch',
      payload:
        'https://raw.githubusercontent.com/facebook/react/main/packages/react-devtools-extensions/icons/128-development.png',
    })
  }

  useEffect(() => {
    if (typeof Worker !== undefined) {
      const myWorker = (refWorker.current = new Worker('/worker.js'))
      console.log('myWorker', myWorker)

      myWorker.postMessage('worker start')

      myWorker.addEventListener('message', event => {
        const {type, payload} = event.data
        console.log('windows message', type, payload)
        if (type === 'fetch') {
          // console.log(payload)
        }
      })

      myWorker.onerror = event => {
        console.error('workerError', event)
      }
    }

    return () => {
      refWorker.current?.terminate()
      window.clearInterval(timeoutID)
    }
  }, [])

  return (
    <div>
      <button onClick={onStartInterval}>开始定时器</button>
      <button onClick={onStopInterval}>停止定时器</button>
      <button onClick={onDestroyWorker}>销毁Worker</button>
      <button onClick={onWorkerFetch}>Worker fetch</button>
    </div>
  )
}

export default WebWorkerPage
