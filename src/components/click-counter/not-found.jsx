import React, {Component} from 'react'

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

export default App
