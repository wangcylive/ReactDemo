import React, { Component } from 'react'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      key: ''
    }
  }

  onChange = (event) => {
    const key = event.target.value.trim()
    this.setState({
      key
    })
  }

  onQuery = async (event) => {
    const { key } = this.state
    const { db } = this.props

    // between
    // const collection = this.props.db.message.where('messageId').between('5c77d8a9ef31cb4d96944884', '5c77d94c0a28cbae4b8a83b4', true, false)

    // above 超过
    // const collection = await db.message.where('messageId').above(key).limit(3)
    // collection.limit(3)

    // collection.toArray()

    // aboveOrEqual 超过或等于
    // const collection = db.message.where('messageId').aboveOrEqual(key)

    // below 低于
    // const collection = db.message.where('messageId').below(key)

    // belowOfEqual 等于或等于
    const collection = db.message.where('messageId').belowOrEqual(key)

    // anyOf 任意一个匹配
    // const collection = db.message.where('messageId').anyOf(key, '5c77d9840a28cbae4b8a83b9')

    // anyOfIgnoreCase
    // const collection = db.message.where('messageId').anyOfIgnoreCase(key, '5C77D9840A28CBAE4B8A83B9')

    // equals 等于
    // const collection = db.message.where('messageId').equals(key)

    // notEqual 不等于
    // const collection = db.message.where('messageId').notEqual(key)

    // equalsIgnoreCase
    // const collection = db.message.where('messageId').equalsIgnoreCase(key)

    // inAnyRange 范围
    // const collection = db.message.where('sendTime').inAnyRange([
    //   [1551358284875, 1551358340747]
    // ])

    // noneOf
    // const collection = db.message.where('messageId').noneOf([key, '5c77d8a9ef31cb4d96944884'])

    // startsWith
    // const collection = db.message.where('messageId').startsWith(key)

    // startsWithAnyOf
    // const collection = await db.message.where('messageId').startsWithAnyOf([key, '5c77d97'])

    // startsWithAnyOfIgnoreCase
    // const collection = await db.message.where('messageId').startsWithAnyOfIgnoreCase([key, '5c77d97'])

    // startsWithIgnoreCase
    // const collection = await db.message.where('messageId').startsWithIgnoreCase(key)

    const count = await collection.count()
    console.log('collection count=%d', count, db.message)
    collection.each((item) => {
      console.log(item)
    })
  }

  render () {
    const { state } = this
    return (
      <div>
        <h4>Query message store</h4>
        <input type="text" value={state.key} onChange={this.onChange}/>
        <button type={'button'} onClick={this.onQuery}>Query Message</button>
      </div>
    )
  }
}
