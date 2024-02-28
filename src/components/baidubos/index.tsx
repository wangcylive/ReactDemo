import React from 'react'
import {uploadImages} from '@/components/baidubos/bos'

function file2unit8Array(file: File) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onloadend = event => {
      const af = event.target.result as ArrayBuffer
      const uint8Array = new Uint8Array(af)
      resolve(uint8Array)
    }
    fileReader.readAsArrayBuffer(file)
  })
}

const Baidubos: React.FC = () => {
  const onChange = async event => {
    const files = [...event.target.files]

    const uint8ArrayList = []
    for (let i = 0; i < files.length; i++) {
      const uint8Array = await file2unit8Array(files[i])
      uint8ArrayList.push(uint8Array)
    }

    console.log('333', files, uint8ArrayList)
    uploadImages(files).then(res => {
      console.log('uploaded', res)
    })
  }
  return (
    <div>
      <input type={'file'} accept={'image/*'} multiple={true} onChange={onChange} />
    </div>
  )
}

export default Baidubos
