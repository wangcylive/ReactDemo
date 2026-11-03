import React from 'react'
import './layout.scss'
import styled from 'styled-components'

const Page = styled.div`
  width: 300px;
  height: 300px;
  background-color: #4a4f5d;
`

const Widget1: React.FC<{name?: string}> = props => {
  return (
    <div className={'page'}>
      <h1>Widget2</h1>
      <Page>name: {props.name}</Page>
    </div>
  )
}

export default Widget1
