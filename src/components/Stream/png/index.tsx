import React, {useRef} from 'react'
import {PNGTransformStream} from './png-transform-stream'
import {pngIHDR} from '../utils'

class LogStreamSink {
  /**
   * @param {string} name
   */
  constructor(name) {
    this.name = name
    this.counter = 0
  }

  /**
   * Called when a chunk is written to the log.
   */
  write(chunk) {
    this.counter += 1
    console.log('Chunk %d of %s: %o', this.counter, this.name, chunk)

    this.createRow(this.name, this.counter, chunk.constructor.name)
  }

  /**
   * Called when the stream is closed.
   */
  close() {
    this.createRow(this.name, this.counter, 'Closed')
  }

  /**
   * Creates a row in the table.
   *
   * @param {string} heading
   * @param {string} col1
   * @param {string} col2
   */
  createRow(heading, col1, col2) {
    const tr = document.createElement('tr')
    document.getElementById('demoTbody').appendChild(tr)
    const th = document.createElement('th')
    th.appendChild(document.createTextNode(heading))
    tr.appendChild(th)
    const tdCounter = document.createElement('td')
    tdCounter.appendChild(document.createTextNode(col1))
    tr.appendChild(tdCounter)
    const tdChunk = document.createElement('td')
    tdChunk.appendChild(document.createTextNode(col2))
    tr.appendChild(tdChunk)
  }
}

function logReadableStream(name, rs) {
  const [rs1, rs2] = rs.tee()

  rs2.pipeTo(new WritableStream(new LogStreamSink(name))).catch(console.error)

  return rs1
}

const url1 = 'https://unpkg.yy.com/friendupload/1671073/gbcard4apng.png'
const url2 = 'https://mdn.github.io/dom-examples/streams/png-transform-stream/png-logo.png'

const PngDemo: React.FC = () => {
  const onClick = () => {
    // Fetch the original image
    fetch(url1)
      // Retrieve its body as ReadableStream
      .then(response => response.body)
      // Log each fetched Uint8Array chunk
      .then(rs => logReadableStream('Fetch Response Stream', rs))
      // Transform to a PNG chunk stream
      .then(rs => rs.pipeThrough(new PNGTransformStream()))
      // Log each transformed PNG chunk
      .then(rs => {
        console.log('wcy', rs)
        logReadableStream('PNG Chunk Stream', rs)
      })
  }

  const onClickStreamPng = () => {
    const start = performance.now()
    fetch(url2)
      .then(res => {
        const [stream1, stream2] = res.body.tee()

        const reader = stream2.getReader()

        const stream = new ReadableStream({
          start(controller) {
            reader.read().then(async function progress({done, value}) {
              if (done) {
                controller.close()
                return
              }
              const info = await pngIHDR(value)
              if (info) {
                const time = Math.floor(performance.now() - start)
                console.log('stream img', info, 'time=', time)
                controller.close()
                controller.error('done size')
                return
              }
              console.log(value)
              controller.enqueue(value)

              reader.read().then(progress)
            })
          },
          cancel(reason) {
            console.log('cancel', reason)
          },
        })

        console.log('stream', stream)

        return new Response(stream1)
      })
      .then(async res => {
        const blob = await res.blob()
        console.log('fetch done', blob)
      })
  }
  const onClickLoadPng = () => {
    const start = performance.now()
    const img = new Image()
    img.onload = function () {
      const width = img.naturalWidth
      const height = img.naturalHeight
      const time = Math.floor(performance.now() - start)
      console.log('load img', 'width=', width, 'height=', height, 'time=', time)
    }
    img.src = url2

    let a1 = -1
    function a() {
      a1 = window.requestAnimationFrame(function () {
        const width = img.naturalWidth
        const height = img.naturalHeight
        if (img.naturalWidth !== 0) {
          const time = Math.floor(performance.now() - start)
          console.log('requestAnimationFrame img', 'width=', width, 'height=', height, 'time=', time)
          window.cancelAnimationFrame(a1)
        } else {
          console.log('width', width)
          a()
        }
      })
    }
    a()
  }

  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0]
    if (file) {
      file.arrayBuffer().then(af => {
        pngIHDR(af).then(res => {
          console.log('png', res)
        })
      })

      const stream = file.stream()
      const reader = stream.getReader()
      const s = new ReadableStream({
        start(controller) {
          const chunks: Uint8Array[] = []
          reader.read().then(function progress({value, done}) {
            if (done) {
              controller.close()

              console.log('done', s.locked, chunks)
              {
                const blob = new Blob(chunks)
                const url = URL.createObjectURL(blob)
                const img = new Image()
                img.src = url
                document.body.appendChild(img)
              }
              const r = new Response(s)
              r.blob().then(res => {
                const url = URL.createObjectURL(res)
                const img = new Image()
                img.src = url
                document.body.appendChild(img)
                console.log('blob', res)
              })
              console.log('r', r)
              return
            }
            console.log('stream chunk', value)
            chunks.push(value)
            controller.enqueue(value)
            reader.read().then(progress)
          })
        },
      })

      console.log('stream', stream, s.locked)
    }
    console.log(file)
  }

  return (
    <div>
      <button onClick={onClick}>fetch png</button>
      <button onClick={onClickStreamPng}>获取文件尺寸流方式</button>
      <button onClick={onClickLoadPng}>获取文件尺寸完全加载</button>
      <input type={'file'} placeholder={'选择图片文件'} onChange={onChangeFile} />
      <table>
        <thead>
          <tr>
            <th>Stream</th>
            <th>Chunk No.</th>
            <th>Sent chunk type</th>
          </tr>
        </thead>
        <tbody id="demoTbody"></tbody>
      </table>
    </div>
  )
}

export default PngDemo
