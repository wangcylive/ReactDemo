import React, {useMemo, useState, useRef, useEffect, PropsWithChildren, useImperativeHandle} from 'react'
import css from './index.module.scss'
import classNames from 'classnames'

export interface Props {
  loop: boolean // 是否循环，默认 false
  speed: number // 切换动画时长（毫秒），默认 400
  autoPlay: boolean // 自动播放，默认 true
  interval: number // 切换间隔（毫秒），默认 5000
  dots: string | boolean // 切换分页，默认不显示，传递 true 或 string 显示，string 类型会当作 dots 的 className
  change(index: number): void // 分页变化触发，如果要准确监听分页变化使用 change 事件，afterChange 为 css transitionEnd事件，连续多次切换有些值监听不到
  afterChange(index: number): void // 切换动画执行后
}

export interface ImperativeHandle {
  next(): void // 切换下一个，到最大会切换到第一个
  prev(): void // 切换上一个，到最小会切换到最后
  goTo(index: number): void // 切换到第 index 个，有处理最大最小值
  getCurrentIndex(): number // 获取当前 index
}

/**
 * 走马灯，可以用 banner 切换类似交互，使用 css transform 切换，children 传递列表
 * 父级使用 ref 获取 ImperativeHandle，调用方式 ref.current.next()
 */
const Carousel = React.forwardRef<ImperativeHandle, PropsWithChildren<Partial<Props>>>(function Carousel(props, ref) {
  const {loop = false, speed = 400, autoPlay = true, interval = 5000, children} = props

  const refTransitioning = useRef<boolean>(false)
  const refIndexHistory = useRef<number[]>([0, 0])
  const refContainer = useRef<HTMLDivElement>(null)

  const [isMouseEnter, setMouseEnter] = useState<boolean>(false)

  const [pageIndex, setPageIndex] = useState<number>(0)
  const maxPageIndex = useMemo<number>(() => {
    return React.Children.count(children) - 1
  }, [children])
  const refPageIndex = useRef<number>(pageIndex)

  const refAutoPlayID = useRef<number>(-1)

  const enableLoop = useMemo<boolean>(() => {
    return loop && React.Children.count(children) > 1
  }, [loop, children])

  const setPageIndexSyncRef = (index: number) => {
    if (index === refPageIndex.current) {
      return
    }
    if (!refTransitioning.current) {
      setPageIndex(index)
      refPageIndex.current = index
      refIndexHistory.current.shift()
      refIndexHistory.current.push(index)

      refTransitioning.current = true
    }
  }

  const playChange = () => {
    window.clearTimeout(refAutoPlayID.current)
    // 不自动切换或鼠标 hover 不执行
    if (!autoPlay || isMouseEnter) {
      return
    }
    let newIndex = refPageIndex.current + 1
    if (newIndex > maxPageIndex) {
      newIndex = 0
    }
    refAutoPlayID.current = window.setTimeout(() => {
      requestAnimationFrame(() => {
        setPageIndexSyncRef(newIndex)
      })
    }, interval)
  }

  const mouseEnter = () => {
    setMouseEnter(true)
  }
  const mouseLeave = () => {
    setMouseEnter(false)
  }

  const transitionEnd = (event: React.TransitionEvent) => {
    props.afterChange?.(refPageIndex.current)
    refTransitioning.current = false
  }

  useImperativeHandle(
    ref,
    () => {
      return {
        next() {
          let newIndex = refPageIndex.current + 1
          if (newIndex > maxPageIndex) {
            newIndex = 0
          }
          setPageIndexSyncRef(newIndex)
        },
        prev() {
          let newIndex = refPageIndex.current - 1
          if (newIndex < 0) {
            newIndex = maxPageIndex
          }
          setPageIndexSyncRef(newIndex)
        },
        goTo(index: number) {
          let newIndex = Math.min(maxPageIndex, index)
          if (newIndex < 0) {
            newIndex = 0
          }
          setPageIndexSyncRef(newIndex)
        },
        getCurrentIndex() {
          return refPageIndex.current
        },
      }
    },
    [maxPageIndex],
  )

  useEffect(() => {
    const el = refContainer.current
    if (el) {
      const prevIndex = refIndexHistory.current[0]

      // 增加变化延迟，触发 transition 动画
      let ms = 0
      if (enableLoop && prevIndex === 0) {
        el.style.transitionDuration = '0s'
        el.style.transitionProperty = 'none'
        if (pageIndex === maxPageIndex && maxPageIndex > 1) {
          el.style.transform = `translateX(${(maxPageIndex + 1) * -100}%)`
        } else {
          el.style.transform = 'translateX(0%)'
        }
        ms = 16
      }
      setTimeout(() => {
        el.style.transitionTimingFunction = 'cubic-bezier(0.165, 0.84, 0.44, 1)'
        el.style.transitionDuration = speed / 1e3 + 's'
        el.style.transitionProperty = 'transform'

        let x = pageIndex * -100 + '%'
        if (pageIndex === 0) {
          x = '0%'

          if (enableLoop && prevIndex === maxPageIndex) {
            x = (maxPageIndex + 1) * -100 + '%'
          }
        }
        el.style.transform = `translateX(${x})`
      }, ms)
    }
  }, [pageIndex, speed, enableLoop, maxPageIndex])

  useEffect(() => {
    playChange()
  }, [maxPageIndex, interval, autoPlay, isMouseEnter, pageIndex])

  useEffect(() => {
    props.change?.(pageIndex)
  }, [pageIndex, props.change])

  useEffect(() => {
    return () => {
      window.clearTimeout(refAutoPlayID.current)
    }
  }, [])

  return (
    <div className={css.wrap} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
      <div className={css.container} ref={refContainer} onTransitionEnd={transitionEnd}>
        {React.Children.map(children, (children, index) => (
          <div className={css.item} key={index}>
            {children}
          </div>
        ))}
        {enableLoop && <div className={css.item}>{React.Children.toArray(children)[0]}</div>}
      </div>
      {props.dots && maxPageIndex > 0 && (
        <ul className={classNames(css.dots, typeof props.dots === 'string' && props.dots)}>
          {Array.from({length: maxPageIndex + 1}).map((_, index) => (
            <li
              key={index}
              className={classNames(css.dotItem, index === pageIndex && css.dotItemActive)}
              onClick={() => setPageIndexSyncRef(index)}
            />
          ))}
        </ul>
      )}
    </div>
  )
})

export default Carousel
