import {defer} from 'react-router-dom'

let awaitRequest = false

function loader(fn: any) {
  return async (params: any) => {
    if (!awaitRequest) {
      awaitRequest = true
      return defer({
        loaderData: fn(params),
      })
    } else {
      return defer({
        loaderData: await fn(params),
      })
    }
  }
}

export default loader
