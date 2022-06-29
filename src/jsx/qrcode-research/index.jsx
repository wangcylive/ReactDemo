import React, { useEffect, useRef } from 'react'
import jsQR from 'jsqr'
import qrcode1 from './1.png' // 可识别
import qrcode2 from './2.png' // 识别不了
import qrcode3 from './3.png' // 可识别
import qrcode4 from './4.png' // 识别不了
import qrcode5 from './5.png' // 可识别，只能识别一个
import qrcode6 from './6.png'

function canvasImageData (imageData) {
  const pxData = imageData.data
  for (let i = 0, len = pxData.length; i < len; i += 4) {
    // 不是白色，统一同修改为黑色
    if (pxData[i] !== 255 && pxData[i + 1] !== 255 && pxData[i + 2] !== 255) {
      pxData[ i ] = 0
      pxData[ i + 1 ] = 0
      pxData[ i + 2 ] = 0
    }
  }
  return imageData
}

const QrcodeReserch = (props) => {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    const img = new Image()
    img.onload = () => {
      const width = img.naturalWidth
      const height = img.naturalHeight
      canvas.width = width
      canvas.height = height

      context.drawImage(img, 0, 0, width, height)

      ref.current.appendChild(canvas)

      const imgData = context.getImageData(0, 0, width, height)
      console.log(imgData, width, height)

      // const invertImgData = canvasImageData(imgData)
      //
      // console.log(invertImgData)
      //
      // context.putImageData(invertImgData, 0, 0)

      const code = jsQR(imgData.data, imgData.width, imgData.height, {
        inversionAttempts: 'attemptBoth'
      })
      console.log('research', code)
    }
    img.src = qrcode6

  }, [])
  return (
    <div>
      <div ref={ref}/>
    </div>
  )
}

export default QrcodeReserch
