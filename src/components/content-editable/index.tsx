import React, {useEffect, useRef, useState} from 'react'
import css from './index.module.scss'

const ContentEditable: React.FC = () => {
  const [clickCount, setClickCount] = useState<number>(1)
  const [text, setText] = useState<string>('')
  const refEditor = useRef<HTMLHeadingElement>(null)
  const refRange = useRef<Range>(null)

  const refDrag = useRef<boolean>(false)
  const [dragActive, setDragActive] = useState<boolean>(false)

  const initRange = () => {
    const sel = getSelection()
    const range = document.createRange()
    range.selectNodeContents(refEditor.current)
    range.collapse(false)
    sel.removeAllRanges()
    sel.addRange(range)
    refRange.current = range
    refEditor.current.focus()
  }
  const focusRange = () => {
    const elEditor = refEditor.current
    const sel = getSelection()
    sel.removeAllRanges()
    sel.addRange(refRange.current)
    elEditor.focus()
  }
  const saveRange = () => {
    const selection = getSelection()
    if (selection.getRangeAt && selection.rangeCount) {
      refRange.current = selection.getRangeAt(0)
      console.log('saveRange', refRange.current.startOffset)
    }
  }
  const rangeInsertNode = (node: any, collapse = false) => {
    const elEditor = refEditor.current
    const sel = getSelection()
    let range = refRange.current
    // chrome 文字方向 插入 div 兼容，光标定位到 div 里面
    if (range.endContainer === elEditor && elEditor.firstChild && elEditor.firstChild.nodeName === 'DIV') {
      range = document.createRange()
      range.selectNodeContents(elEditor.firstChild)
      range.collapse(false)
      sel.removeAllRanges()
      sel.addRange(range)
    }
    range.deleteContents()
    if (node.nodeType === 11) {
      const lastNode = node.lastChild
      range.insertNode(node)
      range.setEndAfter(lastNode)
      if (lastNode.scrollIntoView) {
        lastNode.scrollIntoView()
      }
    } else {
      range.insertNode(node)
      range.setEndAfter(node)

      if (node.scrollIntoView) {
        node.scrollIntoView()
      }
    }

    range.collapse(collapse)
    sel.removeAllRanges()
    sel.addRange(range)

    // Firefox resize disable
    document.execCommand('enableObjectResizing', false, 'false')
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const {key, shiftKey, ctrlKey} = event
    if (key === 'Enter') {
      event.preventDefault()

      if (shiftKey || ctrlKey) {
        const range = refRange.current
        const {endContainer, endOffset} = range
        if (endContainer.nodeType === Node.TEXT_NODE && endOffset === endContainer.textContent.length) {
          const nextNode = endContainer.nextSibling
          if (!nextNode || (nextNode.nodeType === 3 && nextNode.nodeValue === '')) {
            rangeInsertNode(document.createElement('br'))
          }
        }
        if (endContainer.nodeType === Node.ELEMENT_NODE) {
          const childNodes = endContainer.childNodes
          const prevNode = childNodes[endOffset - 1]
          if (!prevNode || prevNode.nodeName !== 'BR') {
            rangeInsertNode(document.createElement('br'))
          }
        }
        rangeInsertNode(document.createElement('br'))
        onInput()
        return
      }
    }
  }
  const onInput = () => {
    let val = ''
    const childrenNodes = refEditor.current.childNodes
    if (
      childrenNodes.length === 1 &&
      childrenNodes[0].nodeType === Node.TEXT_NODE &&
      childrenNodes[0].nodeName === 'BR'
    ) {
      val = ''
    } else {
      refEditor.current.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          val += node.textContent
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.nodeName === 'BR') {
            val += '\n'
          }
        }
      })
    }

    setText(val)
  }
  const onPaste = (event: React.ClipboardEvent) => {
    event.preventDefault()
    const clipboardData = event.clipboardData
    const plain = clipboardData.getData('text/plain')
    const uri = clipboardData.getData('text/uri-list')
    const html = clipboardData.getData('text/html')
    console.log({plain, uri, html, file: clipboardData.files[0]})
  }

  const onDragEnter = () => {
    setDragActive(true)
  }
  const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    setDragActive(false)
  }
  const onDragEnd = (event: React.DragEvent) => {
    console.log(event.type)
  }
  const onDrop = (event: React.DragEvent) => {
    event.preventDefault()
    setDragActive(false)
    refDrag.current = false
    const dataTransfer = event.dataTransfer
    const plain = dataTransfer.getData('text/plain')
    const html = dataTransfer.getData('text/html')
    const file = dataTransfer.files[0]
    if (plain) {
      saveRange()
      rangeInsertNode(document.createTextNode(plain))
    }
    console.log('drop', {
      plain,
      html,
      file,
    })
  }

  const onClickCountEvent = () => {
    setClickCount(val => ++val)
    console.log('setText after', clickCount, refEditor.current.textContent)
  }
  useEffect(() => {
    initRange()
  }, [])
  useEffect(() => {
    console.log('text', clickCount)
    console.log('useEffect', refEditor.current.textContent)
  }, [clickCount])

  useEffect(() => {
    console.log('dragActive', dragActive)
  }, [dragActive])

  return (
    <div>
      <h3 ref={refEditor}>{clickCount}</h3>
      <div
        className={[css.editor, dragActive && css.editorDrag].join(' ')}
        onKeyDown={onKeyDown}
        onKeyUp={saveRange}
        onPaste={onPaste}
        onMouseUp={saveRange}
        // onMouseMove={saveRange}
        onInput={onInput}
        contentEditable={true}
        onDragEnter={onDragEnter}
        // onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDragEnd={onDragEnd}
        onDrop={onDrop}
        ref={refEditor}
      />
      <button onClick={onClickCountEvent}>Button</button>
      <hr />
      <div className={css.preview}>{text}</div>
    </div>
  )
}

export default ContentEditable
