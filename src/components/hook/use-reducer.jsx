import React, {useCallback, useEffect, useMemo, useReducer} from 'react'

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'
}

function wrapperDispatch(dispatch) {
  return function (action) {
    if (isPromise(action)) {
      return action.then(res => {
        dispatch(res)
        return res.payload
      })
    } else {
      dispatch(action)
      return Promise.resolve(action.payload)
    }
  }
}

function init({count, name}) {
  return {
    count: count * 10,
    name,
  }
}

const initialState = {
  count: 1,
  name: 'WA',
}

const SET_COUNT = 'SET_COUNT'
function setCount(count, rootState) {
  return {
    type: SET_COUNT,
    payload: rootState.count + count,
  }
}

const ASYNC_SET_COUNT = 'ASYNC_SET_COUNT'
async function asyncSetCount(count, rootState) {
  const value = await new Promise(resolve => {
    setTimeout(() => {
      resolve(rootState.count + count)
    }, 1000)
  })

  return {
    type: ASYNC_SET_COUNT,
    payload: value,
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {
        ...state,
        count: state.count + 1,
      }
    case 'decrement':
      return {
        ...state,
        count: state.count - 1,
      }
    case SET_COUNT:
      return {
        ...state,
        count: action.payload,
      }
    case ASYNC_SET_COUNT:
      return {
        ...state,
        count: action.payload,
      }
    default:
      return state
  }
}

function HookUserReducer(props) {
  const [state, dispatch] = useReducer(reducer, initialState, init)
  const withDispatch = useCallback(wrapperDispatch(dispatch), [])

  return (
    <div>
      <div>
        Count: {state.count}, name: {state.name}
      </div>
      <button onClick={() => dispatch({type: 'increment'})}>Increment</button>
      <button onClick={() => dispatch({type: 'decrement'})}>Decrement</button>

      <hr />

      <Demo1 state={state} dispatch={withDispatch} />
    </div>
  )
}

function Demo1(props) {
  const onAsyncSet = payload => {
    props.dispatch(asyncSetCount(payload, props.state)).then(res => {
      console.log('done', res)
    })
  }
  useEffect(() => {
    console.log('useEffect dispatch')
  }, [props.dispatch])
  return (
    <div>
      <div>Count: {props.state.count}</div>
      <button onClick={() => props.dispatch(setCount(10, props.state))}>sync +10</button>
      <button onClick={() => onAsyncSet(-10)}>async -10</button>
    </div>
  )
}

export default HookUserReducer
