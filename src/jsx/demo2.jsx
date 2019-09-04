import React, { Component, PureComponent } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader/root'

const names = [ 'Alice', 'Emily', 'Kate' ]

function showIndex (index, context) {
  console.log(index, context)
}

class RenderList extends PureComponent {
  constructor (props) {
    super(props)
  }

  onClcik = () => {
    // this.props.onClick()
  }

  render () {
    console.log('RenderList', performance.now(), this.props)
    const { name, nodes } = this.props
    return (
      <div onClick={this.props.onClick}>{name} nodes: {nodes && nodes.join(',')}</div>
    )
  }
}

RenderList.propTypes = {
  name: PropTypes.string.isRequired,
  nodes: PropTypes.arrayOf(PropTypes.number)
}

class Demo2 extends Component {
  constructor (props) {
    super(props)

    this.state = {
      users: [ { name: '1', nodes: [ 1, 2 ] }, { name: '2', nodes: [ 2, 3 ] }, { name: '3', nodes: [ 3, 4 ] } ],
      showName: true
    }
  }

  onClickPush = () => {
    this.setState((state) => {
      return {
        users: [ ...state.users, { name: state.users.length + 1 + '' } ]
      }
    })
  }

  onClickChange = () => {
    this.setState((state) => {
      const users = [ ...state.users ]
      users[ 2 ] = { name: 'change', nodes: [] }
      return {
        users
      }
    })
  }

  onClickChangeShowName = () => {
    this.setState((state) => {
      return {
        showName: !state.showName
      }
    })
  }


  onClickChild = (item) => {
    console.log(item)
  }

  render () {
    console.log('parent render', performance.now())

    let showName = null
    if (this.state.showName) {
      showName = <div>1111</div>
    }

    return (
      <div>
        {
          names.map((name, index) => <div key={index}
                                          onClick={(e) => showIndex(index, this)}>Hello, {name}{index}</div>)
        }

        <div>
          <button onClick={this.onClickPush}>Click Push</button>
          <button onClick={this.onClickChange}>Click Change</button>
          {
            this.state.users.map((item, index) => <RenderList onClick={this.onClickChild} key={index} {...item}/>)
          }
        </div>
        <hr/>
        <div>
          <button onClick={this.onClickChangeShowName}>Click Change ShowName</button>
          {
            showName
          }
        </div>
      </div>
    )
  }
}

async function getTime (index) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (index === 2) {
        reject(Date.now())
      } else {
        resolve(Date.now())
      }
    }, 1000)
  })
}

async function forShowTime () {
  for (let i = 0; i < 5; i++) {
    const time = await getTime(i).catch((err) => console.error(err))
    console.log('for', time, i)
  }

  console.log('for Done')

  return 'hhh'
}

// forShowTime()

async function forEachShowTime () {
  const arr = [ 1, 2, 3, 4, 5 ]

  arr.forEach(async (item) => {
    const time = await getTime()
    console.log('forEach', time, item)
  })

  console.log('forEach Done')
}

// forEachShowTime()

async function allShowtime () {
  const arr = []
  for (let i = 0; i < 5; i++) {
    arr.push(getTime())
  }

  const res = await Promise.all([ ...arr ]).then((res) => {
    console.log('all', res)
  })

  console.log('all Done')
}

// allShowtime()

export default hot(Demo2)
