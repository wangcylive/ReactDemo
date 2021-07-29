import React, {useEffect, useRef, useState} from 'react'
import css from './index.module.scss'

const ContentEditable: React.FC = () => {
  const [text, setText] = useState<string>('')
  const refEditor = useRef<HTMLHeadingElement>(null)
  const refRange = useRef<Range>(null)
  const refBrCount = useRef<number>(0)

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
      const range = selection.getRangeAt(0)
      if (refEditor.current.contains(range.commonAncestorContainer)) {
        refRange.current = selection.getRangeAt(0)
      }
      ;(window as any).refRange = refRange.current
      // console.log('saveRange', refRange.current.startOffset)
    }
  }
  const rangeInsertNode = (node: any, collapse = false) => {
    // const elEditor = refEditor.current
    const sel = getSelection()
    const range = refRange.current
    range.deleteContents()
    // chrome 文字方向 插入 div 兼容，光标定位到 div 里面
    // if (range.endContainer === elEditor && elEditor.firstChild && elEditor.firstChild.nodeName === 'DIV') {
    //   range = document.createRange()
    //   range.selectNodeContents(elEditor.firstChild)
    //   range.collapse(false)
    //   sel.removeAllRanges()
    //   sel.addRange(range)
    // }

    if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
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
    onInput()
  }

  const createElementBr = (name = 'default') => {
    const br = document.createElement('br')
    br.setAttribute(`data-${name}`, refBrCount.current++ + '')
    return br
  }

  const insertNewLine = () => {
    const range = refRange.current
    const {endContainer, endOffset, startOffset, commonAncestorContainer} = range
    // console.log(endContainer, startOffset, endOffset)
    // 文本最后一个字需多增加一个换行符
    if (endContainer.nodeType === Node.TEXT_NODE && endOffset === endContainer.textContent.length) {
      const nextNode = endContainer.nextSibling
      if (!nextNode || (nextNode.nodeType === Node.TEXT_NODE && nextNode.nodeValue === '')) {
        rangeInsertNode(createElementBr('text'))
      }
    }
    if (endContainer.nodeType === Node.ELEMENT_NODE) {
      const childNodes = endContainer.childNodes
      // 内容为空时需多增加一个换行符
      if (endContainer === commonAncestorContainer) {
        if (childNodes.length === 0) {
          rangeInsertNode(createElementBr('first'))
        }
      } else {
        // const currentNode = childNodes[endOffset - 1]
        // console.log('currentNode', currentNode)
        // if (!currentNode || currentNode.nodeName !== 'BR') {
        //   rangeInsertNode(createElementBr('element'))
        // }
      }
    }
    rangeInsertNode(createElementBr())
    // rangeInsertNode(document.createTextNode('\n'))
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const {key, shiftKey, ctrlKey} = event
    if (key === 'Enter') {
      event.preventDefault()

      if (shiftKey || ctrlKey) {
        insertNewLine()
        return
      }
    }
  }
  const onInput = () => {
    let val = ''
    const childNodes = refEditor.current.childNodes
    if (childNodes.length === 1 && childNodes[0].nodeType === Node.ELEMENT_NODE && childNodes[0].nodeName === 'BR') {
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

  const onJoinEmoji = () => {
    rangeInsertNode(document.createTextNode('😄'))
    focusRange()
  }

  const onJoinTime = () => {
    rangeInsertNode(document.createTextNode(new Date().toUTCString()))
    focusRange()
  }
  const onInsertImg = () => {
    const text = '😄明哥A' + Math.floor(Math.random() * 10)
    const width = 80
    const height = 18
    const fontSize = 12
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const context = canvas.getContext('2d')
    context.textBaseline = 'top'
    context.font = `${fontSize}px sans-serif`
    context.fillStyle = '#1c59ca'
    context.textAlign = 'center'
    context.fillText(text, width / 2, (height - fontSize) / 2)
    const url = canvas.toDataURL('image/png')
    const img = new Image()
    img.src = url
    img.alt = text
    img.width = width
    img.height = height
    img.classList.add(css.insertImg)
    rangeInsertNode(img)
  }
  const onInsertSpan = () => {
    const span = document.createElement('span')
    span.textContent = '秀朗' + Math.floor(Math.random() * 10)
    span.classList.add(css.insertSpan)
    rangeInsertNode(span)
  }
  const onNewLine = () => {
    insertNewLine()
    focusRange()
  }
  const onSelectText = () => {
    const range = document.createRange()
    const childNodes = refEditor.current.childNodes
    for (let i = 0; i < childNodes.length; i++) {
      const node = childNodes[i]
      if (node.nodeType === Node.TEXT_NODE && node.textContent !== '') {
        range.setStart(node, 0)
        range.setEnd(node, node.textContent.length)
        break
      }
    }
    refRange.current = range
    focusRange()
  }

  useEffect(() => {
    initRange()
  }, [])

  useEffect(() => {
    console.log('dragActive', dragActive)
  }, [dragActive])

  return (
    <div>
      <div
        className={[css.editor, dragActive && css.editorDrag].join(' ')}
        onKeyDown={onKeyDown}
        onKeyUp={saveRange}
        onPaste={onPaste}
        onMouseUp={saveRange}
        onMouseLeave={saveRange}
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
      <div>
        <button onClick={onJoinEmoji}>JoinEmoji</button>
        <button onClick={onJoinTime}>InsertTime</button>
        <button onClick={onInsertImg}>InsertImg</button>
        <button onClick={onInsertSpan}>InsertSpan</button>
        <button onClick={onNewLine}>NewLine</button>
        <button onClick={onSelectText}>SelectText</button>
      </div>
      <hr />
      <div className={css.preview}>{text}</div>
    </div>
  )
}

export default ContentEditable
