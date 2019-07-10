import React, { Component, useEffect } from 'react'

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
    </div>
  )
}

export default Detail
