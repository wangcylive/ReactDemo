import * as ActionTypes from './ActionTypes'

export default (state, action) => {
  const { counterCaption } = action

  console.log(state, action)

  switch (action.type) {
    case ActionTypes.INCREMENT:
      return {
        ...state,
        [counterCaption]: ++state[counterCaption]
      }
    case ActionTypes.DECREMENT:
      return {
        ...state,
        [counterCaption]: --state[counterCaption]
      }
    default:
      return state
  }
}
