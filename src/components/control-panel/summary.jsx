import React, { Component } from 'react'
import SummaryStore from './flux/stores/SummaryStore'
import store from './redux/store'

export default class Summary extends Component {
  constructor(props) {
    super(props)

    this.state = this.getOwnState()
  }

  getOwnState () {
    const state = store.getState()

    let sum = 0
    for (let x of Object.values(state)) {
      sum += x
    }

    return {
      sum
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return nextState.sum !== this.state.sum
  }

  componentDidMount () {
    // SummaryStore.addChangeListener(this.onUpdate)
    this._unsubscribe = store.subscribe(this.onUpdate)
  }

  componentWillUnmount () {
    // SummaryStore.removeChangeListener(this.onUpdate)
    this._unsubscribe()
  }

  onUpdate = () => {
    // this.setState({
    //   sum: SummaryStore.getSummary()
    // })

    this.setState(this.getOwnState())
  }

  render () {
    return (
      <div>
        Total Count: { this.state.sum }
      </div>
    )
  }
}
