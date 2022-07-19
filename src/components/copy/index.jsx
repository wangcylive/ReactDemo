import React, {useEffect, useRef} from 'react'
import './index.scss'
import {copyText} from './utils'

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
      // console.log(clipData.items.length, text, html)
    }
    body.addEventListener('paste', paste, false)

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
      <button onClick={onClick}>Copy</button>
      <button onClick={onPaste}>Paste</button>
      <div>
        <textarea className="textarea" />
      </div>
    </div>
  )
}

export default Copy
