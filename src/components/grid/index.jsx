import React from 'react'
import css from './layout.module.scss'

const GridDemo = () => {
  return <div>
    <ul className={css.test1}>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
    </ul>
    <ul className={css.test2}>
      {
        new Array(9).fill(1).map((item, index) => <li key={index}>{index + 1}</li>)
      }
    </ul>
    <div className={css.test3}>
      <div>剧中</div>
    </div>
    <div className={css.test4}>
      {
        new Array(5).fill(1).map((item, index) => <div key={index}>{index + 1}</div>)
      }
    </div>
    <div className={css.test5}>
      {
        new Array(5).fill(1).map((item, index) => <div key={index}>{index + 1}</div>)
      }
    </div>
  </div>
}

export default GridDemo