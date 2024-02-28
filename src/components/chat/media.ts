import convertBlobToWav from '@/components/chat/convertBlobToWav'
import decode, {decoders} from 'audio-decode'
// import buffer from 'audio-lena/mp3'

let mediaStream: MediaStream
let mediaRecorder: MediaRecorder
let maxDurationTimeoutID = -1

function createMediaBlob() {
  return new Promise<Blob | void>(resolve => {
    mediaRecorder = new MediaRecorder(mediaStream)

    console.log(mediaRecorder.mimeType)

    mediaRecorder.start()

    let blob: Blob
    mediaRecorder.ondataavailable = event => {
      blob = event.data
    }

    mediaRecorder.onstop = async () => {
      // audio/wav、audio/mp3、audio/mpeg
      // await decoders.mp3()
      // const af = await new Blob(chunks).arrayBuffer()
      // const audioBuffer = await decoders.mp3(af)
      // const mp3Blob = new Blob([audioBuffer], {type: 'audio/mp3'})

      // resolve(mp3Blob)

      console.log(blob)

      resolve(blob)
    }

    mediaRecorder.onerror = () => {
      resolve()
    }
  })
}

export interface StartRecorderParams {
  statusChange?(recording: boolean): void
  complete?(data: {duration: number; blob: Blob}): void
  fail?(error: any): void
  maxDuration?: number
  blobType?: string
}

let startTime = 0

navigator.mediaDevices.addEventListener('devicechange', event => {
  console.log('devicechange', event)
})

export function startRecorder(params: StartRecorderParams) {
  const {statusChange, complete, fail, maxDuration = 2 * 60 * 1e3, blobType = 'audio/wav'} = params
  navigator.mediaDevices
    .getUserMedia({
      audio: true,
    })
    .then(ms => {
      mediaStream = ms

      mediaRecorder = new MediaRecorder(mediaStream, {
        // audioBitsPerSecond: 8000 * 16,
        // audioBitsPerSecond: 8000 * 8,
        audioBitsPerSecond: 44000 * 16,
      })

      mediaRecorder.start()
      statusChange?.(true)

      const chunks: Blob[] = []
      mediaRecorder.ondataavailable = event => {
        if (event.data.size) {
          chunks.push(event.data)
        }
        console.log('ondataavailable', event.data)
      }

      mediaRecorder.onstart = event => {
        console.log('onstart', event, mediaRecorder)
        startTime = Date.now()

        maxDurationTimeoutID = window.setTimeout(() => {
          stopRecorder()
        }, maxDuration)
      }

      mediaRecorder.onpause = event => {
        console.log('onpause', event)
      }

      mediaRecorder.onresume = event => {
        console.log('onresume', event)
      }

      mediaRecorder.onstop = event => {
        const blob = new Blob(chunks, {type: chunks[0].type})
        const duration = Date.now() - startTime
        console.log('onstop', event, chunks, blob)
        console.log(
          'blobSize',
          'audioBitsPerSecond',
          mediaRecorder.audioBitsPerSecond,
          'duration',
          duration / 1e3,
          Math.floor((mediaRecorder.audioBitsPerSecond * duration) / 1e3),
          blob.size,
        )
        statusChange?.(false)
        complete?.({
          duration: duration,
          blob,
        })
      }

      mediaRecorder.onerror = e => {
        console.log('mediaRecorder', 'error', e)
        statusChange?.(false)
        fail(e)
      }
    })
    .catch((e: DOMException) => {
      console.log('getUserMedia', 'error', e)
      fail(e)
    })
}

export function pause() {
  mediaRecorder.pause()
}

export function resume() {
  mediaRecorder.resume()
}

export function requestData() {
  mediaRecorder.requestData()
}

export function stopRecorder() {
  mediaRecorder?.stop()
  mediaStream?.getTracks().forEach(track => {
    track.stop()
  })

  window.clearTimeout(maxDurationTimeoutID)
}
