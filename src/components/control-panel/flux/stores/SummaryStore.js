import AppDispatcher from '../AppDispatcher'
import { EventEmitter } from 'events'
import CounterStore from './CounterStore'
import * as ActionTypes from '../ActionTypes'

function computeSummary(counterValue) {
  return Object.values(counterValue).reduce((a, b) => a + b)
}

const CHANGE_EVENT = 'changed'

const SummaryStore = Object.assign({}, EventEmitter.prototype, {
  getSummary () {
    return computeSummary(CounterStore.getCounterValues())
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

SummaryStore.dispatchToken = AppDispatcher.register((action) => {
  if (ActionTypes.INCREMENT === action.type || ActionTypes.DECREMENT === action.type) {
    AppDispatcher.waitFor([CounterStore.dispathToken])

    SummaryStore.emitChange()
  }
})

export default SummaryStore
