export const TYPES = {
  CHANGE_NAME: 'CHANGE_NAME'
}
export const changeName = (value) => {
  return {
    type: TYPES.CHANGE_NAME,
    value
  }
}
