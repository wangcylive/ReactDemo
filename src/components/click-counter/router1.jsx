import React, { Component } from 'react'

function ShowSearch (props) {
  return (
    <div>{props.label}: {props.value}</div>
  )
}

export default class App extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const urlSearch = new URLSearchParams(this.props.location.search)

    return (
      <div>
        <h3>Router1</h3>
        {
          Array.from(urlSearch.entries()).map(([label, value], index) => (<ShowSearch {...this.props} label={label} value={value} key={index}/>))
        }
      </div>
    )
  }
}
