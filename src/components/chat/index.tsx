import React, {KeyboardEventHandler, useEffect, useRef, useState} from 'react'
import {flushSync} from 'react-dom'
import styled, {createGlobalStyle} from 'styled-components'
import './layout.scss'
import getUuid from '@/utils/get-uuid'
import ChatContent from '@/components/chat/chat-content'
import * as mediaRecorder from '@/components/chat/media'

const GlobalStyles = createGlobalStyle`
  html {
    overscroll-behavior: none;
    -webkit-tap-highlight-color: transparent;
  }
  body {
    margin: 0;
  }
`

const setViewport = (value: string) => {
  const metaEl = document.querySelector('meta[name="viewport"]')
  if (metaEl) {
    const content = metaEl.getAttribute('content')
    console.log(content)
    const defaultContent =
      'width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=0, viewport-fit=cover'
    metaEl.setAttribute('content', defaultContent + ', interactive-widget=' + value)
  }
}

interface Message {
  id: string
  type: string
  content: any
}

const Chat: React.FC = () => {
  const [recording, setRecording] = useState<boolean>(false)
  const [supportEnterKeyHint] = useState<boolean>(() => {
    const el = document.createElement('input')
    return 'enterKeyHint' in el
  })
  const [isSelectionEnd, setSelectionEnd] = useState<boolean>(true)
  const refMainEl = useRef<HTMLDivElement>(null)
  const [text, setText] = useState<string>('')
  const [chats, setChats] = useState<Message[]>([])

  const pushChat = (type: string, content: any) => {
    setChats(prevState => {
      const id = getUuid()
      return [...prevState, {id, type, content}]
    })
  }

  const onChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {value, selectionEnd} = event.target
    setText(event.target.value)

    setSelectionEnd(selectionEnd >= value.length)
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const {key, altKey, shiftKey, ctrlKey, target} = event
    if (isSelectionEnd && supportEnterKeyHint && key === 'Enter' && !altKey && !shiftKey && !ctrlKey) {
      // target.blur?.()
      event.preventDefault()
      onSendText()
    }
  }
  const onSendText = () => {
    if (!text) {
      return
    }
    flushSync(() => {
      pushChat('text', text)
    })

    const el = refMainEl.current
    const maxScrollTop = el.scrollHeight - el.clientHeight
    refMainEl.current.scrollTo({
      left: 0,
      top: maxScrollTop,
      behavior: 'smooth',
    })

    setText('')
  }

  const onSendAudio = () => {
    mediaRecorder.startRecorder({
      statusChange(recording) {
        setRecording(recording)
      },
      complete(data) {
        pushChat('audio', data.blob)
      },
      fail(error: any) {
        console.log('error', error)
      },
      maxDuration: 10 * 1e3,
    })
  }

  const onStopAudio = () => {
    mediaRecorder.stopRecorder()
  }

  useEffect(() => {
    setViewport('resizes-content')

    const elWrap = document.querySelector('.chat-input-wrap')
    const elInput = elWrap.querySelector('textarea')
    const selectionChange = (event: Event) => {
      const selection = document.getSelection()
      let isEnd = false
      if (elWrap === selection.anchorNode) {
        isEnd = elInput.selectionEnd >= elInput.value.length
      }

      setSelectionEnd(isEnd)
    }

    document.addEventListener('selectionchange', selectionChange, false)

    return () => {
      document.removeEventListener('selectionchange', selectionChange, false)
    }
  }, [])

  return (
    <div className={'chat-page'}>
      <div className="chat-page-header">Chat {isSelectionEnd + ''}</div>
      <div className="chat-page-main">
        <div ref={refMainEl} className="scroll">
          {chats.map((chat, index) => (
            <ChatContent key={chat.id} message={chat} />
          ))}
        </div>
      </div>
      <div className="chat-page-footer">
        {/*<div className={'chat-input-content'} contentEditable={true} placeholder={'发送消息'}></div>*/}
        <button className={'btn-audio'} onClick={onSendAudio}>
          {recording ? '...' : 'Audio'}
        </button>
        <button className={'btn-audio'} onClick={onStopAudio}>
          Complete
        </button>
        <button onClick={() => mediaRecorder.pause()}>pause</button>
        <button onClick={() => mediaRecorder.resume()}>resume</button>
        <button onClick={() => mediaRecorder.requestData()}>requestData</button>
        <div className="chat-input-wrap" data-text={text}>
          <textarea
            value={text}
            inputMode={'text'}
            enterKeyHint={isSelectionEnd ? 'send' : ''}
            onKeyDown={onKeyDown}
            onChange={onChangeText}
            className={'chat-input'}
            placeholder={'发送消息'}
            maxLength={1000}
          />
        </div>
        <button className={'btn-send'} onClick={onSendText}>
          Send
        </button>
      </div>
      <GlobalStyles />
    </div>
  )
}

export default Chat
