import React, {useEffect, useRef, useState} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const UlEl = styled.ul`
  margin: 20px 0;
  list-style: outside decimal;
  li {
    + li {
      margin-top: 15px;
    }
  }
`

interface Props {
  routeAlive?: boolean
}
const List: React.FC<Props> = props => {
  const refEl = useRef<HTMLDivElement>(null)
  const [value, setValue] = useState<string>('')
  useEffect(() => {
    console.log('render list', performance.now())
  }, [])

  useEffect(() => {
    console.log('visible list', props, refEl.current.clientHeight)
  }, [props.routeAlive])

  return (
    <div ref={refEl}>
      <input defaultValue={value} onChange={e => setValue(e.target.value)} />
      <UlEl>
        {Array.from({length: 30}).map((_, index) => (
          <li key={index}>
            <Link to={'/listdemo/detail/' + index}>列表 list @ {index}</Link>
          </li>
        ))}
      </UlEl>
    </div>
  )
}

export default List
