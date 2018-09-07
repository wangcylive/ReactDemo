import { createStore } from 'redux'
import reducer from './reducer'

const initValues = {
  'First': 0,
  'Second': 10,
  'Third': 30
}

const store = createStore(reducer, initValues)

export default store
