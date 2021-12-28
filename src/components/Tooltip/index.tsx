import React, {ReactElement, ReactNode, useEffect, useState, useRef} from 'react'
import ReactDom from 'react-dom'
import css from './index.module.scss'

export type Placement = 'left' | 'right' | 'top' | 'bottom'

export interface Props {
  content: ReactNode
  placement?: Placement
  margin?: number
  className?: string
}

const Tooltip: React.FC<React.PropsWithChildren<Props>> = props => {
  const {children, content, placement = 'bottom', margin = 10} = props
  const [isMouseEnter, setMouseEnter] = useState<boolean>(false)
  const [position, setPosition] = useState<[number, number]>([0, 0])
  const isClient = typeof window !== 'undefined'
  const refEl = useRef<HTMLDivElement>(null)
  const refLevelTimeoutID = useRef<number>(-1)
  const onMouseEnter = (event: React.MouseEvent, set = true) => {
    window.clearTimeout(refLevelTimeoutID.current)
    const target = event.currentTarget
    if (set) {
      const rect = target.getBoundingClientRect()
      let top = 0
      let left = 0
      const {scrollLeft, scrollTop} = document.documentElement
      if (placement === 'bottom' || placement === 'top') {
        top = rect[placement] + scrollTop
        left = rect.left + rect.width / 2 + scrollLeft
      } else if (placement === 'left' || placement === 'right') {
        top = rect.top + rect.height / 2 + scrollTop
        left = rect[placement] + scrollLeft
      }

      setPosition([left, top])
    }
    setMouseEnter(true)
  }
  const onMouseLeave = () => {
    window.clearTimeout(refLevelTimeoutID.current)
    refLevelTimeoutID.current = window.setTimeout(() => {
      setMouseEnter(false)
    }, 100)
  }
  const onAnimationEnd = (e: React.AnimationEvent) => {
    if (e.animationName === css.fadeOut) {
      ;(e.target as HTMLDivElement).style.display = 'none'
    }
  }

  useEffect(() => {
    const el = refEl.current
    const elStyle = el.style
    if (isMouseEnter) {
      const [left, top] = position
      elStyle.display = 'block'
      elStyle.left = '-9999px'
      elStyle.top = '-9999px'
      const {offsetWidth: elWidth, offsetHeight: elHeight} = el
      const {scrollWidth: docWidth, scrollHeight: docHeight} = document.documentElement

      const maxLeft = docWidth - elWidth
      const maxTop = docHeight - elHeight
      const setLeft = (val: number) => {
        return Math.max(0, Math.min(maxLeft, val)) + 'px'
      }
      const setTop = (val: number) => {
        return Math.max(0, Math.min(maxTop, val)) + 'px'
      }
      if (placement === 'top' || placement === 'bottom') {
        elStyle.left = setLeft(left - elWidth / 2)

        if (placement === 'bottom') {
          elStyle.top = setTop(top + margin)
        } else {
          elStyle.top = setTop(top - elHeight - margin)
        }
      } else {
        elStyle.top = setTop(top - elHeight / 2)

        if (placement === 'left') {
          elStyle.left = setLeft(left - elWidth - margin)
        } else {
          elStyle.left = setLeft(left + margin)
        }
      }
      el.classList.remove(css.animeOut)
      el.classList.add(css.animeIn)
    } else {
      el.classList.remove(css.animeIn)
      el.classList.add(css.animeOut)
    }
  }, [isMouseEnter, position, margin, placement])

  const elements = React.Children.map(children, (item: ReactElement) => {
    if (typeof item.type === 'string') {
      return React.cloneElement(item, {
        onMouseEnter(event: React.MouseEvent) {
          item.props?.onMouseEnter?.(event)
          onMouseEnter(event, true)
        },
        onMouseLeave(event: React.MouseEvent) {
          item.props?.onMouseLeave?.(event)
          onMouseLeave()
        },
      })
    }
    return item
  })

  const Content =
    isClient &&
    document.body &&
    ReactDom.createPortal(
      <div
        className={css.tooltip}
        onMouseEnter={event => onMouseEnter(event, false)}
        onMouseLeave={onMouseLeave}
        onAnimationEnd={onAnimationEnd}
        style={{display: 'none'}}
        ref={refEl}>
        {content}
      </div>,
      document.body,
    )

  return (
    <>
      {elements}
      {Content}
    </>
  )
}

export default Tooltip
