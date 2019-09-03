import React from 'react'

class LoadableErrorBoundary extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      errorStatus: 0
    }
  }

  reload = () => {
    this.setState({
      errorStatus: 0
    })
  }

  static getDerivedStateFromError (error) {
    console.log('getDerivedStateFromError', JSON.stringify(error))
    let errorStatus = 1
    if (error && error.request) {
      errorStatus = 2
    }
    return { errorStatus }
  }

  componentDidCatch (error, errorInfo) {
    console.log('componentDidCatch', JSON.stringify(error), JSON.stringify(errorInfo))
  }

  render () {
    const errorStatus = this.state.errorStatus
    if (errorStatus === 2) {
      return <div>页面加载错误 <button onClick={this.reload}>点击重新加载</button></div>
    }
    if (errorStatus === 1) {
      return <div>Error.</div>
    }
    return this.props.children
  }
}

export default LoadableErrorBoundary
