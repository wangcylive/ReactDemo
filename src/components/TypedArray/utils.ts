export function getBlobType(blob: Blob, type: string) {
  const fileReader = new FileReader()

  switch (type) {
    case 'arrayBuffer':
      fileReader.readAsArrayBuffer(blob)
      break
    case 'DOMString':
      fileReader.readAsText(blob, 'utf-8')
      break
    case 'dataUrl':
      fileReader.readAsDataURL(blob)
      break
    case 'binaryString':
      fileReader.readAsArrayBuffer(blob)
  }

  return new Promise((resolve, reject) => {
    fileReader.onload = event => {
      resolve(event.target.result)
    }
  })
}
