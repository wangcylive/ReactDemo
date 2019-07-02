import React, { Component, useState, useEffect } from 'react'
import { ShowName1, ShowName2 } from './show-name'

function Example () {
  const [ count, setCount ] = useState(2)

  const b = useState({name: 'b'})

  let el1 = null

  // componentDidMount componentDidUpdate
  useEffect(() => {
    console.log('1 useEffect', count, b[0], el1.innerText)

    // componentWillUnmount
    return () => {
      console.log('destroy', count)
    }
  })

  useEffect(() => {
    console.log('2 useEffect')
  })

  return (
    <div>
      <p ref={el => el1 = el}>you clicked {count} times.</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      count: 0
    }
  }

  onChangeCount = () => {
    this.setState((state) => {
      return {
        count: state.count + 1
      }
    })
  }

  componentDidMount () {
    console.log('parent componentDidMount', performance.now())
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    console.log('parent componentDidUpdate', performance.now(), this.el1.innerText)
  }

  componentWillUnmount () {
    console.log('parent componentWillUnmount', performance.now())
  }


  render () {
    return (
      <div>
        <div ref={el => this.el1 = el}>{this.state.count}<button onClick={this.onChangeCount}>Click</button></div>
        <Example/>
        <ShowName1/>
        <ShowName2/>
      </div>
    )
  }
}

export default App