import React, { Component } from 'react'

export default class App extends Component {
  constructor (props) {
    super(props)
  }

  async componentDidMount () {

    console.log('33333')
    const sql = YY.Sqlite.execSql

    const openDB = await YY.Sqlite.open(123456)

    const keys = [
      {
        name: 'sendId',
        desc: 'varchar(255) not null primary key'
      },
      {
        name: 'appid',
        desc: 'varchar(255)'
      },
      {
        name: 'cmid',
        desc: 'varchar(255)'
      },
      {
        name: 'messageType',
        desc: 'tinyint'
      },
      {
        name: 'offset',
        desc: 'int'
      },
      {
        name: 'receiveId',
        desc: 'varchar(255)'
      },
      {
        name: 'roomId',
        desc: 'varchar(255)'
      },
      {
        name: ''
      }
    ]

    const userStoreKey = [
      'sendId varchar(255) not null primary key',
      'appid varchar(255)',
      'cmid varchar(255)',
      'messageType tinyint',
      'offset int',
      'receiveId varchar(255)'
    ]

    // const deleteStore = await sql('drop table company')

    const createStore = await sql('create table company(sendId varchar(255) not null primary key, name varchar(255))')

    const addData = await sql('insert into company values (1, "材哥")')

    const queryData = await sql('select * from company')

    console.log('openDB', openDB, 'createStore', createStore, 'addData', addData, 'queryData', queryData)
  }

  render () {
    return (
      <div>
        CEF
      </div>
    )
  }
}
