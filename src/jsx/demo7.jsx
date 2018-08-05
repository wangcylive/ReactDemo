import React from 'react'
import ReactDom from 'react-dom'

class Input extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      age: ''
    }
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeAge = this.handleChangeAge.bind(this)
  }

  handleChangeName (event) {
    this.setState({ name: event.target.value })
  }

  handleChangeAge (event) {
    this.setState({ age: event.target.value })
  }

  componentWillMount () {
    console.log('componentWillMount', performance.now())
  }

  componentDidMount () {
    console.log('componentDidMount', performance.now(), this.getDOMNO)
  }

  shouldComponentUpdate (nextProps, nextState) {
    console.log('shouldComponentUpdate', nextProps, nextState)
    return true
  }

  componentWillUnmount () {
    console.log('componentWillUnmount', performance.now())
  }

  render () {
    console.log('render', performance.now())
    const name = this.state.value
    const age = this.state.age
    return (
      <div>
        <ul>
          <li>
            <label htmlFor="">Name</label>
            <input type="text" value={ name } onInput={ this.handleChangeName }/>
            <strong>{ name }</strong>
          </li>
          <li>
            <label htmlFor="">Age</label>
            <input type="number" value={ age } onInput={ this.handleChangeAge }/>
            <strong>{ age }</strong>
          </li>
        </ul>
      </div>
    )
  }
}

export default class InfoForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showInput: 'true'
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    console.log(event.target.checked)
    this.setState({ showInput: event.target.value })
  }

  render () {
    const showInput = this.state.showInput === 'true'

    const InputComponent = showInput && <Input/>

    return (
      <div>
        <div>
          <label><input type="radio" name="showInput" value={true} onInput={ this.handleChange } /> show</label>
          <label><input type="radio" name="showInput" value={false} onInput={ this.handleChange } /> hide</label>
           <strong>{ showInput ? 'show' : 'hide' }</strong>
        </div>
        { InputComponent }
      </div>
    )
  }
}

// ReactDom.render(
//   <InfoForm/>,
//   document.getElementById('demo7')
// )
