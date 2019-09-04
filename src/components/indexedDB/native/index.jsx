import React, { Component } from 'react'
import { hot } from 'react-hot-loader/root'

import './layout.scss'

const customerData = [
  { ssn: '444', name: 'Bill', age: 35, email: 'bill@company.com' },
  { ssn: '555', name: 'Donna', age: 32, email: 'donna@home.org' }
]

const dbName = 'my_first_indexedDB'
const storeName = 'customers'

let DB
let transaction

class IndexedDBForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      ssn: '',
      age: '',
      email: '',
      head: '',
      validationMessage: '',
      querySnn: '',
      queryResult: null
    }
  }

  addMember = (event) => {
    event.preventDefault()
    if (!this.refs.form.checkValidity()) {
      this.setState({
        validationMessage: '请输入正确的信息'
      })
      return false
    }

    const { ssn, name, age, email } = this.state

    this.setState({
      name: '',
      ssn: '',
      age: '',
      email: '',
      validationMessage: ''
    })

    transaction = DB.transaction([ storeName ], 'readwrite')

    transaction.onabort = (event) => {
      console.log('transaction', event)
    }
    transaction.onerror = (event) => {
      console.log('transaction', event)
    }
    transaction.oncomplete = (event) => {
      console.log('transaction', event, transaction)
    }

    const objectStore = transaction.objectStore(storeName)

    const member = { ssn, name, age, email }

    const request = objectStore.add(member)

    request.onsuccess = (event) => {
      console.log('write success', member)
    }
    request.onerror = (event) => {
      console.log('write error', member)
    }
  }

  updateMember = (event) => {
    event.preventDefault()

    if (!this.refs.form.checkValidity()) {
      this.setState({
        validationMessage: '请输入正确的信息'
      })
      return false
    }

    const { ssn, name, age, email } = this.state

    this.setState({
      name: '',
      ssn: '',
      age: '',
      email: '',
      validationMessage: ''
    })

    const transaction = DB.transaction([ storeName ], 'readwrite')
    const objectStore = transaction.objectStore(storeName)

    const request = objectStore.put({
      name, age, email, ssn
    })

    request.onsuccess = (event) => {
      console.log('put success', event)
    }

    request.onerror = (event) => {
      console.log('put error', event)
    }
  }

  deleteMember = () => {
    const { ssn } = this.state

    const request = DB.transaction([ storeName ], 'readwrite').objectStore(storeName).delete(Number(ssn))

    request.onsuccess = (event) => {
      console.log('delete success', event)
    }
    request.onerror = (event) => {
      console.log('delete error', event)
    }
  }

  getMemberBySnn = () => {
    let { querySnn } = this.state

    if (!querySnn) {
      return
    }

    const request = DB.transaction([ storeName ]).objectStore(storeName).get(querySnn)

    request.onsuccess = (event) => {
      const result = event.target.result
      console.log('getMemberBySnn onsuccess', result)
      this.setState({
        queryResult: result
      })
    }

    request.onerror = (event) => {
      console.error(event)
    }
  }

  getAllMember = () => {
    const members = []

    const openCursor = DB.transaction([ storeName ]).objectStore(storeName).openCursor()

    openCursor.onsuccess = (event) => {
      const cursor = event.target.result
      console.log(cursor)
      if (cursor) {
        members.push(cursor.value)
        cursor.continue()
      } else {
        console.log(members)
      }
    }

    openCursor.onerror = (event) => {

    }
  }

  changeSsn = (event) => {
    this.setState({
      ssn: event.target.value
    })
  }

  changeName = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  changeAge = (event) => {
    this.setState({
      age: event.target.valueAsNumber
    })
  }

  changeEmail = (event) => {
    this.setState({
      email: event.target.value
    })
  }

  changeQuerySnn = (event) => {
    this.setState({
      querySnn: event.target.value
    })
  }


  render () {
    const { ssn, name, age, email, validationMessage, querySnn, queryResult } = this.state

    return (
      <div className="db">
        <div className="db-flex">
          <form action="javascript:;" ref="form">
            <fieldset>
              <legend>增删改查</legend>
              <div>
                <label htmlFor="">ssn:<input type="text" value={ssn} onChange={this.changeSsn} required/></label>
              </div>
              <div>
                <label htmlFor="">name: <input type="text" value={name} onChange={this.changeName} required/></label>
              </div>
              <div>
                <label htmlFor="">Age: <input type="number" value={age} onChange={this.changeAge} required/></label>
              </div>
              <div>
                <label htmlFor="">Email: <input type="email" value={email} onChange={this.changeEmail}
                                                required/></label>
              </div>
              <div><small style={{ 'color': '#ff0000' }}>{validationMessage}</small></div>
              <div>
                <button type="submit" onClick={this.addMember}>addMember</button>
                <button type="button" onClick={this.updateMember}>updateMember</button>
                <button type="button" onClick={this.deleteMember}>deleteMember</button>
                <button type="button" onClick={this.getAllMember}>getAllMember</button>
              </div>
            </fieldset>
          </form>
        </div>
        <hr/>
        <div>
          <div><label htmlFor=""><input type="text" value={querySnn} onChange={this.changeQuerySnn}/></label></div>
          <div>{JSON.stringify(queryResult)}</div>
          <div>
            <button onClick={this.getMemberBySnn}>Query</button>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount () {
    const openReq = indexedDB.open(dbName)
    openReq.onupgradeneeded = (event) => {
      console.log('openReq', event)

      DB = event.target.result

      let objectStore

      if (!DB.objectStoreNames.contains(storeName)) {
        objectStore = DB.createObjectStore('customers', { keyPath: 'ssn' })

        objectStore.createIndex('name', 'name', { unique: false })
        objectStore.createIndex('email', 'email', { unique: true })
      }

      customerData.forEach((item) => {
        objectStore.add(item)
      })
    }
    openReq.onsuccess = (event) => {
      console.log('openReq', event)

      DB = event.target.result
    }
    openReq.onerror = (event) => {
      console.log('openReq', event)
    }
  }
}

export default hot(IndexedDBForm)
