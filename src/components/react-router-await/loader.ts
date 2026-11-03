let awaitRequest = false

function loader(fn: any) {
  return async (params: any) => {
    if (!awaitRequest) {
      awaitRequest = true
      return {
        loaderData: fn(params),
      }
    } else {
      return {
        loaderData: await fn(params),
      }
    }
  }
}

export default loader
