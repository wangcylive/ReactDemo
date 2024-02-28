function audioBufferToWav(buffer: AudioBuffer): ArrayBuffer {
  const numChannels = buffer.numberOfChannels
  const sampleRate = buffer.sampleRate
  const numFrames = buffer.length

  const bytesPerSample = 2
  const blockAlign = numChannels * bytesPerSample
  const byteRate = sampleRate * blockAlign

  const wavBuffer = new ArrayBuffer(44 + numFrames * blockAlign)
  const dataView = new DataView(wavBuffer)

  dataView.setUint32(0, 0x52494646)
  dataView.setUint32(4, 36 + numFrames * blockAlign, true)
  dataView.setUint32(8, 0x57415645)
  dataView.setUint32(12, 0x666d7420)
  dataView.setUint32(16, 16, true)
  dataView.setUint16(20, 1, true)
  dataView.setUint16(22, numChannels, true)
  dataView.setUint32(24, sampleRate, true)
  dataView.setUint32(28, byteRate, true)
  dataView.setUint16(32, blockAlign, true)
  dataView.setUint16(34, 8 * bytesPerSample, true)
  dataView.setUint32(36, 0x64617461)
  dataView.setUint32(40, numFrames * blockAlign, true)

  const channelData = new Array(numChannels)
  for (let i = 0; i < numChannels; i++) {
    channelData[i] = buffer.getChannelData(i)
  }

  let offset = 44
  for (let i = 0; i < numFrames; i++) {
    for (let j = 0; j < numChannels; j++) {
      const sample = Math.max(-1, Math.min(1, channelData[j][i]))
      const int16Value = sample < 0 ? sample * 0x8000 : sample * 0x7fff
      dataView.setInt16(offset, int16Value, true)
      offset += bytesPerSample
    }
  }

  return wavBuffer
}

async function convertBlobToWav(blob: Blob): Promise<Blob> {
  const arrayBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onload = () => resolve(fileReader.result as ArrayBuffer)
    fileReader.onerror = reject
    fileReader.readAsArrayBuffer(blob)
  })

  const audioContext = new AudioContext()
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
  const wavBuffer = audioBufferToWav(audioBuffer)

  return new Blob([wavBuffer], {type: 'audio/wav'})
}

export default convertBlobToWav
