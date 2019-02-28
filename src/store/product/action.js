export const TYPES = {
  PUSH: 'PUSH'
}

export const push = (value) => {
  return {
    type: TYPES.PUSH,
    value
  }
}

