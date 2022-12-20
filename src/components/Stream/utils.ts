// PNG https://www.cnblogs.com/cangqinglang/p/15331630.html

export async function pngIHDR(data: File | Blob | ArrayBuffer | DataView) {
  let af
  let dv: DataView

  if (data instanceof Blob) {
    af = await data.arrayBuffer()
    dv = new DataView(af)
  } else if (data instanceof ArrayBuffer) {
    af = data
    dv = new DataView(af)
  } else {
    dv = new DataView(data.buffer)
  }

  const a1 = Array.from({length: 8}).map((_, index) => dv.getUint8(index))
  if (a1.join(' ') !== '137 80 78 71 13 10 26 10') {
    console.log('Not Png')
    return null
  }
  // const head = String.fromCharCode.apply(null, a1)
  // const a2 = Array.from({length: 4}).map((_, index) => dv.getUint8(index + 8))
  // const a3 = Array.from({length: 4}).map((_, index) => dv.getUint8(index + 12))
  // const name = String.fromCharCode.apply(null, a3)

  const width = dv.getUint32(16)
  const height = dv.getUint32(20)
  const bitDepth = dv.getUint8(24)
  const colorType = dv.getUint8(25)
  const compression = dv.getUint8(26)
  const filter = dv.getUint8(27)
  const interlace = dv.getUint8(28)
  const info = {
    width,
    height,
    bitDepth,
    colorType,
    compression,
    filter,
    interlace,
  }
  return info
}
