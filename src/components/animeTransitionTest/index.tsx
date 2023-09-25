import React, {useState} from 'react'
import AnimeTransition from '@/components/animeTransition'
import styled from 'styled-components'

const Page1 = styled.div`
  height: 100vh;
  background-color: #fff;

  > div {
    padding: 10px;
  }
`

const AnimeTransitionTest: React.FC = () => {
  const [visible1, setVisible1] = useState<boolean>(false)
  const [visible2, setVisible2] = useState<boolean>(false)
  return (
    <div>
      <button onClick={() => setVisible1(true)}>页面1</button>
      <button onClick={() => setVisible2(true)}>页面2</button>

      <AnimeTransition visible={visible1}>
        <Page1>
          <div>
            <h3>页面1</h3>
            <p>page</p>
            <button onClick={() => setVisible1(false)}>关闭</button>
          </div>
        </Page1>
      </AnimeTransition>

      <AnimeTransition living={true} visible={visible2} position={'bottom'}>
        <Page1>
          <div>
            <h3>页面2</h3>
            <p>page</p>
            <button onClick={() => setVisible2(false)}>关闭</button>
          </div>
        </Page1>
      </AnimeTransition>
    </div>
  )
}

export default AnimeTransitionTest
