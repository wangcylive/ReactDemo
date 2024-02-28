function getUuid() {
  if (typeof crypto === 'object' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  const str = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
  return str.replace(/[xy]/g, item => {
    const r = (Math.random() * 0x10) | 0
    const v = item === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(0x10)
  })
}

export default getUuid
