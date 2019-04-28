import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeName } from '@/store/user-info/action'

class App extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        <h3>Router user</h3>
        <div>uid:{this.props.match.params.uid}</div>
        <div>redux store userInfo name: {this.props.userInfo.name}</div>
        <div>
          <button type={"button"} onClick={() => this.props.onChangeName(Math.random())} >Change store name</button>
        </div>
      </div>
    )
  }
}

export default connect(
  state => {
    return {
      userInfo: state.userInfo
    }
  },
  dispatch => {
    return {
      onChangeName (val) {
        dispatch(changeName(val))
      }
    }
  }
)(App)
