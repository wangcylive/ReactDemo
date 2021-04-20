import React, {Component} from 'react'
import {hot} from 'react-hot-loader/root'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h2>not found</h2>
        <div>{this.props?.location?.pathname}</div>
      </div>
    )
  }
}

export default hot(App)
