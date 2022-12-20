// https://juejin.cn/post/6844904029244358670#heading-8

// TODO
// https://fetch-progress.anthum.com/sw-basic/

import React, {useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import {appendVideo} from './utils'

const Wrap = styled.div`
  padding: 10px;
  .list {
    margin-top: 20px;
  }

  textarea {
    display: inline-block;
    vertical-align: top;
    width: 250px;
    height: 150px;
  }
`

const urlMp4 = 'https://vjs.zencdn.net/v/oceans.mp4'

const FetchDemo: React.FC = () => {
  const [headObj, setHeadObj] = useState<string>('')
  const refAborts = useRef<AbortController[]>([])
  const refSteamAbort = useRef<any>()
  const [progress, setProgress] = useState<number>(0)
  const [text1, setText1] = useState<string>('')
  const [text2, setText2] = useState<string>('')
  useEffect(() => {}, [])

  const generatorAbort = () => {
    const abortController = new AbortController()
    refAborts.current.push(abortController)
    return abortController.signal
  }
  const fetchAbort = () => {
    while (refAborts.current.length) {
      refAborts.current.pop().abort()
    }
  }

  const fetchHead = () => {
    const signal = generatorAbort()
    window
      .fetch(urlMp4, {
        signal,
        method: 'Head',
      })
      .then(res => {
        console.log('fetch res', res)
        const values = res.headers.entries()
        const obj: Record<string, string> = {}
        let next = values.next()
        while (!next.done) {
          const [key, value] = next.value
          obj[key] = value
          next = values.next()
        }

        setHeadObj(JSON.stringify(obj, null, 2))
      })
      .catch(err => {
        console.log('fetch err', err)
      })
  }

  const fetchTimeout = () => {
    // const signal = typeof AbortSignal.timeout === 'function' ? AbortSignal.timeout(1000) : null
    window
      .fetch(urlMp4, {
        // signal,
      })
      .then(res => {
        const reader = res.body.getReader()
        let isAborted = false
        const stream = new ReadableStream({
          start(controller) {
            function push() {
              reader.read().then(readResult => {
                console.log('reader', readResult.done, readResult.value?.byteLength)
                if (readResult.done) {
                  !isAborted && controller.close()
                  return
                }
                controller.enqueue(readResult.value)
                push()
              })
            }
            push()

            setTimeout(() => {
              reader.cancel('超时取消').then(res => {
                console.log('超时取消 res', res)
              })
              controller.error(new Error('超时取消'))
              isAborted = true
            }, 1000)
          },
          cancel(reason) {
            console.log('readableStream cancel', reason)
          },
        })
        return new Response(stream, {headers: res.headers})
      })
      .then(res => {
        res
          .blob()
          .then(res => {
            appendVideo(res)
            console.log('fetch video', res)
          })
          .catch(err => {
            console.log('fetch video error', err)
          })
        console.log('fetchTimeout then')
      })
      .catch(err => {
        if (err.name === 'TimeoutError') {
          console.log('fetchTimeout', err.name, err)
        }
        console.log('error', err)
      })
  }

  const fetchVideo = () => {
    const signal = generatorAbort()
    window
      .fetch(urlMp4, {
        signal,
      })
      .then(res => {
        console.log('locked', res.body.locked)
        res.blob().then(blob => {
          appendVideo(blob)
        })
        console.log('res', res, res.body.locked)
      })
      .catch(err => {
        if (err.name === 'ABORT_ERR') {
          console.log('abort', err)
        }
        console.log('fetch err', err, typeof err)
      })
  }

  const fetchVideoStreamer = () => {
    const signal = generatorAbort()
    window
      .fetch(urlMp4, {
        signal,
      })
      .then(res => {
        const total = Number(res.headers.get('content-length'))
        let current = 0
        const reader = res.body.getReader()
        reader.closed.then(res => {
          console.log('reader closed', res)
        })
        return new ReadableStream({
          start(controller) {
            function push() {
              reader.read().then(({done, value}) => {
                if (done) {
                  console.log('done', done)
                  // reader.releaseLock()
                  // controller.close()
                  return
                }
                current += value.byteLength
                setProgress(current / total)
                controller.enqueue(value)
                // console.log(done, value)
                push()
              })
            }
            push()

            refSteamAbort.current = () => {
              reader.cancel()
              controller.error(new Error('Self abort.'))
            }
          },
          cancel(reason) {
            console.log('cancel', reason)
          },
        })
      })
      .then(stream => {
        return new Response(stream).blob()
      })
      .then(res => {
        appendVideo(res)
      })
  }

  const fetchText = () => {
    const start = performance.now()
    window.fetch('https://unpkg.com/').then(res => {
      if (res.ok) {
        res.text().then(text => {
          const index = text.indexOf('Workflow')
          if (index !== -1) {
            const time = Math.floor(performance.now() - start)
            setText1('time=' + time + ', index=' + index)
            console.log('find Workflow index', index, time)
          }
        })
      }
    })
  }
  const fetchTextStreamer = () => {
    const start = performance.now()
    const signal = generatorAbort()
    window
      .fetch('https://unpkg.com/', {
        signal,
      })
      .then(res => {
        let resultText = ''
        const reader = res.body.getReader()
        const decode = new TextDecoder('utf-8')
        const stream = new ReadableStream({
          start(controller) {
            reader.read().then(function progressValue({done, value}) {
              if (done) {
                controller.close()
                return
              }
              const text = decode.decode(value, {stream: true})
              resultText += text
              const index = resultText.indexOf('Workflow')
              if (index !== -1) {
                const time = Math.floor(performance.now() - start)
                setText2('time=' + time + ', index=' + index)
                console.log('stream find Workflow index', index, time)
                reader.cancel()
                controller.close()
                controller.error()
                return
              }
              // console.log(done, value, text)
              controller.enqueue(value)
              reader.read().then(progressValue)
            })
          },
        })
        // return new Response(returnStream, {headers: res.headers})
        return new Response(stream, {headers: res.headers})
      })
      .then(res => {
        res.text().then(text => {
          console.log('text', text)
        })
      })
  }

  return (
    <Wrap>
      <p>
        Fetch API 提供了一个 JavaScript 接口，用于访问和操纵 HTTP <strong>管道</strong>的一些具体部分，例如请求和响应
      </p>
      <p>不管是请求还是响应都能够包含 body 对象。body 也可以是以下任意类型的实例。</p>
      <pre>{`ArrayBuffer
ArrayBufferView (Uint8Array 等)
Blob/File
string
URLSearchParams
FormData`}</pre>
      <p>AbortController 可终止请求</p>
      <p>Body使用流处理监听下载进度</p>
      <button onClick={fetchAbort}>Fetch Abort</button>
      <div className={'list'}>
        <button onClick={fetchHead}>Fetch Video Head</button>
        <textarea value={headObj} readOnly={true} />
      </div>
      <div className={'list'}>
        <button onClick={fetchVideo}>Fetch Video</button>
        <button onClick={fetchTimeout}>Fetch Video Timeout</button>
      </div>
      <div className={'list'}>
        <button onClick={fetchVideoStreamer}>Fetch Video Streamer</button>
        <progress value={progress} />
        <span>{Math.floor(progress * 1e4) / 1e2}</span>
        <button onClick={() => refSteamAbort.current?.()}>Stream Abort</button>
      </div>
      <div className="list">
        <p>查找 unpkg Workflow 文字，流方式能更快查找到</p>
        <button onClick={fetchText}>Fetch Text</button> <span>{text1}</span>
        <button onClick={fetchTextStreamer}>Fetch Text Streamer</button> <span>{text2}</span>
      </div>
    </Wrap>
  )
}

export default FetchDemo
