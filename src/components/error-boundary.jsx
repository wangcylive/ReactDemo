import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props) {
      this.setState({
        hasError: false,
      })
    }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      error,
      errorInfo,
    })
  }

  onReload = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
  }

  render() {
    const {hasError, error, errorInfo} = this.state
    if (hasError) {
      return (
        <div>
          {(error?.code === 'MODULE_NOT_FOUND' || error?.name === 'ChunkLoadError') && (
            <button onClick={this.onReload}>点击重新加载</button>
          )}
          <details style={{whiteSpace: 'pre-wrap'}}>
            <summary>Page Error</summary>
            {error && error.toString()}
            <br />
            {errorInfo?.componentStack}
          </details>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
