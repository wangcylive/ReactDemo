import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import Splitting from '@/components/splitting'
const ClickCounterRoute1 = Splitting(() => import('@/components/click-counter/router1'))
const ClickCounterRoute2 = Splitting(() => import('@/components/click-counter/router2'))
const ClickCounterNotFound = Splitting(() => import('@/components/click-counter/not-found'))

function ShowName (props) {
  return (
    <div>{props.name}</div>
  )
}

export default class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
      count: 0
    }
  }

  get countText () {
    return 'this is computed:' + this.state.count
  }

  onClickAdd = () => {
    console.log(6)
    this.setState((state) => {
      return {
        count: state.count + 1
      }
    }, () => {
      console.log('onClickAdd callback', this.state.count, performance.now())
    })

    console.log('onClickAdd', this.state.count, performance.now())
  }

  onClickMinus = () => {
    this.setState((state) => {
      return {
        count: state.count - 1
      }
    }, () => {
      console.log('DOM 更新', this.elCount.innerText)
    })
  }

  onClickChangeRouter = (path) => {
    this.props.history.push(path)
  }

  componentDidUpdate (prevProp, prevState, snapshot) {
    if (this.state.count !== prevState.count) {
      console.log('componentDidUpdate watch', this.state.count, prevState.count)
    }
    console.log('componentDidUpdate', prevProp, prevState, snapshot)
  }

  render () {
    const buttonStyle = {
      width: '80px',
      height: '30px',
      margin: '0 5px'
    }

    console.log('render', performance.now())

    return (
      <div>
        <button onClick={this.onClickAdd} style={buttonStyle}>Add</button>
        <button onClick={this.onClickMinus} style={buttonStyle}>Minus</button>
        <p ref={el => this.elCount = el}>Click Count: {this.state.count}</p>
        <p>{this.countText}</p>
        <ShowName name="3333"/>
        <div>
          <button type="button" onClick={() => this.onClickChangeRouter(`/click-counter/router1?name=ms&now=${Date.now()}`)}>Click Router1</button>
          <button type="button" onClick={() => this.onClickChangeRouter(`/click-counter/user/${Math.floor(Math.random() * 1e5)}`)}>Click Router user1</button>
          <button type="button" onClick={() => this.onClickChangeRouter(`/click-counter/member/`)}>Click Router member</button>
          <button type={"button"} onClick={() => this.onClickChangeRouter(`/click-counter/${Date.now()}`)}>Click Router Random</button>
        </div>
        <hr/>

        <div>
          <div>
            <Link to="/click-counter/router1">Router1</Link>
            <Link to="/click-counter/router2">Router2</Link>
          </div>
          <div>
            <Switch>
              <Route path="/click-counter/router1" component={ClickCounterRoute1}/>
              <Route path="/click-counter/user" component={ClickCounterRoute2}/>
              <Route path="/click-counter/member" component={ClickCounterRoute2}/>
              <Route component={ClickCounterNotFound}/>
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}
