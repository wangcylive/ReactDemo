import React, { Component, useState, useEffect } from 'react'

function useNameStatus (init) {
  const [ name, setName ] = useState(init)

  useEffect(() => {
    function bodyClick (event) {
      console.log('body click', event.target, performance.now())
    }

    document.body.addEventListener('click', bodyClick, false)

    console.log('useNameState', name)

    return function () {
      document.body.removeEventListener('click', bodyClick, false)
    }
  })

  return {
    get: name,
    set: setName
  }
}

export function ShowName1 () {
  const name = useNameStatus('wangcy')

  return (
    <div onClick={() => name.set('ww')}>{name.get}</div>
  )
}

export function ShowName2 () {
  const name = useNameStatus('wangchunyang')

  return (
    <div>{name.get}</div>
  )
}