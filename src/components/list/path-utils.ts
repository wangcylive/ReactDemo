// 删除 path 最后一位
export const formatPath = (path: string) => {
  return path.replace(/(?<=\/.*)(\/)+$/, '')
}

/**
 * 是否有路径匹配
 * @param path 要匹配的路径、sting 或 array
 * @param currentPath 当前路径
 */
export const hasMatchPath = (path: string | string[], currentPath: string): boolean => {
  const paths = []
  if (typeof path === 'string') {
    paths.push(path)
  } else if (Array.isArray(path)) {
    paths.push(...path)
  }
  return paths.map(path => formatPath(path)).includes(formatPath(currentPath))
}
