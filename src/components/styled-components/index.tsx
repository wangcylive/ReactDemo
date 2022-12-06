import React, {useState} from 'react'
import styled, {keyframes, css} from 'styled-components'

const Title = styled.h1`
  font-size: 18px;
  color: #344cb7;

  &::before {
    content: '&';
  }

  &:hover {
    color: #588b1c;
    text-shadow: 1px 1px 2px hsla(0, 0%, 0%, 0.1);
  }
`

const Content = styled.div<{color?: string; padding?: string}>`
  color: ${props => props.color || '#333'};
  font-size: 14px;
  padding: ${props => props.padding || '0'};
`

const Button = styled.button<{primary?: boolean}>`
  background: ${props => (props.primary ? 'palevioletred' : 'white')};
  color: ${props => (props.primary ? 'white' : 'palevioletred')};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  cursor: default;
`
const ExtendButton = styled(Button)`
  box-shadow: 2px 2px 8px 2px palevioletred;
  cursor: pointer;
  transition: all 0.2s ease-in;

  &:hover {
    color: green;
    border-color: green;
    box-shadow: 2px 2px 8px 2px green;
  }
`

const Ul = styled.ul`
  list-style: none;
  padding: 0;
  width: 200px;

  .list {
    font-size: 13px;
    line-height: 1.4;
    border-bottom: 1px solid #ccc;

    + list {
      margin-top: 2px;
    }
  }
`
const Li = styled.li`
  padding: 8px;
`

const Input = styled.input.attrs(props => ({
  // type: 'url',
}))`
  color: palevioletred;
  font-size: 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`

const rotate = keyframes`
  0% {
    rotate: 0deg;
  }
  100% {
    rotate: 360deg;
  }
`

const RotateDiv = styled.div`
  margin: 20px;
  display: inline-block;
  width: 80px;
  height: 80px;
  border: 1px solid #8a2be2;
  animation: ${rotate} infinite ease-in 1s;
  border-radius: 20px;
  transition: all 0.3s;

  &:hover {
    animation-play-state: paused;
    border-radius: 10px;
  }
`

const marginCss = css`
  margin: 10px;
`

const MarginDiv = styled.div`
  padding: 10px;
  width: 50px;
  height: 50px;
  background-color: #3685ff;
  ${marginCss}
`

console.log(marginCss)

const Demo = () => {
  const [padding, setPadding] = useState('0')

  const onChangePadding = () => {
    setPadding(Math.floor(Math.random() * 10) + 'px')
  }

  return (
    <div>
      <Title className={'h1'}>This is title.</Title>
      <Content color={'red'}>This is content.</Content>
      <Content padding={padding}>This is content.</Content>
      <Button onClick={onChangePadding}>Normal</Button>
      <Button primary as={'a'} href={'#'}>
        Primary
      </Button>
      <ExtendButton>Extend Button</ExtendButton>
      <Ul>
        {Array.from({length: 3}).map((_, index) => (
          <Li key={index} className={'list'}>
            list
          </Li>
        ))}
      </Ul>
      <hr />
      <form>
        <Input type={'email'} placeholder="email" />
      </form>
      <RotateDiv />
      <MarginDiv />
    </div>
  )
}

export default Demo
