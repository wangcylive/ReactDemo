const typeMap = new Map()
function workerInterval(mapId) {
  let count = 0
  const id = setInterval(() => {
    console.log('worker', ++count)
  }, 1000)

  typeMap.set(mapId, id)
}

async function workerFetch(url) {
  const res = await fetch(url)
  if (res.ok) {
    const type = res.headers.get('Content-Type')
    console.log(res, type)
    if (type.startsWith('text/plain')) {
      return await res.text()
    } else if (type.startsWith('image/')) {
      return await res.blob()
    }
  }
}

function workerClearInterval(mapId) {
  clearInterval(typeMap.get(mapId))
  typeMap.delete(mapId)
}

self.onmessage = msg => {
  console.log('webWorker', msg, self)
  const {type, payload} = msg.data

  if (type === 'setInterval') {
    workerInterval(payload)
  } else if (type === 'clearInterval') {
    workerClearInterval(payload)
  } else if (type === 'fetch') {
    workerFetch(payload).then(res => {
      self.postMessage({
        type: 'fetch',
        payload: res,
      })
    })
  }
}
