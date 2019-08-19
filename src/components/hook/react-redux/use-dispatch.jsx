import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeName } from '@/store/user-info/action'

function ChildrenCom (props) {
  const name = useSelector(state => state.userInfo.name)
  const onChangeName = () => {
    props.changeName('child change wangcy')
  }
  return (
    <div>
      <p>child name: {name}</p>
      <button onClick={onChangeName}>change name</button>
    </div>
  )
}

function HookReactReduxUseDispatch () {
  const name = useSelector(state => state.userInfo.name)
  const dispatch = useDispatch()

  const onChangeName = () => {
    dispatch(changeName('SA'))
  }

  const childChangeName = useCallback((val) => dispatch(changeName(val)), [dispatch])

  return (
    <div>
      <p>name: {name}</p>
      <button onClick={onChangeName}>change Name</button>
      <ChildrenCom changeName={childChangeName}/>
    </div>
  )
}

export default HookReactReduxUseDispatch
