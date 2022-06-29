import React, { useReducer } from 'react'
import { useStore, useDispatch } from 'react-redux'
import { changeName } from '@/store/user-info/action'

function HookReactReduxUseStore () {
  const [ ignored, forceUpdate ] = useReducer(x => x + 1, 0)
  const store = useStore()
  const dispatch = useDispatch()

  const onChangeName = () => {
    dispatch(changeName('hook wangcy ' + Date.now()))
    forceUpdate()
  }

  return (
    <div>
      <p>store name: {store.getState().userInfo.name}</p>
      <button onClick={onChangeName}>change name</button>
    </div>
  )
}

export default HookReactReduxUseStore
