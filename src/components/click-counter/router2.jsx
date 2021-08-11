import React, {Component, PureComponent} from 'react'
import {Routes, Route, Link, NavLink, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {changeName, asyncChangeName} from '@/store/user-info/action'

const mapStateToProp = state => {
  return {
    userInfo: state.userInfo,
  }
}

const mapDispatchToProp = dispatch => {
  return {
    onChangeName: val => dispatch(changeName(val)),
    onAsyncChangeName(val) {
      return dispatch(asyncChangeName(val))
    },
  }
}

class Info extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      count: 1,
    }
  }

  onClick = () => {
    this.setState({
      count: Math.floor(Math.random() * 1e5),
    })
  }

  render() {
    return (
      <div>
        <div>user/info</div>
        <button onClick={this.onClick}>click</button>
        <div>count: {this.state.count}</div>
        {this.props.children}
      </div>
    )
  }
}

function Edit(props) {
  return <div>user/edit</div>
}

const Router2 = () => {
  return (
    <div>
      <Routes>
        <Route path=":uid/*" element={<UserInfo />} />
        <Route path="*" element={<div>不匹配路由</div>} />
      </Routes>
    </div>
  )
}

const UserInfo = props => {
  const store = useSelector(state => ({
    userInfo: state.userInfo,
  }))
  const dispatch = useDispatch()
  const onChangeName = val => dispatch(changeName(val))
  const onAsyncChangeName = val => dispatch(asyncChangeName(val))
  const params = useParams()

  return (
    <div>
      <h3>Router user</h3>
      <div>uid:{params.uid}</div>
      <div>redux store userInfo name: {store?.userInfo?.name}</div>
      <div>
        <button type={'button'} onClick={() => onChangeName(Math.random())}>
          Change store name
        </button>
        <button type={'button'} onClick={() => onAsyncChangeName('wangchunyang')}>
          async change store name
        </button>
      </div>
      <NavLink to={'info'} activeClassName={'active'}>
        info1
      </NavLink>{' '}
      | &nbsp;
      <NavLink to={'edit'} activeClassName={'active'}>
        edit
      </NavLink>
      <hr />
      <Routes>
        <Route path={'info'} element={<Info />} />
        <Route path={'edit'} element={<Edit />} />
      </Routes>
    </div>
  )
}

export default Router2
