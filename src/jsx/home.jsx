import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { hot } from 'react-hot-loader/root'
import { changeName } from '@/store/user-info/action'
import { connect } from 'react-redux'

class View1 extends Component {
  constructor (props) {
    super(props)
    this.btn = React.createRef()
    this.state = {
      view: 'view1'
    }
  }

  clickChangeName = () => {
    this.props.changeName('wangcylive' + Math.ceil(Math.random() * 10))
  }

  clickChangeParentName = () => {
    this.props.changeParentName('View1name')
  }

  changeChildView = (view) => {
    this.setState({
      view
    })
  }

  iframePostMessage = () => {
    const data = {
      type: 'setPayload',
      payload: JSON.stringify({ value: 'postMessage' })
    }
    console.log('iframeMessage', data)
    window.top.postMessage(data, '*')
  }

  componentDidMount () {
    console.log('componentDidMount', this, ReactDom.findDOMNode(this), this.el)
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    console.log('componentDidUpdate', prevProps, prevState, snapshot)
  }

  componentWillUnmount () {

  }

  render () {
    console.log('view1 render', performance.now())
    const { props, state } = this
    const lists = Array.from(new Array(10), (item, index) => index + 1)
    return (
      <div ref={(ele) => this.el = ele}>
        <button onClick={this.iframePostMessage}>Iframe post</button>
        <div>redux name: {props.name}</div>
        <div>self view: {state.view}</div>
        <div>
          <button ref={this.btn} onClick={this.clickChangeName}>Click Change Name</button>
          <button onClick={this.clickChangeParentName}>Click Change Parent Name</button>
        </div>
        <ul>
          {
            lists.map((item, index) => <li ref={(ele) => this[ `list${index}` ] = ele} key={index}>{item}</li>)
          }
        </ul>
        <div>{props.children}</div>
      </div>
    )
  }
}

const View1Coonect = connect(mapState, mapDispatch)(View1)

function View2 (props) {
  return (
    <div className='view2'>View2</div>
  )
}

function View3 (props) {
  return (
    <div className='view3'>View3</div>
  )
}

class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: 'HOME'
    }
  }

  selfNameChange = (event) => {
    const name = event.target.value.trim()
    this.setState({
      name
    })
  }

  changeSelfName = (name) => {
    this.setState({
      name
    })
  }

  changeView1 = () => {
    console.log(this.refs.label)
    this.refs.view1.changeChildView('form parent change view1.')
  }

  reduxNameChange = (event) => {
    const name = event.target.value.trim()
    this.props.changeName(name)
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (this.state.name !== this.elInput.value) {
      this.elInput.value = this.state.name
    }
  }

  onOpenApp = () => {
    location.href = 'videobus://deeplink'
    // const iframe = document.createElement('iframe')
    // iframe.src = 'videobus://deeplink'
    // document.body.appendChild(iframe)
  }

  render () {
    console.log('home render', performance.now())
    const { props, state } = this

    return (
      <div>
        <div>

          <button type={'button'} onClick={this.onOpenApp}>打开 video bus</button>

        </div>
        <h3>Home</h3>
        <div>
          <label>self name:</label> <span>{state.name}</span> <input ref={el => this.elInput = el} type="text"
                                                                     onChange={this.selfNameChange}/>
        </div>
        <div>
          <label ref="label">redux name:</label> <span>{props.name}</span> <input type="text"
                                                                                  onChange={this.reduxNameChange}/>
        </div>
        <hr/>
        <div>
          <button onClick={this.changeView1}>Change View1 view</button>
        </div>
        <View1 {...props} changeParentName={this.changeSelfName} ref="view1"><View2/><View3/></View1>
      </div>
    )
  }
}

function mapState (state, ownProps) {
  return {
    ...state.userInfo
  }
}

function mapDispatch (dispatch, ownProps) {
  return {
    changeName: (name) => {
      dispatch(changeName(name))
    }
  }
}

export default hot(connect(mapState, mapDispatch)(Home))
