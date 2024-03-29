import React, {useEffect} from 'react'
import css from './index.module.scss'

const DragDemo: React.FC = () => {
  const onParentDrop = event => {
    console.log(event)
  }

  const onDrag = event => {
    // console.log(event)
  }

  useEffect(() => {
    var dragged

    /* 可拖动的目标元素会触发事件 */
    // document.addEventListener('drag', function (event) {}, false)
    //
    document.addEventListener(
      'dragstart',
      function (event) {
        // 保存拖动元素的引用 (ref.)
        dragged = event.target
        // 使其半透明
        event.target.style.opacity = 0.5
      },
      false,
    )
    //
    // document.addEventListener(
    //   'dragend',
    //   function (event) {
    //     // 重置透明度
    //     event.target.style.opacity = ''
    //   },
    //   false,
    // )
    //
    // /* 放下目标节点时触发事件 */
    document.addEventListener(
      'dragover',
      function (event) {
        // 阻止默认动作
        event.preventDefault()
      },
      false,
    )
    //
    // document.addEventListener(
    //   'dragenter',
    //   function (event) {
    //     // 当可拖动的元素进入可放置的目标高亮目标节点
    //     if (event.target.className == 'dropzone') {
    //       event.target.style.background = 'purple'
    //     }
    //   },
    //   false,
    // )
    //
    // document.addEventListener(
    //   'dragleave',
    //   function (event) {
    //     // 当拖动元素离开可放置目标节点，重置其背景
    //     if (event.target.className == 'dropzone') {
    //       event.target.style.background = ''
    //     }
    //   },
    //   false,
    // )

    document.addEventListener(
      'drop',
      function (event) {
        // 阻止默认动作（如打开一些元素的链接）
        event.preventDefault()
        console.log(event.type, event.target, dragged)
        // event.target.appendChild(dragged)
        // 移动拖动的元素到所选择的放置目标节点
        // if (event.target.className == 'dropzone') {
        //   event.target.style.background = ''
        //   dragged.parentNode.removeChild(dragged)
        //   event.target.appendChild(dragged)
        // }
      },
      false,
    )
  }, [])

  return (
    <div>
      <button draggable={true} onDrag={onDrag} onDrop={onParentDrop}>
        1
      </button>
      <button draggable={true} onDrag={onDrag}>
        2
      </button>

      <div className={css.dropContent} onDrop={onParentDrop}></div>
    </div>
  )
}

export default DragDemo
