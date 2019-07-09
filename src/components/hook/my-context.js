import React from 'react'

const MyContext = React.createContext({
  name: 'wangcy',
  time: Date.now()
})

export default MyContext
