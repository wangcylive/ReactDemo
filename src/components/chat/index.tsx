import React, {KeyboardEventHandler, useEffect, useRef, useState} from 'react'
import {flushSync} from 'react-dom'
import styled, {createGlobalStyle} from 'styled-components'
import './layout.scss'
import getUuid from '@/utils/get-uuid'
import ChatContent from '@/components/chat/chat-content'
import * as mediaRecorder from '@/components/chat/media'
import classNames from 'classnames'

const GlobalStyles = createGlobalStyle`
  html {
    overscroll-behavior: none;
    -webkit-tap-highlight-color: transparent;
    overflow: hidden;
  }
  body {
    margin: 0;
    overflow: hidden;
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
  const [clientHeight, setClientHeight] = useState<number>(window.innerHeight)
  const [recording, setRecording] = useState<boolean>(false)
  const [supportEnterKeyHint] = useState<boolean>(() => {
    const el = document.createElement('input')
    return 'enterKeyHint' in el
  })
  const [isSelectionEnd, setSelectionEnd] = useState<boolean>(true)
  const refMainEl = useRef<HTMLDivElement>(null)
  const [text, setText] = useState<string>('')
  const [chats, setChats] = useState<Message[]>([])

  const [isFocus, setFocus] = useState<boolean>(false)
  const [visibleRecord, setVisibleRecord] = useState<boolean>(false)
  const [isCancelActive, setCancelActive] = useState<boolean>(false)
  const refCancelBtnEl = useRef<HTMLButtonElement>(null)
  const refCancelBtnRect = useRef<DOMRect | null>(null)

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

  const onFocus = () => {
    setFocus(true)
    setClientHeight(window.innerHeight)

    setTimeout(() => {
      setClientHeight(window.innerHeight)
    }, 500)
  }

  const onBlur = () => {
    setFocus(false)
    setClientHeight(window.innerHeight)

    setTimeout(() => {
      setClientHeight(window.innerHeight)
    }, 500)
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

    window.addEventListener(
      'resize',
      () => {
        setClientHeight(document.body.clientHeight)
      },
      false,
    )

    const onEndRecording = (event: TouchEvent) => {
      setVisibleRecord(false)
    }

    window.addEventListener('touchend', onEndRecording, false)

    window.addEventListener('touchcancel', onEndRecording, false)

    window.addEventListener(
      'touchmove',
      event => {
        const touch = event.touches[0]
        if (touch && refCancelBtnRect.current) {
          const {pageX, pageY} = touch
          const {left, top, width, height} = refCancelBtnRect.current
          if (pageX > left && pageX < left + width && pageY > top && pageY < top + height) {
            setCancelActive(true)
          } else {
            setCancelActive(false)
          }
        }
      },
      false,
    )

    document.addEventListener('selectionchange', selectionChange, false)

    return () => {
      document.removeEventListener('selectionchange', selectionChange, false)
    }
  }, [])

  useEffect(() => {
    if (visibleRecord) {
      const el = refCancelBtnEl.current
      if (el) {
        refCancelBtnRect.current = el.getBoundingClientRect()
      }
    }
  }, [visibleRecord])

  return (
    <div className={'chat-page'} style={{'--full-height': clientHeight + 'px'}}>
      <div className="chat-page-header">Chat {isSelectionEnd + ''}</div>
      <div className="chat-page-main">
        <div ref={refMainEl} className="scroll">
          {chats.map((chat, index) => (
            <ChatContent key={chat.id} message={chat} />
          ))}
        </div>
      </div>
      <div className={classNames('chat-page-footer', isFocus && 'isFocus')}>
        <span>{clientHeight}</span>
        {/*<div className={'chat-input-content'} contentEditable={true} placeholder={'发送消息'}></div>*/}
        {/*<button className={'btn-audio'} onClick={onSendAudio}>*/}
        {/*  {recording ? '...' : 'Audio'}*/}
        {/*</button>*/}
        {/*<button className={'btn-audio'} onClick={onStopAudio}>*/}
        {/*  Complete*/}
        {/*</button>*/}
        {/*<button onClick={() => mediaRecorder.pause()}>pause</button>*/}
        {/*<button onClick={() => mediaRecorder.resume()}>resume</button>*/}
        {/*<button onClick={() => mediaRecorder.requestData()}>requestData</button>*/}
        <button onTouchStart={() => setVisibleRecord(true)}>录音</button>
        <div className="chat-input-wrap" data-text={text}>
          <textarea
            value={text}
            inputMode={'text'}
            enterKeyHint={isSelectionEnd ? 'send' : ''}
            onKeyDown={onKeyDown}
            onChange={onChangeText}
            onFocus={onFocus}
            onBlur={onBlur}
            className={'chat-input'}
            placeholder={'发送消息'}
            maxLength={1000}
          />
        </div>
        <button className={'btn-send'} onClick={onSendText}>
          Send
        </button>
      </div>
      {visibleRecord && (
        <div className={'recording-dialog'}>
          <button ref={refCancelBtnEl} className={classNames('btn-cancel', isCancelActive && 'btn-cancel-active')}>
            x
          </button>
          <p className={'remind'}>开始录音</p>
        </div>
      )}

      <GlobalStyles />
    </div>
  )
}

export default Chat
