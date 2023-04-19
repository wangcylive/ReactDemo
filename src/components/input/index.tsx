import React, {HTMLInputTypeAttribute, useEffect, useRef, useState} from 'react'
import styled from 'styled-components'

const InputOptions = styled.div`
  padding: 0;
  display: flex;
  flex-wrap: wrap;

  > label {
    margin: 0 10px 10px 0;
    display: flex;
    align-content: center;
  }
`

const TextInput = styled.input`
  display: block;
  padding: 10px;
  width: 200px;
  margin: 10px 0;
  border: 1px solid #666;
`
const Textarea = styled.textarea`
  margin: 10px 0;
  display: block;
  padding: 10px;
  height: 40px;
  width: 200px;
  border: 1px solid #666;
`
const ContentEditor = Textarea.withComponent('div')

const EnterKeys = styled.div`
  margin: 10px 0;
  font-size: 14px;
`

const inputTypeArr: HTMLInputTypeAttribute[] = [
  'button',
  'checkbox',
  'color',
  'date',
  'datetime-local',
  'email',
  'file',
  'hidden',
  'image',
  'month',
  'number',
  'password',
  'radio',
  'range',
  'reset',
  'search',
  'submit',
  'tel',
  'text',
  'time',
  'url',
  'week',
]

type inputModeType = React.HTMLAttributes<HTMLElement>['inputMode']
type enterKeyHintType = React.InputHTMLAttributes<HTMLInputElement>['enterKeyHint']

const inputModeArr: inputModeType[] = ['none', 'text', 'tel', 'url', 'email', 'numeric', 'decimal', 'search']

const enterKeyHintArr = ['enter', 'done', 'go', 'next', 'previous', 'search', 'send']

const InputDemo: React.FC = () => {
  const [type, setType] = useState<HTMLInputTypeAttribute>('text')
  const [inputMode, setInputMode] = useState<inputModeType>('text')
  const [enterKeyHint, setEnterKeyHint] = useState<enterKeyHintType>('enter')
  const [enterKeys, setEnterKeys] = useState<string[]>([])

  const onChangeInputType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value)
  }
  const onChangeInputMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputMode(event.target.value as inputModeType)
  }

  const onChangeEnterKeyHint = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnterKeyHint(event.target.value as enterKeyHintType)
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const key = event.key
    setEnterKeys(val => [...val, key])
  }

  return (
    <div>
      <p>viewport user-scalable=0可以禁用 input 选中页面自动缩放</p>
      <p>inputmode="none"，无虚拟键盘。在应用程序或者站点需要实现自己的键盘输入控件时很有用。</p>
      <p>enterkeyhint 定义了为虚拟键盘上的回车键呈现的动作标签（或图标）。如搜索、发送、开始</p>
      <h4>type</h4>
      <InputOptions>
        {inputTypeArr.map((item, index) => (
          <label key={index}>
            <input
              type="radio"
              name="inputType"
              value={item}
              defaultChecked={item === type}
              onChange={onChangeInputType}
            />
            {item}
          </label>
        ))}
      </InputOptions>
      <h4>inputMode</h4>
      <InputOptions>
        {inputModeArr.map((item, index) => (
          <label key={index}>
            <input
              type="radio"
              name="inputMode"
              value={item}
              onChange={onChangeInputMode}
              defaultChecked={item === inputMode}
            />{' '}
            {item}
          </label>
        ))}
      </InputOptions>
      <h4>enterkeyhint</h4>
      <InputOptions>
        {enterKeyHintArr.map((item, index) => (
          <label key={index}>
            <input
              type="radio"
              name="enterkeyhint"
              value={item}
              defaultChecked={item === enterKeyHint}
              onChange={onChangeEnterKeyHint}
            />{' '}
            {item}
          </label>
        ))}
      </InputOptions>
      <TextInput
        type={type}
        inputMode={inputMode}
        enterKeyHint={enterKeyHint}
        placeholder={'请输入'}
        onKeyDown={onKeyDown}
      />
      <Textarea inputMode={inputMode} placeholder={'请输入'} />
      <ContentEditor contentEditable={true} inputMode={inputMode} placeholder={'请输入'} />
      <EnterKeys>{enterKeys.join(', ')}</EnterKeys>
    </div>
  )
}

export default InputDemo
