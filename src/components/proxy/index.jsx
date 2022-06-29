import React from 'react'

const target = {}

const proxy = new Proxy(target, {
  get (target, p, receiver) {
    return Reflect.get(target, p, receiver)
  },
  set (target, p, value, receiver) {
    console.log('set', p, value)
    return Reflect.set(target, p, value, receiver)
  }
})

console.log(proxy, target)

const ProxyDemo = () => {
  return (
    <div>proxy</div>
  )
}

export default ProxyDemo
