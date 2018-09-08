import { EventEmitter } from 'events'
import AppDispatcher from '../AppDispatcher'
import * as ActionTypes from '../ActionTypes'

const CHANGE_EVENT = 'changed';

const counterValues = {
  'First': 0,
  'Second': 10,
  'Third': 30
}

const CounterStore = Object.assign({}, EventEmitter.prototype, {
  getCounterValues () {
    return counterValues
  },
  emitChange () {
    this.emit(CHANGE_EVENT)
  },
  addChangeListener (callback) {
    this.on(CHANGE_EVENT, callback)
  },
  removeChangeListener (callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }
})

CounterStore.dispathToken = AppDispatcher.register((action) => {
  console.log(action)
  if (action.type === ActionTypes.INCREMENT) {
    counterValues[action.counterCaption]++
    CounterStore.emitChange()
  } else if (action.type === ActionTypes.DECREMENT) {
    counterValues[action.counterCaption]--
    CounterStore.emitChange()
  }
})

export default CounterStore
