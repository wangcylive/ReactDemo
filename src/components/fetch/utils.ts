export function appendVideo(blob: Blob) {
  const url = URL.createObjectURL(blob)
  const video = document.createElement('video')
  video.style.cssText = 'display: block;width: 300px;height: 180px;'
  video.src = url
  video.controls = true
  video.muted = true
  video.autoplay = true
  document.body.appendChild(video)
}
