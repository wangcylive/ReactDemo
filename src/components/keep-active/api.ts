let cache = new Map()

export function fetchData(url: string) {
  if (!cache.has(url)) {
    cache.set(url, getData(url))
  }
  return cache.get(url)
}

async function getData(url: string) {
  return await getPosts(url)
  if (url) {
    return await getPosts(url)
  } else {
    throw Error('Not implemented')
  }
}

async function getPosts(params: any) {
  // Add a fake delay to make waiting noticeable.
  await new Promise(resolve => {
    setTimeout(resolve, 1000)
  })
  let posts = []
  for (let i = 0; i < 10; i++) {
    posts.push({
      id: i,
      title: 'Post #' + (i + 1),
    })
  }
  return posts
}
