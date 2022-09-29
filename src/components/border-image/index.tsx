import React from 'react'
import css from './layout.module.scss'
import img1 from './img/img.png'
import img2 from './img/img_1.png'
import img3 from './img/img_2.png'
import img4 from './img/img_3.png'

const BorderImage: React.FC = () => {
  return (
    <div>
      <img src={img1} alt="" width="81" height="81" />
      <div className={css.demo1}></div>
      <div className={css.demo2}></div>
      <hr />
      <img src={img2} alt="" width="162" height="90" />
      <span>162*90</span>
      <div className={css.demo3}>内容</div>
      <div className={css.demo4}>
        当指定 一个 值时，它将作用到 四个方向 ； 当指定 两个 值时，它将分别作用到 垂直方向 和 水平方向 ； 当指定 三个
        值时，它将分别作用到 上方、水平方向、和下方； 当指定 四个 值时，它将分别作用到 上方、右方、下方和左方。
      </div>
      <hr />
      <img src={img3} alt="" width="160" height="83" />
      <span>160*83</span>
      <div className={css.demo5}>内容</div>
      <div className={css.demo6}>
        当指定 一个 值时，它将作用到 四个方向 ； 当指定 两个 值时，它将分别作用到 垂直方向 和 水平方向 ； 当指定 三个
        值时，它将分别作用到 上方、水平方向、和下方； 当指定 四个 值时，它将分别作用到 上方、右方、下方和左方。
      </div>
      <hr />
      <img src={img4} alt="" width="169" height="90" />
      <span>169*90</span>
      <div className={css.demo7}>内容</div>
      <div className={css.demo8}>
        当指定 一个 值时，它将作用到 四个方向 ； 当指定 两个 值时，它将分别作用到 垂直方向 和 水平方向 ； 当指定 三个
        值时，它将分别作用到 上方、水平方向、和下方； 当指定 四个 值时，它将分别作用到 上方、右方、下方和左方。
      </div>
    </div>
  )
}

export default BorderImage
