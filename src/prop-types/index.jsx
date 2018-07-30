import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'

class HelloWord extends React.Component {
    constructor (props) {
        super(props)
    }

    render () {
        return (
            <div className="hello-word">{ this.props.name }</div>
        )
    }
}

ReactDom.render(
    <HelloWord/>,
    document.getElementById('demo6')
)

HelloWord.defaultProps = {
    name: 'Wangcy'
}

HelloWord.propTypes = {
    name: PropTypes.string.isRequired
}