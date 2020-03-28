import React, { useEffect } from 'react'
import './index.scss'

function copyBody () {
  return new Promise((resolve, reject) => {
    const elem = document.body
    try {
      if (elem.nodeName === 'INPUT') {
        elem.select()

        const result = document.execCommand('copy')

        if (result) {
          resolve()
        } else {
          reject()
        }
      } else {
        elem.contentEditable = true
        const range = document.createRange()
        range.selectNodeContents(elem)
        const sel = window.getSelection()
        sel.removeAllRanges()
        sel.addRange(range)
        elem.contentEditable = false

        const result = document.execCommand('copy')

        document.activeElement.blur()

        if (result) {
          sel.removeAllRanges()
          resolve()
        } else {
          reject()
        }
      }
    } catch (e) {
      reject()
    }
  })
}


const Copy = () => {
  const onClick = () => {
    copyBody()
    const result = document.execCommand('copy')
    console.log('copy', result)
  }

  useEffect(() => {
    document.body.addEventListener('beforecopy', (e) => {
      // const data = e.clipboardData
      // const text = data.getDate('text/plain')
      console.log(e.type)
    })
    document.body.addEventListener('copy', (e) => {
      e.preventDefault()
      const clipData = e.clipboardData
      const text = window.getSelection().toString()
      clipData.setData('text/plain', Date.now() + '')
      console.log(e, text)
    })
  }, [])

  return <div className="page-copy">
    <div>111</div>
    <button onClick={onClick}>Copy</button>

    <div>
      <textarea className="textarea"/>
    </div>
  </div>
}

export default Copy