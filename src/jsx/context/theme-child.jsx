import React, { Component } from 'react'
import { ThemeContext } from './theme-context'

console.log('ThemeContext', ThemeContext)

class ThemedButtonChild extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  render () {
    return (
      <div>
        <p>ThemedButtonChild <span>{this.context.name}</span></p>
      </div>
    )
  }
}

ThemedButtonChild.contextType = ThemeContext

export default ThemedButtonChild
