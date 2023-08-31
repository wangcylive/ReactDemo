import React, {
  useState,
  useTransition,
  startTransition,
  useId,
  useDeferredValue,
  useEffect,
  useMemo,
  useLayoutEffect,
} from 'react'
import {flushSync} from 'react-dom'

const CountDemo: React.FC<{value: any}> = props => {
  useEffect(() => {
    // console.log('render', props.value)
  }, [props.value])

  return <div>{props.value}</div>
}

const UseTransitionPage: React.FC = () => {
  const id1 = useId()
  const id2 = useId()

  const [isClickPending, startClickTransition] = useTransition()
  const [clickCount, setClickCount] = useState<number>(0)
  const [inputValue, setInputValue] = useState<string>('')

  const deferredInputValue = useDeferredValue(inputValue)

  const countTest = useMemo(() => <CountDemo value={deferredInputValue} />, [deferredInputValue])

  console.log('render', performance.now())

  const handleClick = () => {
    flushSync(() => {
      setClickCount(val => val + 1)
    })

    // setClickCount(val => val + 1)
    setInputValue('w')

    const btn = document.querySelector('.btn-demo')
    console.log('btn count', btn.textContent)

    // startClickTransition(() => {
    //   console.log('click', performance.now())
    // })
  }

  const changeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)

    startTransition(() => {
      console.log('input', value, performance.now())
    })
  }

  // useEffect(() => {
  //   console.log('useEffect inputValue', inputValue)
  // }, [inputValue])
  //
  // useEffect(() => {
  //   console.log('useEffect deferredInputValue', deferredInputValue)
  // }, [deferredInputValue])

  // useEffect(() => {
  //   console.log('useId', id1, id2)
  // }, [])

  useEffect(() => {
    // setTimeout(() => {
    //   setClickCount(val => val + 1)
    //   setInputValue('1')
    //
    //   const btn = document.querySelector('.btn-demo')
    //   console.log('btn count', btn.textContent)
    //
    // }, 100)
  }, [])

  // useEffect(() => {
  //   const btn = document.querySelector('.btn-demo')
  //   console.log('useEffect btn count', btn.textContent)
  // }, [clickCount])
  //
  // useLayoutEffect(() => {
  //   const btn = document.querySelector('.btn-demo')
  //   console.log('useLayoutEffect btn count', btn.textContent)
  // }, [clickCount])

  return (
    <div>
      <div>
        <button className="btn-demo" onClick={handleClick}>
          Click{clickCount}
        </button>
        &nbsp;{isClickPending && <span>pending...</span>}
      </div>
      <div>
        <input type="text" defaultValue={inputValue} onChange={changeInputValue} />
        <div>
          <span>{inputValue}</span>
          <br />
          {countTest}
        </div>
      </div>
    </div>
  )
}

export default UseTransitionPage
