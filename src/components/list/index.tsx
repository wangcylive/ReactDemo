import React, {useEffect, useMemo, useState} from 'react'
import List from './list'
import {Outlet, useLocation, redirect, useNavigate, useResolvedPath, Navigate, useOutlet} from 'react-router-dom'
import useRedirect from './useRedirect'
import RouteAlive from '@/components/list/route-alive'

const ListDemo: React.FC = () => {
  const [scrollRestoration, setScrollRestoration] = useState<string>(history.scrollRestoration)
  const path = useLocation()
  const a = useOutlet()
  const navigator = useNavigate()
  useRedirect('/listdemo', '/listdemo/list')
  console.log('ListDemo path', path, a)

  const onChangeScrollRestoration = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    const value = event.target.value as ScrollRestoration
    setScrollRestoration(value)
    history.scrollRestoration = value
  }

  return (
    <div>
      <h3>RouteAlive 保持组件激活、路由切换不销毁</h3>
      <p>
        <code>RouteAlive</code> 组件利用 <code>display: none</code> 隐藏组件，实现列表跳转详情，列表保持激活
      </p>
      <p>
        <code>history.scrollRestoration</code> 允许 web 应用程序在历史导航上显式地设置默认滚动恢复行为。
        <code>auto</code>将恢复用户已滚动到的页面上的位置。<code>manual</code>
        未还原页上的位置。用户必须手动滚动到该位置。
      </p>
      <label>
        <input
          type={'radio'}
          name={'scroll'}
          value={'auto'}
          checked={scrollRestoration === 'auto'}
          onChange={onChangeScrollRestoration}
        />
        auto
      </label>
      <label>
        <input
          type={'radio'}
          name={'scroll'}
          value={'manual'}
          checked={scrollRestoration === 'manual'}
          onChange={onChangeScrollRestoration}
        />
        manual
      </label>
      <hr />
      <RouteAlive path={'/listdemo/list/'} scrollEl={document.documentElement}>
        <List />
        窗前明月光
      </RouteAlive>
      <Outlet />
    </div>
  )
}

export default ListDemo
