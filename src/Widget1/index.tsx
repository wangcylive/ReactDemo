import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import './layout.scss'

const Page = styled.div`
  padding: 15px;
  background-color: #4a4f5d;

  button {
    background-color: #2d8cf0;
    padding: 3px 10px;
    font-size: 12px;
    border-radius: 4px;
    border: none;
    color: #fff;
  }
`

const Widget1: React.FC<{name?: string; onClick: any; $router: any; params: any}> = props => {
  const [count, setCount] = useState<number>(0)
  useEffect(() => {
    console.log('props.name', props.name)
  }, [props.name])

  useEffect(() => {
    console.log('显示')

    return () => {
      console.log('销毁')
    }
  }, [])

  const onRouterGo = () => {
    props.$router.push('/dsSkillManage')
  }

  return (
    <Page className={'page'} onClick={props.onClick}>
      <div>
        <big>Widget</big> &nbsp;
        <span>name: {props.params.name}</span>
      </div>
      <button onClick={onRouterGo}>技能管理后台</button> &nbsp;
      <button onClick={() => setCount(val => val + 1)}>Add</button> count = {count}
    </Page>
  )
}

export default Widget1
