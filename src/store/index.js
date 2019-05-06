import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import reduxThunk from 'redux-thunk'
import userInfo from './user-info'
import product from './product'

const rootReducer = combineReducers({
  userInfo,
  product
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const logger = store => next => action => {
  console.group(action.type)
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(reduxThunk, logger)
  )
)

export default store
