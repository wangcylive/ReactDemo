import React, {useEffect} from 'react'

/**
 * demo 地址
 * https://font-access-api.glitch.me/
 * @constructor
 */

const Fonts: React.FC = () => {
  useEffect(() => {
    document.fonts.ready.then(fontFaceSet => {
      const fontFaces = [...fontFaceSet]
      console.log('', fontFaceSet, fontFaces)
    })
  }, [])

  const onClick = async () => {
    const status = await navigator.permissions.query({
      name: 'local-fonts',
    })

    console.log(status)
  }

  return (
    <div>
      <button onClick={onClick}>click</button>
    </div>
  )
}

export default Fonts
