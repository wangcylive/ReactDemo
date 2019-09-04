import React from 'react'
import { hot } from 'react-hot-loader/root'

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
    const name = this.state.name
    const age = this.state.age

    if (name.length > 5) {
      throw new Error('too long.')
    }

    return (
      <div>
        <ul>
          <li>
            <label htmlFor="">Name</label>
            <input type="text" value={name} onChange={this.handleChangeName}/>
            <strong>{name}</strong>
          </li>
          <li>
            <label htmlFor="">Age</label>
            <input type="number" value={age} onChange={this.handleChangeAge}/>
            <strong>{age}</strong>
          </li>
        </ul>
      </div>
    )
  }
}

class InfoForm extends React.Component {
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
          <label><input type="radio" name="showInput" value={true} defaultChecked={showInput}
                        onChange={this.handleChange}/> show</label>
          <label><input type="radio" name="showInput" value={false} defaultChecked={!showInput}
                        onChange={this.handleChange}/> hide</label>
          <strong style={{ marginLeft: '10px' }}>{showInput ? 'show' : 'hide'}</strong>
        </div>
        {InputComponent}
      </div>
    )
  }
}

export default hot(InfoForm)

// ReactDom.render(
//   <InfoForm/>,
//   document.getElementById('demo7')
// )
