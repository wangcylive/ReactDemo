import {useEffect} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {hasMatchPath} from './path-utils'
function useRedirect(fromPath: string | string[], toPath: string) {
  const location = useLocation()
  const navigator = useNavigate()
  useEffect(() => {
    if (hasMatchPath(fromPath, location.pathname)) {
      navigator(toPath, {
        replace: true,
      })
    }
  }, [location.pathname, fromPath, toPath])
}

export default useRedirect
