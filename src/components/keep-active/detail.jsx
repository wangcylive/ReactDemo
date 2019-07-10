import React, { Component, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Detail (props) {
  useEffect(() => {
    console.log('update', props.match.params.id)

    return function () {
      console.log('unmount', props.match.params.id)
    }
  })

  return (
    <div>
      userInfo userId { props.match.params.id }

      <div><Link to={`/keep-active`}>返回列表</Link></div>
    </div>
  )
}

export default Detail
