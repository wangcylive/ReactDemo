import React, {useEffect, useRef, useState} from 'react'
import css from './index.module.scss'
import BScroll from '@better-scroll/core'
import PullDown from '@better-scroll/pull-down'

BScroll.use(PullDown)
const ScrollPage: React.FC = () => {
  const refEl = useRef<HTMLDivElement>(null)
  const [beforePullDown, setBeforePullDown] = useState<boolean>(true)
  const [isPullingDown, setIsPullingDown] = useState<boolean>(false)
  useEffect(() => {


    const bs = new BScroll(refEl.current, {
      probeType: 3,
      click: true,
      bounceTime: 400,
      pullDownRefresh: {
        threshold: 70,
        stop: 56
      }
    })

    bs.on('pullingDown', () => {
      console.log('pullDown', performance.now())
      setBeforePullDown(false)
      setIsPullingDown(true)
      setTimeout(() => {
        setIsPullingDown(false)
        bs.finishPullDown()
        setTimeout(() => {
          setBeforePullDown(true)
          bs.refresh()
        }, 200)
      }, 1000)
    })
  }, [])
  return <div>
    <div className={css.warp} ref={refEl}>
      <div className={css.content}>
        {
          beforePullDown && <div className={css.pulldown}>
            <span>Pull Down and refresh</span>
          </div>
        }
        {
          !beforePullDown && <div className={css.pulldown}>
            {
              isPullingDown ? <div>
                <span>Loading...</span>
              </div> : <div>
                <span>Refresh success</span>
              </div>
            }
          </div>
        }

        <div className={css.testDiv}>Test Div</div>
        {/*{Array.from({length: 20}).map((_, index) => <div key={index} className={css.item}>item {index + 1}</div>)}*/}
      </div>
    </div>
  </div>
}

export default ScrollPage