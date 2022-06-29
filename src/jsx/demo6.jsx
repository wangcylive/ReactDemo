import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import canvasDemo from './annulus'

class Demo6 extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    const canvas = canvasDemo({ lineWidth: 15 })
    this.div.appendChild(canvas.el)
    canvas.el.style.cssText = 'width: 100px;height: 100px;'
    const time = performance.now()
    canvas.draw(360, 0).then(() => {
      canvas.draw(0, 1000).then(() => {
        console.log('done', performance.now() - time)
      })
    })
  }

  render () {
    return (
      <div>
        <div className="hello-word">{this.props.name}</div>
        <div ref={el => this.div = el}>

        </div>
        <progress/>
        <button>Change</button>
      </div>
    )
  }
}

Demo6.defaultProps = {
  name: 'Wangcy'
}

Demo6.propTypes = {
  name: PropTypes.string.isRequired
}

export default Demo6

// ReactDom.render(
//   <HelloWord/>,
//   document.getElementById('demo6')
// )

const traverse = (newNodes, oldNodes) => {
  const newLength = newNodes.length
  const oldLength = oldNodes.length

  // 这里做排序，找到 id 一样的移位置
  newNodes.forEach((item, index) => {
    const oldNodesIdMaps = new Map(oldNodes.map((item, index) => ([ item.id, index ])))
    const oldIdIndex = oldNodesIdMaps.get(item.id)
    if (oldIdIndex !== undefined && oldIdIndex !== index) {
      const spliceItem = oldNodes.splice(oldIdIndex, 1)[ 0 ]
      oldNodes.splice(index, 0, spliceItem)
    }
  })

  // 如果新长度小于旧长度，删除操作，设置长度一致
  if (newLength < oldLength) {
    oldNodes.splice(oldLength - newLength - 1)
  }
  newNodes.forEach((item, index) => {
    const oldItem = oldNodes[ index ]
    // id 不一样，替换掉
    if (!oldItem || item.id !== oldItem.id) {
      oldNodes.splice(index, 0, { ...item })
    } else {
      // id 一样，比较 children
      traverse(item.children, oldItem.children)
    }
  })
}

const a = [
  {
    'id': 'AppBox',
    'label': '容器',
    'children': [
      {
        'id': 'AppBox_76765',
        'label': '盒子组件',
        'children': [
          {
            'id': 'AppBox_89343',
            'label': '单张图片',
            'children': [],
            'canInsertChildren': false
          }
        ],
        'canInsertChildren': true
      }
    ]
  }
]

const b = [
  {
    'id': 'AppBox',
    'label': '容器',
    'children': [
      {
        'id': 'AppBox_29343',
        'label': '单张图片',
        'children': [],
        'canInsertChildren': false
      },
      {
        'id': 'AppBox_76765',
        'label': '盒子组件',
        'children': [],
        'canInsertChildren': true
      },
      {
        'id': 'AppBox_53696',
        'label': '文字',
        'children': [],
        'canInsertChildren': false
      }
    ]
  }
]

console.log('start', a, b)
traverse(a, b)
console.log('end', a[ 0 ].children, b[ 0 ].children)
