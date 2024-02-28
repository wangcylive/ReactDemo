import React, {useEffect, useRef, useState} from 'react'
import styled from 'styled-components'

const Page = styled.div`
  display: flex;
`

const Log = styled.div`
  margin-left: 10px;
  flex: 1 1 1px;
  padding: 8px;
  height: 200px;
  overflow: hidden;
  overflow-y: auto;
  white-space: pre-wrap;
  font-size: 13px;
  color: #333;
  border: 1px solid #ccc;

  p {
    margin: 5px;
    padding: 5px;
    &:not(:last-child) {
      border-bottom: 1px solid #3685ff55;
    }
  }
`

const ScrollWrap = styled.div`
  border: 1px solid #ccc;
  width: 200px;
  height: 300px;
  overflow: auto;
  padding: 20px;
`

const DivPlaceholder = styled.div`
  height: 400px;
  background-color: #4a4f5d;
`

const Div1 = styled.div`
  margin: 20px 0;
  height: 100px;
  background-color: #28a4c9;
`

const Div2 = styled(Div1)`
  background-color: #3685ff;
`

const Intersection: React.FC = () => {
  const refEl = useRef<HTMLDivElement>(null)
  const refLogs = useRef<HTMLDivElement>(null)
  const [logs, setLogs] = useState<string[]>([])

  const pushLogs = (log: string) => {
    setLogs(prevState => {
      const newState = [...prevState]
      newState.push(log)
      return newState
    })
  }

  useEffect(() => {
    const el = refEl.current
    const elRoot = el.querySelector('.wrap')
    const elDiv1 = el.querySelector('.div1')
    const elDiv2 = el.querySelector('.div2')

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          console.log('intersection', entry)
          if (entry.isIntersecting) {
            entry.target.classList.add('anime-flash-opacity')
            pushLogs(entry.target.className + '进入范围')
          } else {
            entry.target.classList.remove('anime-flash-opacity')
            pushLogs(entry.target.className + '离开范围')
          }
        })
      },
      {
        root: elRoot,
        rootMargin: '20px',
        threshold: 0,
      },
    )

    observer.observe(elDiv1)
    observer.observe(elDiv2)
  }, [])

  useEffect(() => {
    const el = refLogs.current
    if (el) {
      el.scrollTop = el.scrollHeight - el.clientHeight
    }
  }, [logs])

  return (
    <Page ref={refEl}>
      <ScrollWrap className={'wrap'}>
        <DivPlaceholder />
        <Div1 className={'div1'} />
        <Div2 className={'div2'} />
        <DivPlaceholder />
      </ScrollWrap>
      <Log ref={refLogs}>
        {logs.map((log, index) => (
          <p key={index}>{log}</p>
        ))}
      </Log>
    </Page>
  )
}

export default Intersection
