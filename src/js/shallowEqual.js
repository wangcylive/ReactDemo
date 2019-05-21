const hasOwn = Object.prototype.hasOwnProperty

function is (x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y
  } else {
    return x !== x && y !== y
  }
}

function shallowEqual (objA, objB) {
  if (is(objA, objB)) {
    return true
  }

  // 如果其中有一个不是引用类型或等于null，另一个是普通类型返回 false
  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false
  }

  const keyA = Object.keys(objA)
  const keyB = Object.keys(objB)

  if (keyA.length !== keyB.length) {
    return false
  }

  for (let i = 0; i < keyA.length; i++) {
    const key = keyA[i]
    if (!hasOwn.call(objB, key) || !is(objA[key], objB[key])) {
      return false
    }
  }
  return true
}
