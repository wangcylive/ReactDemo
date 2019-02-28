import { TYPES } from './action'

const init = {
  name: 'wangcy'
}

export default (state = init, action) => {
  const { value } = action
  switch (action.type) {
    case TYPES.CHANGE_NAME:
      return {
        ...state,
        name: value
      }
    default:
      return state
  }
}
