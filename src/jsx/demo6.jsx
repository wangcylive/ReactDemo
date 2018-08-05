import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'

export default class HelloWord extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="hello-word">{this.props.name}</div>
    )
  }
}

HelloWord.defaultProps = {
  name: 'Wangcy'
}

HelloWord.propTypes = {
  name: PropTypes.string.isRequired
}

// ReactDom.render(
//   <HelloWord/>,
//   document.getElementById('demo6')
// )
