import React, {useEffect, useRef, useState} from 'react'
import ReactDOM from 'react-dom'

const spanStyle = {outline: '1px solid red', margin: '0 3px', padding: '2px 4px', display: 'flex'}

const Demo1: React.FC<{value: string; index: number; parentNode: HTMLElement}> = props => {
  useEffect(() => {
    console.log('demo', props.value, performance.now())
  }, [])
  if (
    props.parentNode?.nodeType === Node.ELEMENT_NODE &&
    document &&
    document.body &&
    document.body.contains(props.parentNode)
  ) {
    return ReactDOM.createPortal(
      <span style={{outline: '1px solid green', margin: '0 3px', padding: '2px 4px', order: props.index}}>
        {props.value}
      </span>,
      props.parentNode,
    )
  }
  return null
}

const Wrap1: React.FC<React.PropsWithChildren<any>> = props => {
  useEffect(() => {
    console.log('wrap', performance.now())
  }, [])
  return <li style={spanStyle}>{props.children}</li>
}

const KeyDemo: React.FC = () => {
  const [state, setState] = useState<string[]>(['a', 'b', 'd'])
  const [spanNodes, setSpanNodes] = useState<HTMLLIElement[]>([])
  const refSlideWrapEl = useRef<HTMLUListElement>(null)
  const onAdd = () => {
    setState(prevState => {
      const newState = [...prevState]
      newState.splice(2, 0, 'c' + newState.length)
      return newState
    })
  }
  const onDel = () => {
    setState(prevState => {
      const newState = [...prevState]
      newState.splice(1, 1)
      return newState
    })
  }
  const onMove = () => {
    setState(prevState => {
      const newState = [...prevState]
      const arr2 = newState.splice(2, 1)[0]
      newState.splice(1, 0, arr2)
      return newState
    })
  }
  useEffect(() => {
    const parentNode = refSlideWrapEl.current
    const nodeList = parentNode.querySelectorAll('li')
    setSpanNodes([...nodeList])
  }, [state.length])
  return (
    <div>
      <p>循环多层渲染不刷新</p>
      <button onClick={onAdd}>添加</button>
      <button onClick={onDel}>减少</button>
      <button onClick={onMove}>移动</button>
      <hr />
      {/*{state.map((item, index) => (*/}
      {/*  <Demo1 key={item} value={item} />*/}
      {/*))}*/}
      <ul ref={refSlideWrapEl}>
        {Array.from({length: Math.ceil(state.length / 2)}).map((item, index) => (
          <Wrap1 key={index} />
        ))}
      </ul>
      {spanNodes.length &&
        state.map((item, index) => (
          <Demo1
            key={item}
            value={item}
            index={index}
            parentNode={spanNodes[Math.floor(index / 2)] as HTMLSpanElement}
          />
        ))}
      {/*{state.slice(index * 2, (index + 1) * 2).map((list, idx) => (*/}

      {/*))}*/}
    </div>
  )
}

export default KeyDemo
