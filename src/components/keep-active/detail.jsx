import React, {useEffect, useLayoutEffect, useState, use} from 'react'
import {Link, useParams} from 'react-router'
import {fetchData} from './api'

function Detail(props) {
  const params = useParams()
  const [detailInfo, setDetailInfo] = useState(() => {
    // console.log('detailInfo', performance.now())
    return {
      name: 'a',
    }
  })
  // console.log('userInfo', 'start', params)
  const userInfo = use(fetchData(params.id))

  console.log('userInfo', 'end', userInfo, params)

  useEffect(() => {
    // getUserInfo(params)

    console.log('useEffect', params.id, performance.now())

    return function () {
      console.log('useEffect', 'unmount', params.id, performance.now())
    }
  }, [])

  return (
    <div>
      userInfo userId = {params.id}
      <p>use userInfo {userInfo.time}</p>
      <div>
        <Link to={`/keep-active/list`}>返回列表</Link>
      </div>
    </div>
  )
}

export default Detail
