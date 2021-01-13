import React, { useEffect } from 'react'
import { hot } from 'react-hot-loader/root'

const NotificationDemo = () => {
  useEffect(() => {

  }, [])

  const onClick = () => {
    window.fetch('http://localhost:13000/email', {
      method: 'POST'
    }).then((res) => {
      console.log(res)
    })
  }


  return <div>
    <button onClick={onClick}>发送邮件</button>
  </div>
}

export default hot(NotificationDemo)
