import React, {useEffect, useLayoutEffect, useRef, useState} from 'react'
import {useLocation} from 'react-router-dom'
import {hasMatchPath} from './path-utils'
import classNames from 'classnames'

export interface Props {
  className?: string
  path: string | string[]
  scrollEl?: HTMLElement
}

const RouteAlive: React.FC<React.PropsWithChildren<Props>> = props => {
  const refScrollTop = useRef<number>(0)
  const path = useLocation()
  const [render, setRender] = useState<boolean>(hasMatchPath(props.path, path.pathname))
  const [visible, setVisible] = useState<boolean>(hasMatchPath(props.path, path.pathname))
  const [styles, setStyles] = useState<React.CSSProperties>(visible ? {} : {display: 'none'})

  useLayoutEffect(() => {
    const visible = hasMatchPath(props.path, path.pathname)
    setVisible(visible)
    if (visible) {
      setStyles({})
    } else {
      if (props.scrollEl) {
        refScrollTop.current = props.scrollEl.scrollTop
      }

      setStyles({
        display: 'none',
      })
    }
  }, [props.path, path.pathname, props.scrollEl])

  useLayoutEffect(() => {
    if (visible && props.scrollEl) {
      props.scrollEl.scrollTop = refScrollTop.current
    }
  }, [visible])

  useEffect(() => {
    if (hasMatchPath(props.path, path.pathname)) {
      setRender(true)
    }
  }, [path.pathname, props.path])

  if (!render) {
    return null
  }

  return (
    <div style={styles} className={classNames(props.className)}>
      {React.Children.map(props.children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as any, {routeAlive: visible, scrollTop: refScrollTop.current})
        }
        return child
      })}
    </div>
  )
}

export default RouteAlive
