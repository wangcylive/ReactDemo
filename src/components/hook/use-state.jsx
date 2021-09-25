import React, {useState, useEffect, useDebugValue, useRef} from 'react'

function usePrevious(value) {
  const ref = useRef(value)
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

function randomChinese(length = 1) {
  return Array.from({length})
    .map(() => String.fromCharCode(Math.floor(Math.random() * 2000) + 19968))
    .join('')
}

const fetchData = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('fetch data')
    }, 0)
  })
}

const MessageItem = props => {
  return <li>{props.msg}</li>
}

function HookUseState() {
  const [name, setName] = useState('name')
  const [count, setCount] = useState(0)
  const [list, setList] = useState([])
  const refListEl = useRef(null)
  const refEl = useRef(null)
  const [dateStr, setDateStr] = useState(() => {
    console.log('initialState dataStr', performance.now())
    const date = new Date()
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  })
  const prevName = usePrevious(name)
  const nameLength = name.length
  const prevNameLength = usePrevious(nameLength)

  useEffect(() => {
    console.log('useEffect all', name, prevName)
  })

  useEffect(() => {
    console.log('useEffect name', refEl.current.textContent)
  }, [name])

  useDebugValue(name)

  const onChange = event => {
    setName(event.target.value)
    console.log('onChangeName sync', refEl.current.textContent)
  }

  const onAddList = async () => {
    // setTimeout, requestAnimationFrame, setInterval, Promise, Async, Dom AddEventListener
    Promise.resolve().then(() => {
      const isBottom = isScrollBottom()
      const start = performance.now()
      setList([...list, randomChinese(4)])
      console.log('onAddList performance setState', performance.now() - start, list)
      if (isBottom) {
        scrollBottom(true)
      }

      console.log('onAddList', isBottom, refListEl.current.childElementCount)
    })
  }

  const scrollBottom = (smooth = true) => {
    const el = refListEl.current
    el.scrollTo({
      top: el.scrollHeight - el.clientHeight,
      behavior: smooth ? 'smooth' : 'auto',
    })
  }

  const isScrollBottom = () => {
    const el = refListEl.current
    const maxScrollTop = el.scrollHeight - el.clientHeight
    return el.scrollTop >= maxScrollTop
  }

  useEffect(() => {
    // setInterval(() => {
    //   const isBottom = isScrollBottom()
    //   const start = performance.now()
    //   setList(val => [...val, randomChinese(4)])
    //   console.log('interval performance setState', performance.now() - start)
    //   if (isBottom) {
    //     scrollBottom(true)
    //   }
    //   console.log('interval', isBottom, refListEl.current.childElementCount)
    // }, 3000)

    async function fn() {
      const data = await fetchData()
      const isBottom = isScrollBottom()
      const start = performance.now()
      setList(val => [...val, randomChinese(4), data])
      console.log('interval performance setState', performance.now() - start, list)
      if (isBottom) {
        scrollBottom(true)
      }
      console.log('interval', isBottom, refListEl.current.childElementCount)
    }
    fn()

    document.body.addEventListener(
      'click',
      () => {
        const isBottom = isScrollBottom()
        const start = performance.now()
        setList(val => [...val, randomChinese(4)])
        console.log('interval performance setState', performance.now() - start, list)
        if (isBottom) {
          scrollBottom(true)
        }
        console.log('interval', isBottom, refListEl.current.childElementCount)
      },
      false,
    )
  }, [])

  useEffect(() => {}, [list])

  return (
    <div>
      <p>
        <input value={name} onChange={onChange} />
        <button onClick={e => setName('SS')}>set name</button>
      </p>
      <p>
        name: <span ref={refEl}>{name} </span>
        <span>prev name: {prevName}</span>
      </p>
      <p>
        <span>name length: {nameLength}</span> <span>prev name length: {prevNameLength}</span>
      </p>
      <p>
        <button onClick={e => setCount(val => val + 1)}>Increment</button>
        <button onClick={e => setCount(val => val - 1)}>Decrement</button>
        <span>count: {count}</span>
      </p>
      <p>date: {dateStr}</p>
      <div>
        <button onClick={onAddList}>Add list</button>
        <ul ref={refListEl} className={'hooks-list-ul'}>
          {list.map((item, index) => (
            <MessageItem msg={item} key={item + index} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default HookUseState
