import React, { Component, PureComponent } from 'react'
import { ThemeContext } from './theme-context'
import ThemedButtonChild from './theme-child'

class ThemedButton extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <ThemeContext.Consumer>
        {
          value => {
            return (
              <div>
                <p>
                  <button type={"button"} onClick={() => value.changeName('ThemedButton')}>ThemedButton</button>
                  <span style={{marginLeft: '10px'}}>{value.name}</span>
                </p>
                <ChildContent/>
              </div>
            )
          }
        }
      </ThemeContext.Consumer>
    )
  }
}

class ChildContent extends PureComponent {
  static contextType = ThemeContext

  constructor (props) {
    super(props)
  }

  onClick = () => {
    this.context.changeName(Date.now())
  }

  render () {
    return (
      <p>
        <span>ChildContent</span>
        <button style={{margin: "0 10px"}} type={"button"} onClick={this.onClick}>Change context Name</button>
        <span>{this.context.name}</span>
      </p>
    )
  }
}

class Toolbar extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        <ThemedButton />
        <ThemedButtonChild parent={"themedButton"}/>
      </div>
    )
  }
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: 'App',
      visible: false
    }
  }

  onChangeName = (event) => {
    const name = event.target.value.trim()
    this.changeName(name)
  }

  changeName = (name) => {
    this.setState({
      name
    })
  }

  render() {
    const { state } = this

    const contextValue = {
      name: state.name,
      changeName: this.changeName
    }

    return (
      <ThemeContext.Provider value={contextValue}>
        <div>
          <label>name:</label>
          <input type="text" value={state.name} onChange={this.onChangeName}/>
        </div>
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

export default App
