import React, { useEffect, useRef } from 'react'
import { hot } from 'react-hot-loader/root'
import PhotoSwipe from 'photoswipe'
import PhotoSwipeUI_Default from './photoswipe-ui-default'
import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'
import './layout.scss'

const Preview = (props) => {
  const refEl = useRef(null)
  const refPswp = useRef(null)
  useEffect(() => {
    const pswpElement = refEl.current

    const options = {
      bgOpacity: 0.6,
      history: false,
      index: props.index
    }

    const items = props.items.map((list) => {
      const item = {}
      if (list.type === 'video') {
        Object.assign(item, {
          html: `<div class="pswp-preview-video"><video src="${list.url}" width="${list.w}" height="${list.h}" preload="metadata" controls tabindex="-1"></div>`,
        })
      } else {
        Object.assign(item, {
          src: list.url,
          w: list.w,
          h: list.h
        })
      }
      return item
    })

    const pswp = refPswp.current = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options)

    pswp.init()

    pswp.items.forEach((item, idx) => {
      if (props.items[idx].type === 'video') {
        const video = item.container?.querySelector('video')
        props.index === idx ? video?.play() : video?.pause()
      }
    })

    pswp.listen('destroy', () => {
      const videoElArr = [...refEl.current.querySelectorAll('video')]
      videoElArr.forEach((video) => {
        video.pause()
      })
      props.unmount()
    })
    //
    pswp.listen('afterChange', () => {
      console.log('pswp', pswp)
      const index = pswp.getCurrentIndex()
      pswp.items.forEach((item, idx) => {
        if (props.items[idx].type === 'video') {
          const video = item.container?.querySelector('video')
          index === idx ? video?.play() : video?.pause()
        }
      })
    })
  }, [])

  const onDownload = () => {
    console.log(refPswp.current)
  }

  return (
    <div className="pswp" tabIndex={-1} role="dialog" aria-hidden="true" ref={refEl}>
      <div className="pswp__bg"></div>

      <div className="pswp__scroll-wrap">
        <div className="pswp__container">
          <div className="pswp__item"></div>
          <div className="pswp__item"></div>
          <div className="pswp__item"></div>
        </div>

        <div className="pswp__ui pswp__ui--hidden">
          <div className="pswp__top-bar">
            <div className="pswp__counter"></div>

            <button className="pswp__button pswp__button--close" title="关闭 (Esc)"></button>
            <button className="pswp__button pswp__button--share" title="分享"></button>
            <button className="pswp__button pswp__button--fs" title="全屏"></button>
            <button className="pswp__button pswp__button--zoom" title="缩放"></button>
            <button className="pswp__button pswp__button--download" onClick={onDownload}>下载</button>
            <div className="pswp__preloader">
              <div className="pswp__preloader__icn">
                <div className="pswp__preloader__cut">
                  <div className="pswp__preloader__donut"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
            <div className="pswp__share-tooltip"></div>
          </div>

          <button className="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>

          <button className="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>

          <div className="pswp__caption">
            <div className="pswp__caption__center"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default hot(Preview)
