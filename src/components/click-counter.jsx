import React, { Component } from 'react'

export default class ClickCounter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }

  onClickAdd = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  onClickMinus = () => {
    this.setState ((prevState) => {
      return {
        count: prevState.count - 1
      }
    })
  }

  render () {
    const buttonStyle = {
      width: '80px',
      height: '30px',
      margin: '0 5px'
    }

    return (
      <div>
        <button onClick={ this.onClickAdd } style={ buttonStyle }>Add</button>
        <button onClick={ this.onClickMinus } style={ buttonStyle }>Minus</button>
        <p>Click Count: { this.state.count }</p>
      </div>
    )
  }
}
