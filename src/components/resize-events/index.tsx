import React, {useEffect, useRef, useState} from 'react'
import styled from 'styled-components'

const MediaMatchDiv = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  background-color: #3685ff;
  font-size: 16px;
  color: #fff;

  @media only screen and (min-width: 415px) and (max-width: 767px) {
    background-color: #52c41a;
  }

  @media only screen and (max-width: 414px) {
    background-color: #f44336;
  }
`
const MediaMatchText = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  padding: 0 20px;
  font-size: 16px;
  background-color: #28a4c9;
  color: #fff;
`

export interface BoxSize {
  width: number
  height: number
}

const ResizeEvents: React.FC = () => {
  const refTextareaEl = useRef<HTMLTextAreaElement>(null)
  const refTextareaEl2 = useRef<HTMLTextAreaElement>(null)
  const [textAreaBoxSize, setTextAreaBoxSize] = useState<BoxSize>({width: 0, height: 0})
  const [textAreaBoxSize2, setTextAreaBoxSize2] = useState<BoxSize>({width: 0, height: 0})
  const [windowSize, setWindowSize] = useState<BoxSize>({width: 0, height: 0})
  const [medalMatch, setMedalMatch] = useState<string>('')
  useEffect(() => {
    const windowResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      setWindowSize({width, height})
      console.log('window resize', width, 'x', height)
    }
    window.addEventListener('resize', windowResize, false)

    const setSizeInfo = (entry: ResizeObserverEntry, dispatch: React.Dispatch<any>) => {
      if (entry.contentBoxSize?.length) {
        const {inlineSize: width, blockSize: height} = entry.contentBoxSize[0]
        dispatch({width, height})
        console.log('size', width, 'x', height)
      } else {
        const {width, height} = entry.contentRect
        dispatch({width, height})
        console.log('size', width, 'x', height)
      }
    }

    const resizeObserver = new ResizeObserver(entries => {
      console.log('resizeObserver', entries.length)
      for (const entry of entries) {
        console.log('entry', entry)
        if (entry.target === refTextareaEl.current) {
          setSizeInfo(entry, setTextAreaBoxSize)
        } else if (entry.target === refTextareaEl2.current) {
          setSizeInfo(entry, setTextAreaBoxSize2)
        }
      }
    })

    resizeObserver.observe(refTextareaEl.current)
    resizeObserver.observe(refTextareaEl2.current)

    const mediaQueryList1 = window.matchMedia('(min-width: 768px)')
    const mediaQueryList2 = window.matchMedia('(min-width: 415px) and (max-width: 767px)')
    const mediaQueryList3 = window.matchMedia('(max-width: 414px)')
    const mediaQueries = [mediaQueryList1, mediaQueryList2, mediaQueryList3]
    mediaQueries.forEach(item => {
      if (item.matches) {
        setMedalMatch(item.media)
      }

      item.onchange = event => {
        if (event.matches) {
          setMedalMatch(event.media)
        }
      }
    })
    console.log('mediaQueryList', mediaQueryList1, mediaQueryList2, mediaQueryList3)

    return () => {
      window.removeEventListener('resize', windowResize, false)
      resizeObserver.disconnect()
      mediaQueries.forEach(item => {
        item.onchange = null
      })
    }
  }, [])

  return (
    <div>
      <p>
        window size: {windowSize.width}x{windowSize.height}
      </p>
      <h3>Resize Observer API</h3>
      <p>提供了一种高性能的机制，通过该机制，代码可以监视元素的大小更改，并且每次大小更改时都会向观察者传递通知。</p>
      <p>
        构造函数
        <code>ResizeObserver()</code>创建并返回一个新的 ResizeObserver 对象。
      </p>
      <p>
        方法
        <code>ResizeObserver.disconnect() </code>取消特定观察者目标上所有对 Element 的监听，
        <code>ResizeObserver.observe()</code>开始对指定 Element 的监听，
        <code>ResizeObserver.unobserve()</code>结束对指定 Element 的监听
      </p>
      <textarea ref={refTextareaEl} placeholder={'输入文本'}></textarea>
      <span>
        boxSize:{textAreaBoxSize.width}x{textAreaBoxSize.height}
      </span>
      <textarea ref={refTextareaEl2} placeholder={'输入文本'}></textarea>
      <span>
        boxSize:{textAreaBoxSize2.width}x{textAreaBoxSize2.height}
      </span>
      <h3>Window.matchMedia()</h3>
      <p>
        Window 的 matchMedia() 方法返回一个新的 MediaQueryList 对象，表示指定的媒体查询
        (en-US)字符串解析后的结果。返回的 MediaQueryList 可被用于判定 Document 是否匹配媒体查询，或者监控一个 document
        来判定它匹配了或者停止匹配了此媒体查询。
      </p>
      <MediaMatchText>{medalMatch}</MediaMatchText>
      <MediaMatchDiv>css media</MediaMatchDiv>
    </div>
  )
}

export default ResizeEvents
