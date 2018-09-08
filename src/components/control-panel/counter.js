import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import CounterStore from './flux/stores/CounterStore'
// import * as Actions from './flux/Actions'
import store from './redux/store'
import * as Actions from './redux/Actions'

console.log(store)

export default class Counter extends Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   count: CounterStore.getCounterValues()[props.caption]
    // }
    console.log('Counter constructor', this.props.caption)

    this.state = this.getOwnState()
  }

  getOwnState () {
    return {
      count: store.getState()[this.props.caption]
    }
  }

  onChange = () => {
    // const newCount = CounterStore.getCounterValues()[this.props.caption]
    // this.setState({
    //   count: newCount
    // })

    this.setState(this.getOwnState())
  }

  onClickAdd = () => {
    // const prevCount = this.state.count
    // this.setState({
    //   count: prevCount + 1
    // })
    //
    // this.props.onUpdate(prevCount + 1, prevCount)

    // Actions.increment(this.props.caption)
    store.dispatch(Actions.increment(this.props.caption))
  }

  onClickMinus = () => {
    // const prevCount = this.state.count
    // this.setState((prevState, props) => {
    //   return {
    //     count: prevState.count - 1
    //   }
    // })
    // this.props.onUpdate(prevCount - 1, prevCount)

    // Actions.decrement(this.props.caption)
    store.dispatch(Actions.decrement(this.props.caption))
  }

  // componentWillMount () {
  //   console.log('Counter componentWillMount', this.props.caption)
  // }

  shouldComponentUpdate (nextProps, nextState) {
    return nextProps.caption !== this.props.caption || nextState.count !== this.state.count
  }

  // componentWillUpdate (nextProps, nextState) {
  //   console.log('Counter componentWillUpdate', nextProps.caption, nextState.count)
  // }
  // UNSAFE_componentWillUpdate (nextProps, nextState) {
  //   console.log('Counter UNSAFE_componentWillUpdate', nextProps.caption, nextState.count)
  // }

  render () {
    const btnStyle = {
      width: '40px',
      height: '20px',
      margin: '0 2px'
    }

    console.log('Counter render', this.props.caption)

    return (
      <div style={ { margin: '5px 0' } }>
        <button onClick={ this.onClickAdd } style={ btnStyle }>+</button>
        <button onClick={ this.onClickMinus } style={ btnStyle }>-</button>
        { this.props.caption } Counter: { this.state.count }
      </div>
    )
  }

  componentDidUpdate (prevProps, prevState) {
    console.log('Counter componentDidUpdate', prevProps.caption, prevState.count)
  }

  componentDidMount () {
    console.log('Counter componentDidMount', this.props.caption)
    // CounterStore.addChangeListener(this.onChange)
    this._unsubscribe = store.subscribe(this.onChange)
  }

  // componentWillReceiveProps (nextProps) {
  //   console.log('Counter componentWillReceiveProps', nextProps.caption)
  // }
  //
  // UNSAFE_componentWillReceiveProps (nextProps) {
  //   console.log('Counter UNSAFE_componentWillReceiveProps', nextProps.caption)
  // }

  static getDerivedStateFromProps (nextProps, prevState) {
    console.log('Counter getDerivedStateFromProps', nextProps, prevState)
    return {
      ...nextProps
    }
  }

  componentWillUnmount () {
    console.log('Counter componentWillUnmount')
    // CounterStore.removeChangeListener(this.onChange)
    this._unsubscribe()
  }
}

Counter.propTypes = {
  caption: PropTypes.string.isRequired,
  initValue: PropTypes.number,
  onUpdate: PropTypes.func.isRequired
}

Counter.defaultProps = {
  initValue: 0,
  onUpdate: f => f
}
