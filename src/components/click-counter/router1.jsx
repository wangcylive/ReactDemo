import React from 'react'
import {hot} from 'react-hot-loader/root'
import {useSearchParams} from 'react-router-dom'

function ShowSearch(props) {
  return (
    <div>
      {props.label}: {props.value}
    </div>
  )
}

const App = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const onClick = () => {
    setSearchParams({
      name: 'App品牌',
      size: 3,
      time: Date.now(),
    })
  }
  return (
    <div>
      <h3>Router1</h3>
      <button onClick={onClick}>setSearchParams</button>
      {Array.from(searchParams.entries()).map(([label, value], index) => (
        <ShowSearch label={label} value={value} key={index} />
      ))}
    </div>
  )
}

export default hot(App)
