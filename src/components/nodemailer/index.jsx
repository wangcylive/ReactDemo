import React, { useEffect, useState } from 'react'
import { hot } from 'react-hot-loader/root'

const Nodemailer = () => {
  const [subject, setSubject] = useState('')
  const [text, setText] = useState('')
  const [images, setImages] = useState([])

  const changeSubject = (event) => {
    setSubject(event.target.value.trim())
  }
  const changeText = (event) => {
    setText(event.target.value.trim())
  }
  const changeImages = (event) => {
    const files = event.target.files
    setImages([...files])
  }
  const onSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('subject', subject)
    formData.append('text', text)
    images.forEach((file) => {
      formData.append('file', file)
    })

    window.fetch('http://localhost:13000/email', {
      method: 'POST',
      body: formData
    }).then((res) => {
      console.log(res)
    })

    console.log(formData)
  }


  return <div>
    <form onSubmit={onSubmit}>
      <div>
        <label>Subject:</label>
        <input onInput={changeSubject}/>
      </div>
      <div>
        <label htmlFor="">Text:</label>
        <input type="text" onInput={changeText}/>
      </div>
      <div>
        <label htmlFor="">Images:</label>
        <input type="file" multiple accept="image/jpeg,image/png" onChange={changeImages}/>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
    {/*<button onClick={onClick}>发送邮件</button>*/}
  </div>
}

export default hot(Nodemailer)
