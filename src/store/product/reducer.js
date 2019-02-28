import { TYPES } from './action'

const init = {
  product: []
}

export default (state = init, action) => {
  const { value } = action

  switch (action.type) {
    case TYPES.PUSH:
      return {
        ...state,
        product: [...state.product, value]
      }
    default:
      return state
  }
}
