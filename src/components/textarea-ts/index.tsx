import React, {useEffect, useMemo, useRef, useState} from 'react'
import css from './index.module.scss'

function typeTransform(type: string) {
  if (/string|long/i.test(type)) {
    return 'string'
  }
  if (/int|double/i.test(type)) {
    return 'number'
  }
  if (/bool/i.test(type)) {
    return 'boolean'
  }
  if (/list/i.test(type)) {
    return 'any[]'
  }
  return 'any'
}

const TextareaTs: React.FC = () => {
  const [text, setText] = useState<string>('')
  const [html, setHtml] = useState<string>('')
  const [errorText, setErrorText] = useState<string>('')
  const [successText, setSuccessText] = useState<string>('')
  const refRemindId = useRef<number>(-1)
  const refEditor = useRef<HTMLDivElement>(null)

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

  const htmlTransform = useMemo<string>(() => {
    if (html) {
      const div = document.createElement('div')
      div.innerHTML = html
      const table = div.querySelector('table')
      if (table) {
        const trList = table.querySelectorAll('tbody tr')
        if (trList.length > 0) {
          const arr: string[] = []
          trList.forEach(tr => {
            const tdList = tr.querySelectorAll('td')
            const key = tdList[0].textContent
            const type = typeTransform(tdList[1].textContent)
            const desc = tdList[2].textContent
            arr.push(`${key}: ${type} // ${desc}`)
          })
          return arr.join('\n')
        }
      }
    }
    return ''
  }, [html])

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
    console.log(navigator.clipboard.readText)
    try {
      const res = await navigator.clipboard.readText()
      setText(res.trim())
      console.log(res)
    } catch (e) {
      console.log(e)
      setErrorText('read text error.')
    }
  }

  const onInputTextarea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value.trim())
  }

  const readHtml = async () => {
    try {
      const res = await navigator.clipboard.read()
      res.forEach(clipItem => {
        if (clipItem.types.includes('text/html')) {
          clipItem.getType('text/html').then(blob => {
            // const fileRead = new FileReader()
            // fileRead.onload = () => {
            //   console.log(fileRead.result)
            // }
            // fileRead.readAsText(blob)
            blob.text().then(text => {
              setHtml(text)
              refEditor.current.innerHTML = text
              console.log(text)
            })
          })
        }
      })
    } catch (e) {
      console.log(e)
      setErrorText('read html error.')
    }
  }

  const onInputHtml = (event: React.ChangeEvent<HTMLDivElement>) => {
    setHtml(event.target.innerHTML)
  }

  const copyHtmlResult = () => {
    navigator.clipboard
      .writeText(htmlTransform)
      .then(() => {
        setSuccessText('copy success.')
      })
      .catch(e => {
        setErrorText('copy error.')
      })
  }

  useEffect(() => {
    if (htmlTransform) {
      copyHtmlResult()
    }
  }, [htmlTransform])

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
      <button onClick={readTextareaText}>ReadText</button>
      <button onClick={copyTextareaResult}>CopyText</button>
      <div className={css.textareaWrap}>
        <textarea
          className={css.textareaEnter}
          value={text}
          onInput={onInputTextarea}
          onClick={readTextareaText}
          placeholder={'enter text'}
        />
        <div className={css.textareaResult}>{textTransform}</div>
      </div>
      <button onClick={readHtml}>ReadHtml</button>
      <button onClick={copyHtmlResult}>CopyHtml</button>
      <div className={css.textareaWrap}>
        <div
          className={css.textareaEnter}
          contentEditable={true}
          ref={refEditor}
          // dangerouslySetInnerHTML={{__html: html}}
          onClick={readHtml}
          onInput={onInputHtml}
        />
        <div className={css.textareaResult}>{htmlTransform}</div>
      </div>
    </div>
  )
}

export default TextareaTs
