import React, {useEffect} from 'react'

const Demo = (props) => {
  useEffect(() => {
    console.log('HHH')
  }, [])

  const onClick = () => {
    console.log(Date.now())
  }

  return <div>
    <div>React SSR</div>
    <button onClick={onClick}>onClick</button>
  </div>
}

export default Demo


