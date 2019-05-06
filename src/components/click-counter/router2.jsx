import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeName, asyncChangeName } from '@/store/user-info/action'

const mapStateToProp = state => {
  return {
    userInfo: state.userInfo
  }
}

const mapDispatchToProp = dispatch => {
  return {
    onChangeName: (val) => dispatch(changeName(val)),
    onAsyncChangeName (val) {
      return dispatch(asyncChangeName(val))
    }
  }
}

class ClickCounterRouter2 extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    console.log('router2 mount', performance.now())
  }

  render () {
    return (
      <div>
        <h3>Router user</h3>
        <div>uid:{this.props.match.params.uid}</div>
        <div>redux store userInfo name: {this.props.userInfo.name}</div>
        <div>
          <button type={"button"} onClick={() => this.props.onChangeName(Math.random())} >Change store name</button>
          <button type={"button"} onClick={() => this.props.onAsyncChangeName('wangchunyang')}>async change store name</button>
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProp,
  mapDispatchToProp
)(ClickCounterRouter2)
