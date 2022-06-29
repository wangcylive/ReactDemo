import React, { Component } from 'react'
import appImDB from './appImDB'

import style from './layout.scss?module'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      key: ''
    }
  }

  async componentDidMount () {

  }

  init = async () => {
    const { key } = this.state
    if (!key) {
      throw 'enter db name.'
    }
    const db = await appImDB.openDB(key)
    console.log('打开数据库', db)
  }

  inputChange = (event) => {
    const key = event.target.value
    this.setState({
      key
    })
  }

  addMessage = async () => {
    const r = Math.random() > 0.5

    const roomIds = [ '5c8c9a981f5a899098756bd3', '5c8c9a981f5a899098745786', '5c8c9a981f5a8990987a332a' ]

    const roomId = roomIds[Math.floor(Math.random() * 3)]

    const text = this.state.key

    const data = {
      appid: "1207472126",
      cmid: "58a74682-2957-4c60-882e-5c0fbd86af13",
      fromUid: 3400001284,
      messageType: r ? 1 : 3,
      meta: {
        idc: "cn",
        offset: 268,
        receiveId: "5c8c9abf1f5a89c8266c309d"
      },
      modelType: 0,
      offset: 268,
      receiveId: "5c8c9abf1f5a89c8266c309d",
      roomId: roomId,
      sendId: Math.floor(Math.random() * 1e6) + '',
      sendTime: Date.now(),
      text,
      uid: 3400001284,
      uids: [3400001284, 3400018046],
      _class: "com.yy.dh.global.imclient.entity.im.ImMessage"
    }

    const result = await appImDB.storeAdd(data)

    console.log('插入数据', result)
  }

  queryMessage = async () => {
    const { key } = this.state

    const messageType = 1

    const result = await appImDB.storeQuery(key)

    console.log('查询数据', result)
  }

  queryMessageBySendId = async () => {
    const { key } = this.state
    const result = await appImDB.storeQueryBySendId(key)

    console.log('查询数据', result)
  }

  queryMessageByUid = async () => {
    const { key } = this.state
    const result = await appImDB.storeQueryByUid(key)

    console.log('查询数据', result)
  }

  queryMessageFirst = async () => {
    const result = await appImDB.storeFirst()

    console.log('查询第一条数据', result)
  }

  queryMessageLast = async () => {
    const result = await appImDB.storeLast()

    console.log('查询最后一条记录', result)
  }

  queryMessageAllRoomId = async () => {
    const result = await appImDB.storeQueryAllRoomId()

    console.log('查询所有的 roomId', result)
  }

  queryMessageCount = async () => {
    const result = await appImDB.storeCount()

    console.log('查询总共多少条数据', result)
  }

  updateMessage = async () => {
    const { key } = this.state

    const data = {
      sendTime: Date.now(),
      text: '修改数据',
      rollbackTime: Date.now() - 1000,
      name: '呵呵哒',
      sendId: '哈哈'
    }

    const result  = await appImDB.storeUpdate(key, data)

    console.log('更新数据', result)
  }

  deleteMessageByRoomId = async () => {
    const { key } = this.state

    const result = await appImDB.storeDeleteByRoomId(key)

    console.log('删除数据', result)
  }

  deleteMessageBySendId = async () => {
    const { key } = this.state

    const result = await appImDB.storeDelete(key)

    console.log('删除数据', result)
  }

  deleteMetaStore = async () => {
    const { key } = this.state

    const uid = Number(key)

    const result = await appImDB.metaStoreDelete(uid)

    console.log('删除数据', result)
  }

  queryMetaStore = async () => {
    const { key } = this.state

    const uid = Number(key)

    const result = await appImDB.metaStoreQuery(uid)

    console.log('查询数据', result, uid)
  }

  updateMetaStore = async () => {
    const { key } = this.state

    const uid = Number(key) || Math.floor(Math.random() * 1e5)
    const offset = Math.floor(Math.random() * 1e4)
    const idc = 'cn'
    const receiveId = '5c8b140e1f5a89d724547f8b'

    const result = await appImDB.metaStoreUpdate({ uid, offset, idc, receiveId })

    console.log('修改数据', result, uid)
  }

  render () {
    const { key } = this.state

    return (
      <div className={style.cef}>
        <h3>cef Sqlite</h3>

        <p>
          <input type="text" value={key} onChange={ this.inputChange } />
        </p>
        <div>
          <h4>Message store</h4>
          <button typeof={"button"} onClick={ this.init }>初始化数据库</button>
          <button typeof={"button"} onClick={ this.addMessage }>添加数据</button>
          <button typeof={"button"} onClick={ this.queryMessage }>查询数据(roomId, messageType)</button>
          <button type={"button"} onClick={ this.queryMessageBySendId }>查询数据(sendId)</button>
          <button type={"button"} onClick={ this.queryMessageByUid }>查询数据(uid)</button>
          <button typeof={"button"} onClick={ this.queryMessageFirst }>查询第一条数据</button>
          <button typeof={"button"} onClick={ this.queryMessageLast }>查询最后一条数据</button>
          <button typeof={"button"} onClick={ this.queryMessageAllRoomId }>查询所有RoomId</button>
          <button typeof={"button"} onClick={ this.queryMessageCount }>查询数据总数</button>
          <button typeof={"button"} onClick={ this.updateMessage }>更新数据</button>
          <button typeof={"button"} onClick={ this.deleteMessageByRoomId }>删除数据(roomId)</button>
          <button typeof={"button"} onClick={ this.deleteMessageBySendId }>删除数据(sendId)</button>
        </div>
        <hr/>
        <div>
          <h4>Meta store</h4>
          <button typeof={"button"} onClick={ this.updateMetaStore } >更新数据</button>
          <button typeof={"button"} onClick={ this.deleteMetaStore }>删除数据</button>
          <button typeof={"button"} onClick={ this.queryMetaStore }>查询数据</button>
        </div>
      </div>
    )
  }
}

export default App
