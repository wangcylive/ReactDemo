import React from 'react'
import ReactDom from 'react-dom'

const selectValue = [ 'grapefruit', 'lime', 'coconut', 'mango' ]

class NameForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      desc: '',
      sel: ''
    }

    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeDesc = this.handleChangeDesc.bind(this)
    this.handleChangeSel = this.handleChangeSel.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChangeName (event) {
    this.setState({ name: event.target.value })
  }

  handleChangeDesc (event) {
    this.setState({ desc: event.target.value })
  }

  handleChangeSel (event) {
    this.setState({ sel: event.target.value })
  }

  handleSubmit (event) {
    event.preventDefault()
    console.log(this.state)
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.name} onInput={this.handleChangeName}/>
        </label>
        <label>
          Desc:
          <textarea value={this.state.desc} onInput={this.handleChangeDesc}></textarea>
        </label>
        <label>
          Sel:
          <select value={this.state.sel} onInput={this.handleChangeSel}>
            {
              selectValue.map((val, index) => <option key={index} value={val}>{val}</option>)
            }
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
    )
  }
}

ReactDom.render(
  <NameForm/>,
  document.getElementById('demo4')
)
