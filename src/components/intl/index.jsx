import React, { Component } from 'react'
import { IntlProvider, FormattedMessage, FormattedDate, FormattedTime, injectIntl } from 'react-intl'
import zh from './lang/zh'
import en from './lang/en'

const allMessages = {
  zh,
  en
}

function View (props) {
  const intl = props.intl
  const formatTime = intl.formatTime(new Date())
  const hello = intl.formatMessage({ id: 'hello' }, { name: 'js', date: intl.formatDate(new Date()) })
  return (
    <div>
      <div>{intl.messages.year}</div>
      <div>formatTime: {formatTime}</div>
      <div>formatMessage: {hello}</div>
    </div>
  )
}

const ViewIntl = injectIntl(View)

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      lang: 'zh',
      name: 'wcy'
    }
  }

  onChangeLang = () => {
    this.setState((state) => {
      return {
        lang: state.lang === 'zh' ? 'en' : 'zh'
      }
    })
  }

  componentDidMount () {
    React.createElement(FormattedTime, {
      value: new Date()
    })
  }

  render () {
    const messages = allMessages[this.state.lang]
    return (
      <IntlProvider locale={this.state.lang} messages={messages}>
        <div>
          <div>Intl</div>
          <button onClick={this.onChangeLang}>change lang</button>
          <ViewIntl/>
          <div>
            <FormattedMessage id="hello" values={{name: <i>{this.state.name}</i>, date: <FormattedTime value={new Date()}/>}}/>
            <div>
              <FormattedDate value={new Date()}/>
              <FormattedTime value={new Date()}/>
            </div>
            <div dangerouslySetInnerHTML={{__html: this.state.name}}/>
          </div>
        </div>
      </IntlProvider>
    )
  }
}

export default App
