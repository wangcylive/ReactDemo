import React, {useEffect, useState} from 'react'
import styled, {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle<{enable?: boolean}>`
  html {
    overscroll-behavior: ${props => (props.enable ? 'none' : 'auto')};
  }
`

const UlStyled = styled.ul<{white?: boolean}>`
  margin: 0 0 20px 0;
  height: 100px;
  overflow: auto;
  border: 1px solid #ccc;
  padding: 8px;
  overscroll-behavior: auto;
  list-style: inside disc;
  background-color: ${props => (props.white ? '#fff' : 'transparent')};

  li {
    border-bottom: 1px solid #eee;
  }
`

const UlContain = styled(UlStyled)`
  overscroll-behavior: contain;
`

const UlNone = styled(UlStyled)`
  overscroll-behavior: none;
`

const FixedDiv = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 300px;
  background-color: hsla(0, 0%, 0%, 0.3);
  //overflow: scroll;
  //overscroll-behavior: contain;
  //
  //> div {
  //  height: calc(100% + 1px);
  //  overflow: hidden;
  //
  //  ::-webkit-scrollbar {
  //    width: 3px;
  //    height: 3px;
  //  }
  //
  //  ::-webkit-scrollbar-thumb {
  //    background-color: transparent;
  //  }
  //
  //  ::-webkit-scrollbar-track {
  //    background-color: transparent;
  //  }
  //}
`

const DemoChild = () => {
  useEffect(() => {
    console.log('DemoChild create', performance.now())

    return () => {
      console.log('DemoChild destroy', performance.now())
    }
  }, [])
  return <div>DemoChild</div>
}

const Demo: React.FC = () => {
  const [enable, setEnable] = useState<boolean>(true)

  useEffect(() => {
    console.log('demo create', performance.now())

    return () => {
      console.log('demo destroy', performance.now())
    }
  }, [])

  useEffect(() => {
    if (!enable) {
      navigator?.vibrate([200])
    }
  }, [enable])
  return (
    <div>
      <p>
        控制浏览器过度滚动时的表现——也就是滚动到边界、<i>html</i>上面设置 <i>overscroll-behavior: none;</i>{' '}
        可以禁用浏览器默认的下拉刷新
      </p>
      <GlobalStyle enable={enable} />
      <button onClick={() => setEnable(val => !val)}>{!enable ? '禁止' : '启用'}下拉刷新</button>
      <hr />

      <code>overscroll-behavior: auto;</code>
      <UlStyled>
        {Array.from({length: 20}).map((_, index) => (
          <li key={index}>list {index + 1}</li>
        ))}
      </UlStyled>
      <code>overscroll-behavior: contain;</code>
      <p>
        设置这个值后，默认的滚动边界行为不变（“触底”效果或者刷新），但是临近的滚动区域不会被滚动链影响到，比如对话框后方的页面不会滚动。
      </p>
      <UlContain>
        {Array.from({length: 20}).map((_, index) => (
          <li key={index}>list {index + 1}</li>
        ))}
      </UlContain>
      <code>overscroll-behavior: none;</code>
      <p>临近滚动区域不受到滚动链影响，而且默认的滚动到边界的表现也被阻止。</p>
      <UlNone>
        {Array.from({length: 20}).map((_, index) => (
          <li key={index}>list {index + 1}</li>
        ))}
      </UlNone>
      {/*<FixedDiv>*/}
      {/*  <div>*/}
      {/*    <UlStyled white={true}>*/}
      {/*      {Array.from({length: 20}).map((_, index) => (*/}
      {/*        <li key={index}>list {index + 1}</li>*/}
      {/*      ))}*/}
      {/*    </UlStyled>*/}
      {/*  </div>*/}
      {/*</FixedDiv>*/}

      <DemoChild />
    </div>
  )
}

export default Demo
