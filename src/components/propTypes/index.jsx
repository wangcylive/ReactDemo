import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Message {}

function ShowList () {
  return (
    <div/>
  )
}

const ElementDiv = React.createElement('div', null, 'Hello React')
const element = <h1>Hello World.</h1>

export default class App extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const props = {
      string: '1',
      number: 1e5,
      array: [],
      object: {name: 'w'},
      bool: true,
      symbol: Symbol(),
      func: () => {},
      node: ElementDiv,
      element: element,
      instanceOf: new Message(),
      regExp: /\w+/,
      textAlign: 'center',
      union: '0',
      objectOf: {width: 1, height: 2},
      arrayOf: [1, 2, 3],
      arrayOfUnion: [1, '1', 2, '3'],
      font: {
        fontSize: 10,
        color: '#f00',
        fontWeight: 400
      },
      arrayOfShape: [{name: 'A'}, {name: {}}, {name: 1}],
      any: Infinity,
      customProp: [1, 2, 3, 4]
    }

    return (
      <div>
        <h3>PropTypes test</h3>
        <ChildComponent {...props}/>
      </div>
    )
  }
}

class ChildComponent extends Component {
  constructor (props) {
    super(props)
    console.log('props any', props.any)
  }

  render () {
    return (
      <div>Children</div>
    )
  }
}

ChildComponent.propTypes = {
  string: PropTypes.string.isRequired, // 字符串，必须
  number: PropTypes.number, // 数字
  array: PropTypes.array, // 数组
  object: PropTypes.object, // 对象
  bool: PropTypes.bool, // 布尔
  symbol: PropTypes.symbol, // symbol
  func: PropTypes.func, // function
  node: PropTypes.node, // 任何可被渲染的元素（包括数字、字符串、元素或数组）
  element: PropTypes.element, // react 元素
  instanceOf: PropTypes.instanceOf(Message), // 类的实例
  regExp: PropTypes.instanceOf(RegExp), // 类的实例
  textAlign: PropTypes.oneOf(['left', 'right', 'center']), // 枚举
  union: PropTypes.oneOfType([ // 类型集合
    PropTypes.string,
    PropTypes.bool
  ]),
  objectOf: PropTypes.objectOf(PropTypes.number),
  arrayOf: PropTypes.arrayOf(PropTypes.number), // 数组由某一类型元素组成
  arrayOfUnion: PropTypes.arrayOf(PropTypes.oneOfType([ // 数组由指定类型元素组成
    PropTypes.string,
    PropTypes.number
  ])),
  arrayOfShape: PropTypes.arrayOf(PropTypes.shape({ // 数组由包含特定类型对象组成
    name: PropTypes.any.isRequired
  })),
  font: PropTypes.shape({ // 对象由特定类型组成
    fontSize: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
  }),
  any: PropTypes.any.isRequired, // 任意类型
  customProp: function (props, propName, componentName) {
    if (Array.isArray(props[propName]) && props[propName].length < 3) {
      return new Error(`propName isArray length must than 3`)
    }
    console.log('customProp', props, propName, componentName)
  }
}
