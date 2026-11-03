import React, {useEffect} from 'react'
import styled from 'styled-components'
import Photoswipe from '@/components/photoswipe'

const Page = styled.div`
  width: 100vw;
  height: 100vh;

  .main {
    margin: 70px 0 0 244px;
    height: 600px;
    background-color: hsla(0, 0%, 0%, 0.2);
    pointer-events: auto;
  }
`

const TestIframe: React.FC = () => {
  useEffect(() => {
    const fn = async () => {
      const res = await window.fetch(
        'https://zhuiya-test.yy.com/admin-web/skill/comment/commentList?app=yomi&commentUid=&masterUid=&skillId=&auditResult=&status=&page=1&size=10&beginDate=2024-03-01&endDate=2024-03-05',
        {
          credentials: 'include',
        },
      )
      if (res.ok) {
        const data = await res.json()
        console.log(data)
      }
    }

    fn()
  }, [])

  return (
    <Page>
      <div className={'main'}>
        <h1>TestIframe</h1>
        <button>弹窗</button>

        <Photoswipe />
      </div>
    </Page>
  )
}

export default TestIframe
