import React, {useEffect, useRef} from 'react'
import './index.scss'
import {copyText} from './utils'
import google1 from './img/google1.png'
import google2 from './img/google2.png'
import wowJpeg from './img/wow.jpeg'
import zip1 from './img/wow.jpeg.zip'

let blob1, blob2, blob3

async function init() {
  const res1 = await fetch(google1)
  blob1 = await res1.blob()
  const res2 = await fetch(google2)
  blob2 = await res2.blob()
  const res3 = await fetch(wowJpeg)
  blob3 = await res3.blob()

  const zipBlob1 = (await fetch(zip1)).blob()
  console.log(zipBlob1)
}

init()

const Copy = () => {
  const refInput = useRef(null)
  const onCopyInput = () => {
    refInput.current.value = new Date().toLocaleTimeString()
    copyText(refInput.current)
  }
  const onClick = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(new Date().toLocaleTimeString())
        .then(res => {
          console.log('clipboard.writeText copy success', res)
        })
        .catch(err => {
          console.log('clipboard.writeText copy fail', err)
        })
    } else {
      console.log('not navigator.clipboard')
    }
  }
  const onClipboardWrite = async () => {
    if (navigator.clipboard) {
      const getBlob = async url => {
        const res2 = await fetch(url)
        blob2 = await res2.blob()
        return blob2
      }

      /**
       * 只支持复制 image/png、text/plain两种格式
       * 只能使用一个 clipboard 实例
       * safari 不能等待文件读取完成再调用 write
       */
      const item1 = new ClipboardItem({
        ['image/png']: getBlob(google2),
        // ['application/zip']: getBlob(zip1),
        ['text/plain']: new Blob([new Date().toLocaleString()], {type: 'text/plain'}),
      })
      console.log('item', item1)
      navigator.clipboard
        .write([item1])
        .then(e => {
          console.log('write success', e)
        })
        .catch(e => {
          console.log('write fail', e)
        })
    } else {
      console.log('not navigator.clipboard')
    }
  }
  const onClipboardRead = () => {
    if (navigator.clipboard) {
      navigator.clipboard.read().then(async res => {
        for (const clipboardItem of res) {
          console.log('clipboardItem', clipboardItem)
          for (const type of clipboardItem.types) {
            const blob = await clipboardItem.getType(type)
            if (type.startsWith('text/')) {
              blob.text().then(res => {
                console.log('blob text', res)
              })
            }
            console.log(blob)
          }
        }
        console.log('res', res)
      })
    }
  }
  const onPaste = () => {
    const result = document.execCommand('paste')
    console.log('paste', result)
  }

  useEffect(() => {
    const body = document.body
    const beforeCopy = event => {
      console.log(event.type)
    }
    body.addEventListener('beforecopy', beforeCopy, false)
    const copy = event => {
      // event.preventDefault()
      const clipData = event.clipboardData
      const text = window.getSelection().toString()
      // clipData.setData('text/plain', Date.now() + '')
      console.log(event, text)
    }
    body.addEventListener('copy', copy, false)
    const beforePaste = event => {
      console.log(event.type)
    }
    body.addEventListener('beforepaste', beforePaste, false)
    const paste = event => {
      // event.preventDefault()
      const clipData = event.clipboardData
      const html = clipData.getData('text/html')
      const text = clipData.getData('text/plain')
      // clipData.setData('text/plain', 'ww' + Date.now())
      for (let item of clipData.items) {
        console.log(item.type, item.kind)
        if (item.kind === 'string') {
          item.getAsString(str => {
            console.log(str)
          })
        } else if (item.kind === 'file') {
          const file = item.getAsFile()
          const url = URL.createObjectURL(file)
          const img = new Image()
          img.src = url
          document.body.appendChild(img)
          console.log(file)
        }
      }
      console.log(clipData.items.length, text, html)
    }
    body.addEventListener('paste', paste, false)

    // clipboard-read, clipboard-write
    navigator.permissions?.query({name: 'clipboard-read'}).then(res => {
      console.log('clipboard-read', res)
    })

    navigator.permissions?.query({name: 'clipboard-write'}).then(res => {
      console.log('clipboard-write', res)
    })

    // setTimeout(() => {
    //   onClipboardRead()
    // }, 1000)

    return () => {
      body.removeEventListener('beforecopy', beforeCopy, false)
      body.removeEventListener('copy', copy, false)
      body.removeEventListener('beforepaste', beforePaste, false)
      body.removeEventListener('paste', paste, false)
    }
  }, [])

  return (
    <div className="page-copy">
      <input type="text" defaultValue={'wewe'} ref={refInput} />
      <button onClick={onCopyInput}>Copy Input</button>
      <button onClick={onClipboardWrite}>Clipboard Write</button>
      <button onClick={onClipboardRead}>Clipboard Read</button>
      <button onClick={onClick}>Copy</button>
      <button onClick={onPaste}>Paste</button>
      <div>
        <textarea className="textarea" />
      </div>
    </div>
  )
}

export default Copy
