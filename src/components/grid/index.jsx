import React, {useEffect, useRef, useState} from 'react'
import css from './layout.module.scss'

const GridDemo = () => {
  const refDiv6 = useRef()
  const [limitRender, setLimitRender] = useState(6)

  useEffect(() => {
    const resize = () => {
      const el = refDiv6.current
      if (el) {
        const width = el.clientWidth
        const gap = 30
        const itemMinWidth = 200
        const count = Math.floor((width + gap) / (itemMinWidth + gap))
        let allGapWidth = 0
        if (count > 1) {
          allGapWidth = (count - 1) * gap
        }
        const itemRenderWidth = (width - allGapWidth) / count
        const itemRealWidth = el.children[0].getBoundingClientRect().width
        console.log('test', count, itemRenderWidth, itemRealWidth)

        setLimitRender(Math.max(6, count * 2))
      }
    }

    resize()

    window.addEventListener('resize', resize)

    const resizeObserver = new ResizeObserver((entries, observer) => {
      for (const entry of entries) {
        console.log('test', entry, observer)
      }
    })

    resizeObserver.observe(refDiv6.current)
    resizeObserver.observe(document.body)

    return () => {
      window.removeEventListener('resize', resize)

      resizeObserver.disconnect()
    }
  }, [])

  return (
    <div>
      <ul className={css.test1}>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
      </ul>
      <ul className={css.test2}>
        {new Array(9).fill(1).map((item, index) => (
          <li key={index}>{index + 1}</li>
        ))}
      </ul>
      <div className={css.test3}>
        <div>剧中</div>
      </div>
      <div className={css.test4}>
        {new Array(5).fill(1).map((item, index) => (
          <div key={index}>{index + 1}</div>
        ))}
      </div>
      <div className={css.test5}>
        {new Array(5).fill(1).map((item, index) => (
          <div key={index}>{index + 1}</div>
        ))}
      </div>
      <div className={css.test6} ref={refDiv6}>
        {Array.from({length: limitRender}).map((_, index) => (
          <div key={index}>{index + 1}</div>
        ))}
      </div>
      <div className={css.test7}>
        {Array.from({length: 10}).map((_, index) => (
          <div key={index}>{index + 1}</div>
        ))}
      </div>
    </div>
  )
}

export default GridDemo
