import React, {useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react'
import ReactDOM from 'react-dom'
import css from './index.module.scss'

export type Position = 'bottom' | 'right'

export interface Props {
  visible: boolean
  position?: Position
  living?: boolean
  renderToBody?: boolean
  className?: string
  onExited?(): void
  onEntered?(): void
}

interface AnimeClassProps {
  show: string
  hide: string
}

const useCustomEffect = typeof window === 'object' ? useEffect : useLayoutEffect

function classNames(...rest: any[]) {
  return rest.filter(val => val).join(' ')
}

const AnimeTransition: React.FC<React.PropsWithChildren<Props>> = props => {
  const {children, visible, position, living, renderToBody, onEntered, onExited} = props
  const child: any = React.Children.only(children)
  const [selfVisible, setSelfVisible] = useState<boolean>(() => visible) // 组件自身判断是否显示，隐藏时候做动画使用
  const refFirstRender = useRef<boolean>(true) // 是否首次渲染
  const refPortrait = useRef<boolean>(true) // 是否竖屏
  const animeClasses = useMemo<AnimeClassProps>(() => {
    let arr: [string, string] = refPortrait.current
      ? [css.slideInUp, css.slideOutDown]
      : [css.slideInRight, css.slideOutRight]
    switch (position) {
      case 'right':
        arr = [css.slideInRight, css.slideOutRight]
        break
    }
    const [show, hide] = arr
    return {
      show,
      hide,
    }
  }, [visible])

  useCustomEffect(() => {
    refFirstRender.current = false
  }, [visible])

  useEffect(() => {
    // const mediaQueryList = window.matchMedia('(orientation: portrait)')
    // refPortrait.current = mediaQueryList.matches
    // if (mediaQueryList.addEventListener) {
    //   mediaQueryList.addEventListener('change', event => {
    //     refPortrait.current = event.matches
    //   })
    // } else {
    //   mediaQueryList.addListener?.(event => {
    //     refPortrait.current = event.matches
    //   })
    // }
  }, [])

  if (visible) {
    const ReactElem = React.createElement(
      'div',
      {
        className: classNames(css.animePage, props.className, !refFirstRender.current && animeClasses.show),
        onAnimationEnd(e: AnimationEvent) {
          setSelfVisible(true)
          onEntered?.()
        },
      },
      child,
    )
    if (renderToBody) {
      return ReactDOM.createPortal(ReactElem, document.body)
    }
    return ReactElem
  } else {
    if ((selfVisible || living) && !refFirstRender.current) {
      const ReactElem = React.createElement(
        'div',
        {
          className: classNames(css.animePage, props.className, animeClasses.hide),
          style: {display: selfVisible ? '' : 'none'},
          onAnimationEnd(e: AnimationEvent) {
            setSelfVisible(false)
            onExited?.()
          },
        },
        child,
      )
      if (renderToBody) {
        return ReactDOM.createPortal(ReactElem, document.body)
      }
      return ReactElem
    }
    return null
  }
}

AnimeTransition.defaultProps = {
  position: 'right',
  renderToBody: true,
}

export default AnimeTransition
