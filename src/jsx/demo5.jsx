import React from 'react'
import ReactDom from 'react-dom'

function FancyBorder (props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      <div>{props.title}</div>
      <div>{props.message}</div>
    </div>
  )
}

function Title () {
  return (
    <h1 className="Dialog-title">Welcome</h1>
  )
}

function Message () {
  return (
    <p className="Dialog-message">Thank you</p>
  )
}

function WelcomeDialog () {
  return (
    <FancyBorder color="blur">
      title={
      <Title/>
    }
      message={
      <Message/>
    }
    </FancyBorder>
  )
}

function BoilingVerdict (props) {
  if (props.celsius >= 100) {
    return <p>水会烧开</p>
  }
  return <p>水不会烧开</p>
}

function toCelsius (fahrenheit) {
  return (fahrenheit - 32) * 5 / 9
}

function toFahrenheit (celsius) {
  return (celsius * 9 / 5) + 32
}

function tryConvert (temperature, convert) {
  const input = parseFloat(temperature)
  if (Number.isNaN(input)) {
    return ''
  }
  const output = convert(input)
  const rounded = Math.round(output * 1000) / 1000
  return rounded.toString()
}

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
}

class TemperatureInput extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      temperature: ''
    }
  }

  handleChange (event) {
    // this.setState({ temperature: event.target.value })
    this.props.onTemperatureChange(event.target.value)
  }

  render () {
    // const temperature = this.state.temperature
    const temperature = this.props.temperature
    const scale = this.props.scale
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[ scale ]}:</legend>
        <input type="text" value={temperature} onInput={this.handleChange}/>
      </fieldset>
    )
  }
}

class Calculator extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      temperature: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this)
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this)
  }

  handleChange (event) {
    this.setState({ temperature: event.target.value })
  }

  handleCelsiusChange (temperature) {
    this.setState({ scale: 'c', temperature })
  }

  handleFahrenheitChange (temperature) {
    this.setState({ scale: 'f', temperature })
  }

  render () {
    const scale = this.state.scale
    const temperature = this.state.temperature
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature

    return (
      <div>
        <fieldset>
          <legend>输入一个摄氏温度</legend>
          <input type="text" value={temperature} onInput={this.handleChange}/>
          <BoilingVerdict celsius={parseFloat(celsius)}/>
        </fieldset>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange}
        />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange}
        />
        <WelcomeDialog/>
      </div>
    )
  }
}

ReactDom.render(
  <Calculator/>,
  document.getElementById('demo5')
)
