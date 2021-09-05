import React, { useEffect, useRef } from 'react'
import Hls from 'hls.js'

const MediaDemo = () => {
  const refVideo = useRef(null)
  const hlsUrl = 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'

  const testUrl = 'https://bitdash-a.akamaihd.net/content/sintel/hls/audio/stereo/en/128kbit.m3u8'

  useEffect(() => {
    const video = refVideo.current
    if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(hlsUrl)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play()
      })
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = hlsUrl
    }

    return

    const tsArr = []

    for (let i = 0; i < 20; i++) {
      tsArr.push(`https://bitdash-a.akamaihd.net/content/sintel/hls/audio/stereo/en/128kbit/seq-${i}.ts`)
    }

    const mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
    if (window.MediaSource && MediaSource.isTypeSupported(mimeCodec)) {
      const mediaSource = new MediaSource()
      refVideo.current.src = URL.createObjectURL(mediaSource)
      mediaSource.addEventListener('sourceopen', sourceOpen)
    } else {
      refVideo.current.src = hlsUrl
    }

    function sourceOpen (event) {
      console.log('sourceOpen', event)
      const mediaSource = event.target
      const sourceBuffer = mediaSource.addSourceBuffer(mimeCodec)
      fetchSource(tsArr[0], (af) => {
        console.log('af', af)
        sourceBuffer.addEventListener('updateend', () => {
          if (!sourceBuffer.updating && mediaSource.readyState === 'open') {
            mediaSource.endOfStream()
            refVideo.current.play()
          }
        })
        sourceBuffer.appendBuffer(af)
      })
    }

    function fetchSource (url, callback) {
      window.fetch(url).then((response) => {
        if (response.ok) {
          response.arrayBuffer().then((af) => {
            callback(af)
          })
        }
      })
    }
  }, [])

  return <div>
    <video ref={refVideo} width={300} height={200} controls={true}/>
  </div>
}

export default MediaDemo