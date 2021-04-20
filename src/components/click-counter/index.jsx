import React, {Component} from 'react'
import {Routes, Route, Link, Redirect} from 'react-router-dom'
import {hot} from 'react-hot-loader/root'
import Splitting from '@/router/splitting'
const ClickCounterRoute1 = Splitting(() => import('@/components/click-counter/router1'))
const ClickCounterRoute2 = Splitting(() => import('@/components/click-counter/router2'))
const ClickCounterNotFound = Splitting(() => import('@/components/click-counter/not-found'))
import history from '@/router/history'

function ShowName(props) {
  return <div>{props.name}</div>
}

class ClickCounter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
    }
  }

  get countText() {
    return 'this is computed:' + this.state.count
  }

  onClickAdd = () => {
    this.setState(
      state => {
        console.log('prevState', state)
        return {
          count: state.count + 1,
        }
      },
      () => {
        console.log('onClickAdd callback', this.state.count, performance.now())
      },
    )

    console.log('onClickAdd', this.state.count, performance.now())
  }

  onClickMinus = () => {
    this.setState(
      state => {
        return {
          count: state.count - 1,
        }
      },
      () => {
        console.log('DOM 更新', this.elCount.innerText)
      },
    )
  }

  onClickChangeRouter = path => {
    history.push(path)
  }

  componentDidUpdate(prevProp, prevState, snapshot) {
    if (this.state.count !== prevState.count) {
      console.log('componentDidUpdate watch', this.state.count, prevState.count)
    }
    console.log('componentDidUpdate', prevProp, prevState, snapshot)
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('shouldComponentUpdate', nextProps, this.props)
  //   return false
  // }

  render() {
    const buttonStyle = {
      width: '80px',
      height: '30px',
      margin: '0 5px',
    }

    console.log('render', performance.now())

    return (
      <div>
        <button onClick={this.onClickAdd} style={buttonStyle}>
          Add
        </button>
        <button onClick={this.onClickMinus} style={buttonStyle}>
          Minus
        </button>
        <p ref={el => (this.elCount = el)}>Click Count: {this.state.count}</p>
        <p>{this.countText}</p>
        <ShowName name="3333" />
        <div>
          <button
            type="button"
            onClick={() => this.onClickChangeRouter(`/click-counter/router1?name=ms&now=${Date.now()}`)}>
            Click Router1
          </button>
          <button
            type="button"
            onClick={() => this.onClickChangeRouter(`/click-counter/user/${Math.floor(Math.random() * 1e5)}`)}>
            Click Router user1
          </button>
          <button type="button" onClick={() => this.onClickChangeRouter(`/click-counter/member/`)}>
            Router member
          </button>
          <button type="button" onClick={() => this.onClickChangeRouter(`/click-counter/bose/333`)}>
            Router bose
          </button>
          <button type={'button'} onClick={() => this.onClickChangeRouter(`/click-counter/${Date.now()}`)}>
            Click Router Random
          </button>
        </div>
        <hr />

        <div>
          <div>
            <Link to="router1">Router1</Link> | <Link to="router2">Router2</Link>
          </div>
          <div>
            <Routes>
              <Route path="router1" element={<ClickCounterRoute1 />} />
              <Route path="user*" element={<ClickCounterRoute2 />} />
              <Route path="member*" element={<ClickCounterRoute2 />} />
              {/*<Redirect to={'member'} from={'/click-counter/bose/*'} />*/}
              <Route path="*" element={<ClickCounterNotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    )
  }
}

export default hot(ClickCounter)
