import React from 'react'
import styled, {createGlobalStyle} from 'styled-components'

const GlobalStyles = createGlobalStyle`
  body {
    //overflow: visible;
  }
`

const DivScroll = styled.div`
  height: 200px;
  overflow: auto;
  border: 1px solid #ccc;
  overscroll-behavior: contain;

  h4 {
    margin: 0;
    position: sticky;
    top: -1px;
    padding: 5px 8px;
    background-color: #eee;
  }
  p {
    padding: 2px 8px;
  }
`

const Div1 = styled.div`
  margin-bottom: 20px;
  height: 20px;
  background-color: #222;
  position: sticky;
  top: 0;
  z-index: 1;
  color: #fff;
  padding: 8px;
`

const StickyDemo: React.FC = () => {
  return (
    <div>
      <p>粘型定位</p>
      <ul>
        <li>父元素高度必须大于sticky元素的高度</li>
        <li>不设置父元素高度的时候，父元素不能使用除了overflow的visiable属性，比如auto、scroll</li>
        <li>
          设置父元素高度，子元素高度超过父元素高度，父元素使用auto、scroll等属性，此时且出现了滚动，sticky依然是有效
        </li>
        <li>设置父元素高度，子元素高度没有超过父元素高度，此时没有出现滚动，sticky仅在父元素高度内有效</li>
        <li>sticky元素需要设置top、bottom、left、right的值</li>
      </ul>
      {/*<GlobalStyles />*/}
      <Div1>滚动到这里固定到顶部</Div1>

      <DivScroll>
        {Array.from({length: 10})
          .map((_, index) => index + 65)
          .map(charCode => (
            <div key={charCode}>
              <h4 key={charCode}>{String.fromCodePoint(charCode)}</h4>
              {Array.from({length: 5}).map((_, idx) => (
                <p key={idx}>
                  {String.fromCodePoint(charCode)} {idx + 1}
                </p>
              ))}
            </div>
          ))}
      </DivScroll>

      <div style={{height: '100vh'}}>empty</div>
    </div>
  )
}

export default StickyDemo
