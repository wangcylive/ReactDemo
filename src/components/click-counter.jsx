import React, { Component } from 'react'

function ShowName (props) {
  return (
    <div>{props.name}</div>
  )
}

export default class ClickCounter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      count: 0
    }
  }

  get countText () {
    return 'this is computed:' + this.state.count
  }

  onClickAdd = () => {
    console.log(6)
    this.setState((state) => {
      return {
        count: state.count + 1
      }
    }, () => {
      console.log('onClickAdd callback', this.state.count, performance.now())
    })

    console.log('onClickAdd', this.state.count, performance.now())
  }

  onClickMinus = () => {
    this.setState((state) => {
      return {
        count: state.count - 1
      }
    })
  }

  componentDidUpdate (prevProp, prevState, snapshot) {
    console.log('componentDidUpdate', prevProp, prevState, snapshot)
  }

  render () {
    const buttonStyle = {
      width: '80px',
      height: '30px',
      margin: '0 5px'
    }

    return (
      <div>
        <button onClick={this.onClickAdd} style={buttonStyle}>Add</button>
        <button onClick={this.onClickMinus} style={buttonStyle}>Minus</button>
        <p>Click Count: {this.state.count}</p>
        <p>{this.countText}</p>
        <ShowName name="3333"/>
      </div>
    )
  }
}
