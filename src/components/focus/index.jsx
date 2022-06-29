import React, { Component } from 'react'
import style from './layout.scss?module'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      key: '',
      innerHeight: 0
    }
  }

  get visibleAndKey () {
    return this.state.visible + this.state.key
  }

  get dialogStyle () {
    return {
      bottom: this.state.visible ? '0' : '100%'
    }
  }

  onChangeKey = (event) => {
    const key = event.target.value
    this.setState({
      key
    })
  }

  onClick = (event) => {
    this.setState({
      visible: true
    })
    this.dialogInput.focus()
    window.scrollTo(0, 1000)
    this.setState({
      innerHeight: document.documentElement.clientHeight
    })
    this.dialog.style.height = document.documentElement.clientHeight + 'px'
  }

  onClose = (event) => {
    this.setState({
      visible: false
    })
  }

  onBlur = (event) => {
    window.scrollTo(0, 0)
  }

  componentDidMount () {
    this.setState({
      innerHeight: document.documentElement.clientHeight
    })
  }

  render () {
    return (
      <div>
        <button type={'button'} onClick={this.onClick}>点击</button>
        <div>{this.visibleAndKey}</div>
        <div>{this.state.innerHeight}</div>

        <div className={style.dialog} style={this.dialogStyle} ref={el => this.dialog = el}>
          <div className={style.overlay}/>
          <div className={style.container}>
            <div className={style.body}>
              <div className={style.title}>输入框获得焦点</div>
              <input className={style.input} type="text" onBlur={this.onBlur} onChange={this.onChangeKey}
                     ref={el => this.dialogInput = el}/>
              <button className={style.btnClose} type={'button'} onClick={this.onClose}>关闭</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
