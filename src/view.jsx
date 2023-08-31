import React, {useEffect} from 'react'
import state from '@/store/index'
import {Provider} from 'react-redux'
import {NavLink, RouterProvider, useRoutes, useLocation, Outlet} from 'react-router-dom'
import '@/css/index.scss'
import ErrorBoundary from '@/components/error-boundary'
import marketStore from '@/store/marketStore'
import router, {routes} from '@/router'

function View(props) {
  useEffect(() => {
    console.log('view', performance.now())
    marketStore.initInfo()
  }, [])

  return (
    <Provider store={state}>
      <RouterProvider router={router}>
        <Outlet />
      </RouterProvider>
    </Provider>
  )
}

export default View
