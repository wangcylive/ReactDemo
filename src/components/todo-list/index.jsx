import React, { Component } from 'react'

class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      items: []
    }
  }

  changeValue = (event) => {
    this.setState({ value: event.target.value })
  }

  addTodo = () => {
    const value = this.state.value
    this.setState((prevState, props) => {
      console.log(prevState, props)
      const items = prevState.items
      items.push(value)
      return {
        items,
        value: ''
      }
    })
  }

  deleteTodo = (index, event) => {
    console.log(index, event.target)
    this.setState((prevState) => {
      const items = prevState.items
      items.splice(index, 1)
      return {
        items
      }
    })
  }

  render() {
    const items = this.state.items
    const value = this.state.value

    return (
      <div>
        <div>
          <input type="text" value={value} placeholder="请输入代办事项" onChange={this.changeValue}/>
          <button onClick={this.addTodo} disabled={ value === '' }>➕Add</button>
        </div>
        <ul>
          {
            items.map((item, index) => <li key={index}>{ item } <span key={index} onClick={ (event) => this.deleteTodo(index, event) }>❌Delete</span></li>)
          }
        </ul>
      </div>
    )
  }
}

export default TodoList
