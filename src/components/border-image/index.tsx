import React from 'react'
import css from './layout.module.scss'
import img1 from './img/img.png'
import img2 from './img/img_1.png'
import img3 from './img/img_2.png'
import img4 from './img/img_3.png'
import img5 from './img/img_4.png'

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
      <hr />
      <img src={img5} alt="" width="751" height="461" style={{width: '300px', height: 'auto'}} />
      <div className={css.demo10}>
        number 表示到图像边缘的偏移量，在位图中的单位为像素点，在矢量图中则是坐标。对于矢量图，number
        值与元素大小相关，而非矢量图的原始大小。因此，使用矢量图时，使用百分比值（percentage）更可取。 percentage
        以原始图像大小的百分比表示的边缘偏移量：水平偏移使用图像的宽度，垂直偏移则使用图像的高度。 fill
        保留图像的中心区域并将其作为背景图像显示出来，但其会堆叠在 background
        之上。它的宽度和高度分别对应顶部和左侧图像切片的宽度和高度。
      </div>
    </div>
  )
}

export default BorderImage
