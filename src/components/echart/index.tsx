import React, {useEffect, useRef} from 'react'
import styled from 'styled-components'
import * as echarts from 'echarts'

import getGauge from '@/components/echart/gauge'
import {option1} from './test'

const Div1 = styled.div`
  width: 300px;
  height: 127px;
  background-color: #4a4f5d;
`

const Div2 = styled.div`
  width: 400px;
  height: 400px;
`

const EchartsDemo: React.FC = () => {
  const refDiv1 = useRef<HTMLDivElement>()
  const refDiv2 = useRef<HTMLDivElement>()
  useEffect(() => {
    const el = refDiv1.current
    const myChart = echarts.init(el, null, {
      width: 200,
      height: 200,
    })
    myChart.setOption(getGauge(20))

    let intervalID = -1

    intervalID = window.setInterval(() => {
      myChart.setOption(getGauge(Math.floor(Math.random() * 100)))
    }, 2000)

    return () => {
      window.clearInterval(intervalID)
    }
  }, [])

  useEffect(() => {
    const el = refDiv2.current
    const myChart = echarts.init(el)
    myChart.setOption(option1)
  }, [])

  return (
    <div>
      <Div1 ref={refDiv1} />
      <Div2 ref={refDiv2} />
    </div>
  )
}

export default EchartsDemo
