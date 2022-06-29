import React, { Component } from 'react'

import Counter from './counter'
import Summary from './summary'

class ControlPanel extends Component {
  constructor (props) {
    super(props)
    this.initValue = [ 0, 20, 30 ]
    const initSum = this.initValue.reduce((a, b) => a + b)
    this.state = {
      sum: initSum
    }
    console.log('ControlPanel constructor', this.props)
  }

  componentWillMount (args) {
    console.log('ControlPanel componentWillMount', this, args)
  }

  onCounterUpdate = (newValue, prevValue) => {
    const valueChange = newValue - prevValue
    this.setState({
      sum: this.state.sum + valueChange
    })
  }

  render () {
    console.log('ControlPanel render', this.props, this.state)
    const initValue = this.initValue

    return (
      <div>
        <Counter caption="First" onUpdate={this.onCounterUpdate}/>
        <Counter caption="Second" onUpdate={this.onCounterUpdate}/>
        <Counter caption="Third" onUpdate={this.onCounterUpdate}/>
        <div>
          <button onClick={() => this.forceUpdate()}>Click me to repaint.</button>
        </div>

        <Summary/>
      </div>
    )
  }

  componentDidMount (args) {
    console.log('ControlPanel componentDidMount', this, args)
  }
}

export default ControlPanel
