// https://juejin.cn/post/7093908575935807502
// 单位 http://www.wu.ece.ufl.edu/links/dataRate/DataMeasurementChart.html
import React, {useEffect} from 'react'
import styled from 'styled-components'
import {getBlobType} from '@/components/TypedArray/utils'

const PageStyle = styled.div`
  h2 {
    font-size: 1.3em;
    font-weight: 400;
    line-height: 1.5;
  }
  h3 {
    font-size: 1.1em;
    font-weight: 400;
    line-height: 1.5;
  }
  strong {
    font-weight: normal;
    color: #3685ff;
  }
`
const ImgStyle = styled.img`
  margin: 1em 0;
  display: block;
  max-width: 800px;
  height: auto;
  box-shadow: 0 0 3px hsla(0, 0%, 0%, 0.2);
`
const CodeStyle = styled.code`
  display: inline-block;
  background-color: hsla(0, 0%, 0%, 0.06);
  padding: 15px;
  line-height: 1.6;
  white-space: pre-line;
  color: #333;
  border-radius: 4px;
`
const UlStyle = styled.ul`
  padding: 0;
  list-style: inside decimal;
  li {
    margin: 8px 0;
  }
`

const TypedArrayDemo: React.FC = () => {
  useEffect(() => {
    const af = new ArrayBuffer(8)
    const dv = new DataView(af)
    dv.setInt8(0, 1)
    // 0000001
    let val1 = dv.getUint8(0)
    // 000000100000000
    let val2 = dv.getInt16(0)
    console.log(val1, val2)
  }, [])

  useEffect(() => {
    const af = new ArrayBuffer(8)
    const dv = new DataView(af)
    const typedArray8 = new Uint8Array(af)
    const bool1 = dv.buffer === af
    const bool2 = typedArray8.buffer === af
    console.log(af, dv, typedArray8, bool1, bool2)
    const bool3 = af instanceof ArrayBuffer
    const bool4 = dv instanceof DataView
    const bool5 = typedArray8 instanceof Uint8Array
    console.log('type equal', bool3, bool4, bool5)
  }, [])

  useEffect(() => {
    const name = JSON.stringify({
      name: 'text文本😊',
    })

    // utf8中一个英文代表一个字节
    const blob = new Blob([name], {type: 'application/json'})
    const af = new ArrayBuffer(8)
    const blob1 = new Blob([af], {type: 'application/demo'})
    console.log(name, blob, blob1)

    getBlobType(blob, 'arrayBuffer').then(res => console.log('arrayBuffer', res))
    getBlobType(blob, 'DOMString').then(res => console.log('DOMString', res))
    getBlobType(blob, 'dataUrl').then(res => console.log('dataUrl', res))
    getBlobType(blob, 'binaryString').then(res => console.log('binaryString', res))
  }, [])

  const onChangeInputFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0]
    const target = event.target as HTMLInputElement
    if (!file) {
      return
    }
    file.text().then(text => {
      console.log('text', text.length, text)

      // const newBlob = new Blob([text], {type: file.type})
      // const url = URL.createObjectURL(newBlob)
      // const img = new Image()
      // img.src = url
      // target.insertAdjacentElement('afterend', img)
      // console.log('newBlob1', newBlob)
    })

    const readFile = new FileReader()
    readFile.onload = event => {
      const data = event.target.result as string
      const baseContent = atob(data.split(',').pop())
      console.log('readAsDataURL', data.length, data, baseContent)

      if (!/^image\//.test(file.type)) {
        return
      }
      const img1 = new Image()
      img1.src = data
      target.insertAdjacentElement('afterend', img1)

      // Base64解码
      const typedArray = new Uint8Array(baseContent.length)
      for (let i = 0; i < baseContent.length; i++) {
        typedArray[i] = baseContent.charCodeAt(i)
      }
      const newBlob = new Blob([typedArray], {type: file.type})
      const url = URL.createObjectURL(newBlob)
      const img2 = new Image()
      img2.src = url
      target.insertAdjacentElement('afterend', img2)

      console.log('typeArray', typedArray, newBlob, file)
    }
    readFile.readAsDataURL(file)
  }

  return (
    <PageStyle>
      <UlStyle>
        <li>
          Bit 单个二进制数字（1 或 0）<i>位/比特</i>
        </li>
        <li>
          1Byte = 8 bits <i>字节</i>
        </li>
        <li>1KB(Kilobyte) = 1024 Bytes</li>
        <li>1MB(Megabyte) = 1024 Kilobytes</li>
        <li>1GB(Gigabyte) = 1024 Megabytes</li>
        <li>1TB(Terabyte) = 1024 Gigabytes</li>
        <li>1PB(Petabyte) = 1024 Terabytes</li>
        <li>1EB(Exabyte) = 1024 Petabytes</li>
      </UlStyle>
      <ImgStyle src={require('./img_2.png').default} />
      <h2>ArrayBuffer 对象用来表示通用的、固定长度的原始二进制数据缓冲区。</h2>
      <p>能读不能写，写需要使用 TypedArray 或 DataView</p>
      <CodeStyle>new ArrayBuffer(length)</CodeStyle>
      <p>
        <CodeStyle>ArrayBuffer.isView(arg)</CodeStyle> 如果 arg 是 ArrayBuffer 视图之一，则返回
        true，例如类型化数组对象或者DataView。否则返回 false。
      </p>
      <CodeStyle>
        {`blob.arrayBuffer(): Promise<ArrayBuffer>;
          typedArray.buffer
          dataView.buffer
        `}
      </CodeStyle>
      <h2>
        TypedArray 类型化数组 对象描述了一个底层的二进制数据缓冲区（binary data buffer）的一个类数组视图（view）。
      </h2>
      <CodeStyle>
        {`new TypedArray()
          new TypedArray(length)
          new TypedArray(typedArray)
          new TypedArray(object)
          new TypedArray(buffer, byteOffset, length)
          `}
      </CodeStyle>
      <p>可以通过 TypedArray 来操作 ArrayBuffer 的实例</p>
      <p>
        Uint8Array
        意味无符号整形数组，故而在二进制中每个元素最大为8个1，最小为8个0。自然转化为10进制后每个元素范围为0～255。
      </p>
      <p>同理 Int8Array 表示有符号的整形数组，每个位首代表正负符号。故而 Int8Array 每个元素大小范围为-128～127。</p>
      <p>
        Uint16Array 代表16位无符号整数，Uint16Array 中每个元素存储16位（2个字节）。 自然，我们输出它的长度位
        4。Int16Array 同样每个元素存储为有符号 16 位整数，每个元素位首位置表示正负数。
        换算为10进制，Uint16Array中每个元素大小范围为 0 ～ 2^16 也就是 0 ～ 65536 。
      </p>
      <CodeStyle>
        {`const af = new ArrayBuffer(8)
        const dv = new DataView(af)
        dv.setInt8(0, 1)
        // 0000001 = 1
        let val1 = dv.getUint8(0)
        // 000000100000000 = 256
        let val2 = dv.getInt16(0)
        `}
      </CodeStyle>
      <code>
        <p>255 = 11111111</p>
        <p>-128 = -1000000</p>
        <p>127 = +1111111</p>
      </code>
      <h2>
        DataView 视图是一个可以从 二进制ArrayBuffer
        对象中读写多种数值类型的底层接口，使用它时，不用考虑不同平台的字节序问题。
      </h2>
      <CodeStyle>{`new DataView(buffer [, byteOffset [, byteLength]])`}</CodeStyle>
      <ImgStyle src={require('./img_1.png').default} alt="" />
      <h3>
        本质上，ArrayBuffer 字节数组就是一段固定长度大小的二进制数据缓冲区。它并不能直接操作，我们需要通过 TypedArray 和
        DataView 来进行对于 ArrayBuffer 的操作。
      </h3>
      <h2>
        Blob 对象表示一个不可变、原始数据的类文件对象。它的数据可以按文本或二进制的格式进行读取，也可以转换成
        ReadableStream 来用于数据操作。
      </h2>
      <CodeStyle>var aBlob = new Blob( array, options );</CodeStyle>
      <p>
        array 是一个由<strong>ArrayBuffer</strong>, <strong>ArrayBufferView</strong>, <strong>Blob</strong>,{' '}
        <strong>DOMString</strong> 等对象构成的 Array ，或者其他类似对象的混合体，它将会被放进 Blob。DOMStrings
        会被编码为 UTF-8
      </p>
      <CodeStyle>
        {`Blob.prototype.arrayBuffer() // 返回Promise，值为 arrayBuffer
          Blob.prototype.slice() // 返回一个新的 Blob 对象，包含制定范围
          Blob.prototype.stream() // 返回一个能读取 Blob 内容的 ReadableStream
          Blob.prototype.text() // 返回Promise，值为 UTF-8 格式字符串
          `}
      </CodeStyle>
      <input type={'file'} onChange={onChangeInputFile} />
      <h2>URL & Blob</h2>
      <ImgStyle src={require('./img_3.png').default} />
      <h2>TextDecoder & TextEncoder</h2>
      <p>
        TextEncoder.encode() 方法接受一个字符串作为输入，返回一个对参数中给定的文本的编码后的
        <strong>Uint8Array</strong>，编码的方法通过 TextEncoder 对象指定。
      </p>
      <p>TextDecoder.decode() 方法返回一个字符串，其包含作为参数传递的缓冲区解码后的文本。</p>
      <CodeStyle>
        {`const encoder = new TextEncoder();
          var arr = encoder.encode('你') // Uint8Array([228, 189, 160])
          const decoder = new TextEncoder();
          var text = decoder.decode(arr) // '你'
          `}
      </CodeStyle>
    </PageStyle>
  )
}

export default TypedArrayDemo
