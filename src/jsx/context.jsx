import React, { Component } from 'react'

const ThemeContext = React.createContext('light');

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
              <button type={"button"}>{ value.name }</button>
            )
          }
        }
      </ThemeContext.Consumer>
    )
  }
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: 'App',
      visible: false
    }
  }

  changeName = (event) => {
    const name = event.target.value.trim()
    this.setState({
      name
    })
  }

  render() {
    const { state } = this
    return (
      <ThemeContext.Provider value={state}>
        <div>
          <label>name:</label>
          <input type="text" value={state.name} onChange={this.changeName}/>
        </div>
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

export default App
