import React, {useEffect, useMemo, useRef, useState} from 'react'
import css from './index.module.scss'

function typeTransform(type: string) {
  switch (type) {
    case 'String':
    case 'Long':
      return 'string'
    case 'Int':
      return 'number'
    default:
      return 'any'
  }
}

const TextareaTs: React.FC = () => {
  const [text, setText] = useState<string>('')
  const [errorText, setErrorText] = useState<string>('')
  const [successText, setSuccessText] = useState<string>('')
  const refRemindId = useRef<number>(-1)

  const textTransform = useMemo<string>(() => {
    if (text) {
      const arr = text.split(/\t\r?\n?|\t?\r?\n/)
      const length = Math.ceil(arr.length / 3)
      return Array.from({length})
        .map((item, index) => {
          const startIndex = index * 3
          const value = []
          for (let i = startIndex; i < 3 + startIndex; i++) {
            value.push(arr[i])
          }
          return value
        })
        .map(item => {
          item[1] = typeTransform(item[1])
          const [key, type, desc] = item
          return `${key}: ${type} // ${desc}`
        })
        .join('\n')
    } else {
      return ''
    }
  }, [text])

  const copyTextareaResult = () => {
    navigator.clipboard
      .writeText(textTransform)
      .then(() => {
        setSuccessText('copy success.')
      })
      .catch(e => {
        setErrorText('copy error.')
      })
  }

  const readTextareaText = async () => {
    try {
      const res = await navigator.clipboard.readText()
      setText(res)
      console.log(res)
    } catch (e) {
      setText('read text error.')
    }
  }

  const onInputTextarea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value.trim())
  }

  useEffect(() => {
    if (textTransform) {
      copyTextareaResult()
    }
  }, [textTransform])

  useEffect(() => {
    if (errorText || successText) {
      window.clearTimeout(refRemindId.current)
      refRemindId.current = window.setTimeout(() => {
        setErrorText('')
        setSuccessText('')
      }, 5000)
    }
  }, [errorText, successText])

  return (
    <div>
      <div className={css.remind}>
        {errorText && <div className={css.errorText}>{errorText}</div>}
        {successText && <div className={css.successText}>{successText}</div>}
      </div>
      {/*<button onClick={onTransform}>Transform</button>*/}
      <button onClick={readTextareaText}>ReadText</button>
      <button onClick={copyTextareaResult}>CopyText</button>
      <div className={css.textareaWrap}>
        <textarea
          className={css.textareaEnter}
          defaultValue={text}
          onInput={onInputTextarea}
          onClick={readTextareaText}
          placeholder={'enter text'}
        />
        <div className={css.textareaResult}>{textTransform}</div>
      </div>
      {/*<div contentEditable={true} style={{height: '300px'}}></div>*/}
      {/*<button onClick={onTransform}>Transform</button>*/}
    </div>
  )
}

export default TextareaTs
