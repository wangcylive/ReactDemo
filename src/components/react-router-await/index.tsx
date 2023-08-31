import React, {ComponentClass, createElement, FunctionComponent, useEffect} from 'react'
import {Await, useAsyncError, useLoaderData, useRouteError, redirect, useNavigate} from 'react-router-dom'

export const AwaitError: React.FC = () => {
  const navigate = useNavigate()
  const routeError = useRouteError()
  const asyncError = useAsyncError()
  console.log('error', routeError, asyncError)

  useEffect(() => {
    if (routeError) {
      navigate(-1)
    }
  }, [routeError])

  return (
    <div>
      {routeError && (
        <div>
          routeError: <code>{JSON.stringify(routeError)}</code>
        </div>
      )}
      {asyncError && (
        <div>
          asyncError: <code>{JSON.stringify(asyncError)}</code>
        </div>
      )}
    </div>
  )
}

export const ReactRouterAwait: React.FC<React.PropsWithChildren<any>> = props => {
  const data: any = useLoaderData()
  console.log('ReactRouterAwait data', data)
  return (
    <React.Suspense fallback={<p>Loading package location...</p>}>
      <Await resolve={data.loaderData} errorElement={<AwaitError />}>
        {loaderData => React.cloneElement(props.children, {loaderData})}
      </Await>
    </React.Suspense>
  )
}

function reactRouterAwaitHoc<P>(component: FunctionComponent<P> | ComponentClass<P> | string) {
  return () => <ReactRouterAwait>{createElement(component)}</ReactRouterAwait>
}

export default reactRouterAwaitHoc
