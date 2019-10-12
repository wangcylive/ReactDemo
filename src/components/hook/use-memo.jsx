import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { hot } from 'react-hot-loader/root'

function HookUseMemo (props) {
  const [ name, setName ] = useState('')
  const [ age, setAge ] = useState('')
  const [ page, setPage ] = useState(0)
  const [ status, setStatus ] = useState('')
  const [ searchCount, setSearchCount ] = useState(0)

  const request = (page, status) => {
    console.log('request', page, status)
  }

  // useEffect(() => {
  //   request()
  // }, [ page, searchCount ])

  const onPageChange = () => {
    const newPage = page + 1
    setPage(newPage)

    request(newPage, status)
  }

  const onSearch = () => {
    setPage(1)
    request(1, status)
  }

  const userInfo = useMemo(() => {
    return `name: ${name}, age: ${age}`
  }, [ name, age ])

  const onClick = useCallback(() => {
    console.log('callback', name, age)
  }, [ name ])

  return (
    <div>
      <input value={name} placeholder="enter name" onChange={e => setName(e.target.value)}/>
      <input type="number" value={age} onChange={e => setAge(e.target.valueAsNumber)} placeholder="enter age"/>
      <p><span>name: {name}</span> <span>age: {age}</span></p>
      <p><strong>userMemo</strong> user info: {userInfo}</p>
      <p>
        <button onClick={onClick}>useCallback click</button>
      </p>
      <div>
        <hr/>
        <p><input type="text" value={status} onChange={(e) => setStatus(e.target.value)}/>
          <button onClick={onSearch}>Search</button>
        </p>
        <p>
          <button onClick={onPageChange}>分页 {page}</button>
        </p>
      </div>
    </div>
  )
}

export default hot(HookUseMemo)
