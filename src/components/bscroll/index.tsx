import React, {useEffect, useRef} from 'react'
import css from './index.module.scss'
import BScroll from '@better-scroll/core'

const ScrollPage: React.FC = () => {
  const refEl = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const bs = new BScroll(refEl.current, {
      probeType: 3,
      click: true,
      bounceTime: 400
    })
  }, [])
  return <div>
    <div className={css.warp} ref={refEl}>
      <div className={css.content}>
        <div className={css.testDiv}>Test Div</div>
        {/*{Array.from({length: 20}).map((_, index) => <div key={index} className={css.item}>item {index + 1}</div>)}*/}
      </div>
    </div>
  </div>
}

export default ScrollPage