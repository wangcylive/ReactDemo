import React, {useEffect} from 'react'
import {Route, Routes} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from '@/router/history'
import LoadableErrorBoundary from '@/router/splitting/loadable-error-boundary'

function RouterView(props) {
  console.log('RouterView Render', props.routes, performance.now())

  // useEffect(() => {
  //   props.routes.forEach(route => {
  //     if (route.redirect && history.location.pathname === route.path) {
  //       history.replace(route.redirect)
  //     }
  //   })
  // })

  return (
    <Routes>
      {props.routes.map((route, index) => {
        return (
          <Route
            path={route.path}
            key={index}
            element={
              <LoadableErrorBoundary>
                <route.component route={route} />
              </LoadableErrorBoundary>
            }
          />
        )
      })}
    </Routes>
  )
}

RouterView.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
      component: PropTypes.any,
      exact: PropTypes.bool,
      redirect: PropTypes.string,
      children: PropTypes.array,
    }),
  ),
}

export default RouterView
