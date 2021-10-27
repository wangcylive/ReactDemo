import React, {useEffect} from 'react'
import css from './index.module.scss'

const TouchAction: React.FC = () => {
  useEffect(() => {
    // document.body.classList.add(css.touchNone)
    // document.documentElement.classList.add(css.touchNone)
  }, [])
  return (
    <div>
      <div className={[css.demo].join(' ')}>
        <ul className={css.vertical}>
          {Array.from({length: 30}).map((_, index) => (
            <li>{index + 1}</li>
          ))}
        </ul>
        <ul className={css.horizontal}>
          {Array.from({length: 30}).map((_, index) => (
            <li>{index + 1}</li>
          ))}
        </ul>
        <div style={{height: '50vh'}} />
      </div>
    </div>
  )
}

export default TouchAction
