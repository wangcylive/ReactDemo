import React, { Component, PureComponent } from 'react'
import { hot } from 'react-hot-loader/root'
import { Switch, Route, Link, NavLink } from 'react-router-dom'
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

class Info extends PureComponent {
  constructor (props) {
    super(props)

    this.state ={
      count: 1
    }
  }

  onClick = () => {
    this.setState({
      count: Math.floor(Math.random() * 1e5)
    })
  }

  render () {
    return (
      <div>
        <div>user/info</div>
        <button onClick={this.onClick}>click</button>
        <div>count: {this.state.count}</div>
        {
          this.props.children
        }
      </div>
    )
  }
}

function Edit (props) {
  return (
    <div>user/edit</div>
  )
}

class ClickCounterRouter2 extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    console.log('router2 mount', performance.now())
  }

  render () {
    console.log('ClickCounterRouter2 render', performance.now())
    return (
      <div>
        <h3>Router user</h3>
        <div>uid:{this.props.match.params.uid}</div>
        <div>redux store userInfo name: {this.props.userInfo.name}</div>
        <div>
          <button type={"button"} onClick={() => this.props.onChangeName(Math.random())} >Change store name</button>
          <button type={"button"} onClick={() => this.props.onAsyncChangeName('wangchunyang')}>async change store name</button>
        </div>

        <NavLink to={"/click-counter/user/info"} activeClassName={"active"}>info</NavLink>
        <NavLink to={"/click-counter/user/edit"} activeClassName={"active"}>edit</NavLink>

        <hr/>

        <Switch>
          <Route path={"/click-counter/user/info"} render={() => <Info/>}/>
          <Route path={"/click-counter/user/edit"} render={(props) => <Edit props={props}/>}/>
        </Switch>
      </div>
    )
  }
}

export default hot(connect(
  mapStateToProp,
  mapDispatchToProp
)(ClickCounterRouter2))
