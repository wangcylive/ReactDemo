import React, { Component } from 'react'

export default class App extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        <h3>Router user</h3>
        <div>uid:{this.props.match.params.uid}</div>
      </div>
    )
  }
}
