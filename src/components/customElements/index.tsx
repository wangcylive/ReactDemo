import React, {useEffect, useState} from 'react'
import './popupInfo'

const CustomElements: React.FC = () => {
  const [show, changeShow] = useState(true)
  const [popupContent, setPopupContent] = useState(
    'Your card validation code (CVC) is an extra security feature — it is the last 3 or 4 numbers on the back of your card.',
  )
  const onClick = event => {
    console.log(event)
  }
  const onChangeContext = () => {
    setPopupContent(popupContent + ' change time: ' + new Date().toLocaleTimeString() + '. ')
  }
  useEffect(() => {
    customElements.whenDefined('popup-info').then(res => {
      console.log('whenDefined', res)
    })
  }, [])

  return (
    <div>
      <button onClick={() => changeShow(val => !val)}>Change Visible</button>
      <button onClick={onChangeContext}>Change Property</button>
      {show && (
        <>
          <popup-info onClick={onClick} style={{marginLeft: '10px'}} context={popupContent}>
            PopupInfo
          </popup-info>
        </>
      )}
    </div>
  )
}

export default CustomElements
