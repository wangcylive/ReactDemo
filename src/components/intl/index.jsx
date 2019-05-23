import React, { Component } from 'react'
import { IntlProvider, addLocaleData, FormattedMessage, FormattedDate, FormattedTime, defineMessages } from 'react-intl'
import { formatMessage } from 'react-intl/src/format'
import localDataZh from 'react-intl/locale-data/zh'
import zh from './lang/zh'
import en from './lang/en'

addLocaleData(localDataZh)

const allMessages = {
  zh,
  en
}

function View (props) {
  return (
    <div>{props.messages.year}</div>
  )
}

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
    const a = React.createElement(FormattedTime, {
      value: new Date()
    })

    console.log(a)
  }

  render () {
    const messages = allMessages[this.state.lang]

    // const des = new defineMessages({
    //   name: {
    //     id: 'hello'
    //   }
    // })
    //
    // const str = formatMessage(des.name, { name: 'wwww' })

    // console.log(str)
    return (
      <IntlProvider locale="zh" messages={messages}>
        <div>
          <div>Intl</div>
          <button onClick={this.onChangeLang}>change lang</button>
          <View messages={messages}/>
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