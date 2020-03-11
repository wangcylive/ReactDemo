import React from 'react'
import ReactDOM from 'react-dom'
import Preview from './main'

/*export interface Item {
  type: 'image' | 'video'
  url: string
  w: number
  h: number
}

export interface Props {
  items: Item[]
  index: number
}*/

function previewPhotoSwiper(args) {
  const div = document.createElement('div')
  document.body.appendChild(div)

  const unmount = () => {
    ReactDOM.unmountComponentAtNode(div)
    div.parentElement.removeChild(div)
  }
  const props = {
    unmount,
    ...args
  }

  ReactDOM.render(React.createElement(Preview, props), div)
}

export default previewPhotoSwiper
