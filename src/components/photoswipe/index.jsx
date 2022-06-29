import React from 'react'
import previewPhotoSwipe from '@/components/photoswipe/lib'

const photoswipeTest = () => {
  const onClick = () => {
    previewPhotoSwipe({
      items: [
        {
          type: 'image',
          url: 'https://pushmiddle.bs2dl.yy.com/img/5e68a540801529a89fb3343c',
          w: 1200,
          h: 800
        },
        {
          type: 'image',
          url: 'https://pushmiddle.bs2dl.yy.com/img/5e68a58a801529a89fb33440',
          w: 512,
          h: 512
        },
        {
          type: 'video',
          url: 'https://www.apple.com.cn/105/media/cn/apple-watch-series-5/2019/a3cf23d2_ce87_47f5_9668_f6c325b9bb65/films/reveal/aws5-reveal-tpl-cn-2019_1280x720h.mp4',
          w: 1280,
          h: 720
        },
        {
          type: 'image',
          url: 'https://pushmiddle.bs2dl.yy.com/img/5e68a58a801529a89fb33440',
          w: 512,
          h: 512
        }
      ],
      index: 2
    })
  }
  return <div>
    <button onClick={onClick}>查看</button>
  </div>
}

export default photoswipeTest
