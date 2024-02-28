import React from 'react'
import './layout.scss'
import getRandomColor from '@/utils/get-random-color'
import AudioPlayer from '@/components/chat/audio-player'

export interface Props {
  message: {
    id: string
    type: string
    content: any
  }
}

const ChatContent = React.memo<Props>(props => {
  const {type, content} = props.message

  let MainContent = null
  if (type === 'text') {
    MainContent = <div className={'chat-content-text'}>{content}</div>
  } else if (type === 'audio') {
    MainContent = <AudioPlayer blob={content} />
  }

  return (
    <div className={'chat-content'}>
      <div className={'chat-content-user'} style={{backgroundColor: getRandomColor()}}></div>
      {MainContent}
    </div>
  )
})

export default ChatContent
