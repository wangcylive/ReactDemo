import React from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { createSelector } from 'reselect'
import { changeName } from '@/store/user-info/action'

function HookReactReduxUseSelector () {
  const userName = useSelector(state => state.userInfo.name)
  const userNameLength = useSelector(createSelector(
    state => state.userInfo.name,
    name => name.length
  ))
  const dispatch = useDispatch()

  const onChangeName = () => {
    dispatch(changeName('wangcy'))
  }

  console.log('render', performance.now())
  return (
    <div>
      <p>use selector: {userName}, name length: { userNameLength }</p>
      <button onClick={onChangeName}>change name</button>
    </div>
  )
}

export default HookReactReduxUseSelector
