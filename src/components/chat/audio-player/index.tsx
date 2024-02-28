import React, {useEffect, useRef, useState} from 'react'
import styled from 'styled-components'

const Div = styled.div`
  width: 100px;
  height: 40px;
  background-color: #52c41a;
  border-radius: 10px;
  font-size: 13px;
  line-height: 40px;
  text-align: center;
  color: #fff;

  > audio {
    opacity: 0;
    width: 0;
    height: 0;
  }
`

export interface Props {
  blob: Blob
}

const AudioPlayer: React.FC<Props> = props => {
  const [url] = useState<string>(() => URL.createObjectURL(props.blob))
  const [played, setPlayed] = useState<boolean>(false)
  const refAudio = useRef<HTMLAudioElement>(null)

  const onLoad = event => {
    console.log(event.target.duration)
  }

  const onChange = () => {
    const el = refAudio.current
    if (played) {
      el.pause()
    } else {
      el.play()
    }
    setPlayed(val => !val)
  }

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(url)
    }
  }, [])

  return (
    <Div onClick={onChange}>
      <audio
        src={url}
        onPlay={() => setPlayed(true)}
        onPaste={() => setPlayed(false)}
        ref={refAudio}
        preload={'metadata'}
        onLoadedMetadata={onLoad}
        controls={true}></audio>
      {played ? 'Pause' : 'Play'}
    </Div>
  )
}

export default AudioPlayer
