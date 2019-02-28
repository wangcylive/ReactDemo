import { combineReducers, createStore } from 'redux'
import userInfo from './user-info'
import product from './product'

const rootReducer = combineReducers({
  userInfo,
  product
})

const store = createStore(rootReducer)

export default store
