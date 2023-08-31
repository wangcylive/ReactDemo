import React, {useEffect, useId, useRef, useState} from 'react'
import {createRoot} from 'react-dom/client'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'

const Form = styled.form`
  .grid {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 10px;
  }

  label {
    text-align: right;
  }

  .main {
    display: flex;
    align-items: center;
  }
`

const FormComp: React.FC<{legend: React.ReactNode}> = props => {
  const id = useId()
  const formKey = (name: string) => `${id}-${name}`
  const [name, setName] = useState<string>('')
  const [age, setAge] = useState<number>(18)
  return (
    <Form>
      <fieldset>
        <legend>{props.legend}</legend>
        <div className="grid">
          <label htmlFor={formKey('name')}>Name:</label>
          <div className={'main'}>
            <input type="text" id={formKey('name')} defaultValue={name} onChange={e => setName(e.target.value)} />
          </div>

          <label htmlFor={formKey('age')}>Age:</label>
          <div className="main">
            <input
              type="range"
              id={formKey('age')}
              defaultValue={age}
              min={1}
              step={1}
              max={100}
              onChange={e => setAge(e.target.valueAsNumber)}
            />
            <span>{age}</span>
          </div>
        </div>
      </fieldset>
    </Form>
  )
}

const App: React.FC = () => {
  const id = useId()

  return <div>App1 useId: {id}</div>
}

const UseIdDemo: React.FC = () => {
  const id = useId()
  const ref1 = useRef<HTMLDivElement>(null)
  const ref2 = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const app1 = createRoot(ref1.current, {
      identifierPrefix: 'app1-',
    })
    const app2 = createRoot(ref2.current, {
      identifierPrefix: 'app2-',
    })

    app1.render(<App />)
    app2.render(<App />)
  }, [])

  const goDemo = () => {
    navigate('/demo1?type=2')
  }

  return (
    <div>
      <p>
        <code>useId</code>在组件的顶层调用以生成唯一 ID：
      </p>
      <p>主要好处是使用 userId React 确保它与服务器渲染一起工作</p>
      <p>
        如果您在单个页面上呈现多个独立的 React 应用程序，请将其<code>identifierPrefix</code>作为选项传递给您的
        <code>createRoot</code> or <code>hydrateRoot</code>调用。这可确保两个不同应用程序生成的 ID
        不会发生冲突，因为生成的每个标识符都
        <code>useId</code>将以您指定的不同前缀开头。
      </p>
      <FormComp legend={'Self information'} />
      <FormComp legend={'Tom information'} />

      <div ref={ref1}></div>
      <div ref={ref2}></div>

      <button onClick={goDemo}>router</button>
    </div>
  )
}

export default UseIdDemo
