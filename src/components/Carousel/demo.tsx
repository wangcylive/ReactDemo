import React, {useRef} from 'react'
import Carousel, {ImperativeHandle} from '@/components/Carousel'
import './demo.scss'

const Demo: React.FC = () => {
  const refCarousel = useRef<ImperativeHandle>()

  const onNext = () => {
    refCarousel.current.next()
  }
  const onPrev = () => {
    refCarousel.current.prev()
  }
  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    const value = target.valueAsNumber
    if (Number.isSafeInteger(value)) {
      console.log(value)
      refCarousel.current.goTo(value)
    }
  }

  return (
    <div className="carousel-wrap">
      <Carousel ref={refCarousel} loop={false} dots={true}>
        {Array.from({length: 4}).map((_, index) => (
          <div className={'carousel-item'} key={index}>
            {index}
          </div>
        ))}
      </Carousel>
      <button onClick={onPrev}>上一个</button>
      <button onClick={onNext}>下一个</button>
      <input type="number" onKeyPress={onKeyPress} />
    </div>
  )
}

export default Demo
