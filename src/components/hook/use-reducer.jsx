import React, { useReducer } from 'react'
import { hot } from 'react-hot-loader/root'

function init ({ count, name }) {
  return {
    count: count * 10,
    name
  }
}

const initialState = {
  count: 0,
  name: 'wa'
}

function reducer (state, action) {
  switch (action.type) {
    case 'increment':
      return {
        ...state,
        count: state.count + 1
      }
    case 'decrement':
      return {
        ...state,
        count: state.count - 1
      }
    case 'set':
      return {
        ...state,
        count: action.payload
      }
    default:
      throw new Error('not action')
  }
}

function HookUserReducer (props) {
  const [ state, dispatch ] = useReducer(reducer, { count: -1, name: 'SA' }, init)

  return (
    <div>
      <div>Count: {state.count}, name: {state.name}</div>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>

      <hr/>

      <Demo1 state={state} dispatch={dispatch}/>
    </div>
  )
}

function Demo1 (props) {
  return (
    <div>
      <div>Count: {props.state.count}</div>
      <button onClick={() => props.dispatch({ type: 'set', payload: 100 })}>Set</button>
    </div>
  )
}

export default hot(HookUserReducer)
