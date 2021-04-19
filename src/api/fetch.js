import axios from "axios";

const fetch = axios.create({})

function setHeaders() {
  return new Promise(((resolve, reject) => {
    setTimeout(() => {
      resolve('www')
    }, 2000)
  }))
}

fetch.interceptors.request.use(async (axiosConfig) => {
  const hostId = await setHeaders()
  axiosConfig.headers.hostId = hostId
  return axiosConfig
})
