import React, { Component } from 'react'
import Dexie from 'dexie'

import style from './layout.scss?module'

import Query from './query'

const msgStr = '[{"key":"5c77d8a90a28cbae4b8a83b2","rollbackUid":0,"rollbackTime":0,"rich":{},"messageId":"5c77d8a90a28cbae4b8a83b2","channelId":"3627113299610092560","roomId":"5b4ee58bef31cbd8580d4cc5","roomType":2,"fromUid":3400001284,"fromUser":{"uid":3400001284,"nickName":"goodman1","photoUrl":"https://static.moschat.com/useravatar/useravatar_3400001284_1539856517322.png"},"atUids":[],"atUsers":[],"sendTime":1551358121734,"messageType":1,"cmid":"18d870b4-6998-4f19-8931-2fecec435416","text":"[videoupload w=\\"1920\\" h=\\"1080\\" duration=\\"36.409\\" size=\\"27680599\\" cover=\\"img_3400001284_1551354121663.jpeg\\" name=\\"high 2019-01-29 20-59-11.mp4\\"]video_3400001284_1551354121408.mp4[/videoupload]","model":{"type":5,"modelData":{"gambleResult":-1}},"extendInfo":{"shareType":1}},{"key":"5c77d8a9ef31cb4d96944884","rollbackUid":0,"rollbackTime":0,"rich":{},"messageId":"5c77d8a9ef31cb4d96944884","channelId":"3627113299610092560","roomId":"5b4ee58bef31cbd8580d4cc5","roomType":2,"fromUid":3400001284,"fromUser":{"uid":3400001284,"nickName":"goodman1","photoUrl":"https://static.moschat.com/useravatar/useravatar_3400001284_1539856517322.png"},"atUids":[],"atUsers":[],"sendTime":1551358121514,"messageType":1,"cmid":"cc66a254-4818-40e2-8422-1d08022841d4","text":"[videoupload w=\\"1920\\" h=\\"1080\\" duration=\\"36.409\\" size=\\"27680599\\" cover=\\"img_3400001284_1551354121663.jpeg\\" name=\\"high 2019-01-29 20-59-11.mp4\\"]video_3400001284_1551354121408.mp4[/videoupload]","model":{"type":5,"modelData":{"gambleResult":-1}},"extendInfo":{"shareType":1}},{"key":"5c77d903ef31cb4d96944885","rollbackUid":0,"rollbackTime":0,"rich":{},"messageId":"5c77d903ef31cb4d96944885","channelId":"3627113299610092560","roomId":"5b4ee58bef31cbd8580d4cc5","roomType":2,"fromUid":3400001284,"fromUser":{"uid":3400001284,"nickName":"goodman1","photoUrl":"https://static.moschat.com/useravatar/useravatar_3400001284_1539856517322.png"},"atUids":[],"atUsers":[],"sendTime":1551358211689,"messageType":1,"cmid":"b3de5c48-0548-4c66-b728-d8b66caa2bf4","text":"[videoupload w=\\"1920\\" h=\\"1080\\" duration=\\"125.319\\" size=\\"100571174\\" cover=\\"img_3400001284_1551358152183.jpeg\\" name=\\"high 2019-01-26 17-13-19.mp4\\"]video_3400001284_1551358151787.mp4[/videoupload]","model":{"type":5,"modelData":{"gambleResult":-1}},"extendInfo":{"shareType":1}},{"key":"5c77d9070a28cbae4b8a83b3","rollbackUid":0,"rollbackTime":0,"rich":{},"messageId":"5c77d9070a28cbae4b8a83b3","channelId":"3627113299610092560","roomId":"5b4ee58bef31cbd8580d4cc5","roomType":2,"fromUid":3400001284,"fromUser":{"uid":3400001284,"nickName":"goodman1","photoUrl":"https://static.moschat.com/useravatar/useravatar_3400001284_1539856517322.png"},"atUids":[],"atUsers":[],"sendTime":1551358215397,"messageType":1,"cmid":"8fa7e88b-8e59-4f25-a722-c24018c36dca","text":"[videoupload w=\\"1920\\" h=\\"1080\\" duration=\\"125.319\\" size=\\"100571174\\" cover=\\"img_3400001284_1551358152052.jpeg\\" name=\\"high 2019-01-26 17-13-19.mp4\\"]video_3400001284_1551358151675.mp4[/videoupload]","model":{"type":5,"modelData":{"gambleResult":-1}},"extendInfo":{"shareType":1}},{"key":"5c77d94bef31cb4d96944886","rollbackUid":0,"rollbackTime":0,"rich":{},"messageId":"5c77d94bef31cb4d96944886","channelId":"3627113299610092560","roomId":"5b4ee58bef31cbd8580d4cc5","roomType":2,"fromUid":3400001284,"fromUser":{"uid":3400001284,"nickName":"goodman1","photoUrl":"https://static.moschat.com/useravatar/useravatar_3400001284_1539856517322.png"},"atUids":[],"atUsers":[],"sendTime":1551358283751,"messageType":1,"cmid":"2598d4ec-f453-476a-af24-b06c703a3774","text":"333"},{"key":"5c77d94c0a28cbae4b8a83b4","rollbackUid":0,"rollbackTime":0,"rich":{},"messageId":"5c77d94c0a28cbae4b8a83b4","channelId":"3627113299610092560","roomId":"5b4ee58bef31cbd8580d4cc5","roomType":2,"fromUid":3400001284,"fromUser":{"uid":3400001284,"nickName":"goodman1","photoUrl":"https://static.moschat.com/useravatar/useravatar_3400001284_1539856517322.png"},"atUids":[],"atUsers":[],"sendTime":1551358284875,"messageType":1,"cmid":"80b264f8-7192-42af-8225-b92d3f06bee3","text":"44"},{"key":"5c77d9540a28cbae4b8a83b5","rollbackUid":0,"rollbackTime":0,"rich":{},"messageId":"5c77d9540a28cbae4b8a83b5","channelId":"3627113299610092560","roomId":"5b4ee58bef31cbd8580d4cc5","roomType":2,"fromUid":3400001284,"fromUser":{"uid":3400001284,"nickName":"goodman1","photoUrl":"https://static.moschat.com/useravatar/useravatar_3400001284_1539856517322.png"},"atUids":[],"atUsers":[],"sendTime":1551358292448,"messageType":1,"cmid":"354738fb-9292-45bf-b9dc-5cce9aff9354","text":"[videoupload w=\\"1920\\" h=\\"1080\\" duration=\\"125.319\\" size=\\"100571174\\" cover=\\"img_3400001284_1551358152052.jpeg\\" name=\\"high 2019-01-26 17-13-19.mp4\\"]video_3400001284_1551358151675.mp4[/videoupload]","model":{"type":5,"modelData":{"gambleResult":-1}},"extendInfo":{"shareType":1}},{"key":"5c77d954ef31cb4d96944887","rollbackUid":0,"rollbackTime":0,"rich":{},"messageId":"5c77d954ef31cb4d96944887","channelId":"3627113299610092560","roomId":"5b4ee58bef31cbd8580d4cc5","roomType":2,"fromUid":3400001284,"fromUser":{"uid":3400001284,"nickName":"goodman1","photoUrl":"https://static.moschat.com/useravatar/useravatar_3400001284_1539856517322.png"},"atUids":[],"atUsers":[],"sendTime":1551358292274,"messageType":1,"cmid":"50820cc0-bb0d-46f8-8256-4d3f803d6062","text":"[videoupload w=\\"1920\\" h=\\"1080\\" duration=\\"125.319\\" size=\\"100571174\\" cover=\\"img_3400001284_1551358152052.jpeg\\" name=\\"high 2019-01-26 17-13-19.mp4\\"]video_3400001284_1551358151675.mp4[/videoupload]","model":{"type":5,"modelData":{"gambleResult":-1}},"extendInfo":{"shareType":1}},{"key":"5c77d97a0a28cbae4b8a83b8","rollbackUid":0,"rollbackTime":0,"rich":{},"messageId":"5c77d97a0a28cbae4b8a83b8","channelId":"3627113299610092560","roomId":"5b4ee58bef31cbd8580d4cc5","roomType":2,"fromUid":3400001284,"fromUser":{"uid":3400001284,"nickName":"goodman1","photoUrl":"https://static.moschat.com/useravatar/useravatar_3400001284_1539856517322.png"},"atUids":[],"atUsers":[],"sendTime":1551358330241,"messageType":1,"cmid":"ad3b3514-248c-4d37-80be-a313934c6aca","text":"asdfasdf"},{"key":"5c77d97bef31cb4d9694488a","rollbackUid":0,"rollbackTime":0,"rich":{},"messageId":"5c77d97bef31cb4d9694488a","channelId":"3627113299610092560","roomId":"5b4ee58bef31cbd8580d4cc5","roomType":2,"fromUid":3400001284,"fromUser":{"uid":3400001284,"nickName":"goodman1","photoUrl":"https://static.moschat.com/useravatar/useravatar_3400001284_1539856517322.png"},"atUids":[],"atUsers":[],"sendTime":1551358331644,"messageType":1,"cmid":"ebf8e459-aa78-4878-8900-2031e658fb30","text":"asfasf"},{"key":"5c77d9840a28cbae4b8a83b9","rollbackUid":0,"rollbackTime":0,"rich":{},"messageId":"5c77d9840a28cbae4b8a83b9","channelId":"3627113299610092560","roomId":"5b4ee58bef31cbd8580d4cc5","roomType":2,"fromUid":3400001284,"fromUser":{"uid":3400001284,"nickName":"goodman1","photoUrl":"https://static.moschat.com/useravatar/useravatar_3400001284_1539856517322.png"},"atUids":[],"atUsers":[],"sendTime":1551358340611,"messageType":1,"cmid":"f301102d-ae6e-4358-8a1c-aad66f423cf6","text":"[videoupload w=\\"1920\\" h=\\"1080\\" duration=\\"36.409\\" size=\\"27680599\\" cover=\\"img_3400001284_1551354121663.jpeg\\" name=\\"high 2019-01-29 20-59-11.mp4\\"]video_3400001284_1551354121408.mp4[/videoupload]","model":{"type":5,"modelData":{"gambleResult":-1}},"extendInfo":{"shareType":1}},{"key":"5c77d984ef31cb4d9694488b","rollbackUid":0,"rollbackTime":0,"rich":{},"messageId":"5c77d984ef31cb4d9694488b","channelId":"3627113299610092560","roomId":"5b4ee58bef31cbd8580d4cc5","roomType":2,"fromUid":3400001284,"fromUser":{"uid":3400001284,"nickName":"goodman1","photoUrl":"https://static.moschat.com/useravatar/useravatar_3400001284_1539856517322.png"},"atUids":[],"atUsers":[],"sendTime":1551358340747,"messageType":1,"cmid":"2b869ed5-29f1-49c6-99cb-408f13cf8f5d","text":"[videoupload w=\\"1920\\" h=\\"1080\\" duration=\\"36.409\\" size=\\"27680599\\" cover=\\"img_3400001284_1551354121663.jpeg\\" name=\\"high 2019-01-29 20-59-11.mp4\\"]video_3400001284_1551354121408.mp4[/videoupload]","model":{"type":5,"modelData":{"gambleResult":-1}},"extendInfo":{"shareType":1}},{"key":"5c77ddcb0a28cbae4b8a83be","rollbackUid":0,"rollbackTime":0,"rich":{},"messageId":"5c77ddcb0a28cbae4b8a83be","channelId":"3627113299610092560","roomId":"5b4ee58bef31cbd8580d4cc5","roomType":2,"fromUid":3400001284,"fromUser":{"uid":3400001284,"nickName":"goodman1","photoUrl":"https://static.moschat.com/useravatar/useravatar_3400001284_1539856517322.png"},"atUids":[],"atUsers":[],"sendTime":1551359435544,"messageType":1,"cmid":"a7eff93c-9a29-4d9a-889a-822b891f4099","text":"[videoupload w=\\"1920\\" h=\\"1080\\" duration=\\"36.409\\" size=\\"27680599\\" cover=\\"img_3400001284_1551354121663.jpeg\\" name=\\"high 2019-01-29 20-59-11.mp4\\"]video_3400001284_1551354121408.mp4[/videoupload]","extendInfo":{"shareType":1}},{"key":"5c77ddcb0a28cbae4b8a83bf","rollbackUid":0,"rollbackTime":0,"rich":{},"messageId":"5c77ddcb0a28cbae4b8a83bf","channelId":"3627113299610092560","roomId":"5b4ee58bef31cbd8580d4cc5","roomType":2,"fromUid":3400001284,"fromUser":{"uid":3400001284,"nickName":"goodman1","photoUrl":"https://static.moschat.com/useravatar/useravatar_3400001284_1539856517322.png"},"atUids":[],"atUsers":[],"sendTime":1551359435685,"messageType":1,"cmid":"b3839427-7360-4fcd-8751-a54483fdb430","text":"[videoupload w=\\"1920\\" h=\\"1080\\" duration=\\"36.409\\" size=\\"27680599\\" cover=\\"img_3400001284_1551354121663.jpeg\\" name=\\"high 2019-01-29 20-59-11.mp4\\"]video_3400001284_1551354121408.mp4[/videoupload]","extendInfo":{"shareType":1}},{"key":"5c77ddcbef31cb4d96944891","rollbackUid":0,"rollbackTime":0,"rich":{},"messageId":"5c77ddcbef31cb4d96944891","channelId":"3627113299610092560","roomId":"5b4ee58bef31cbd8580d4cc5","roomType":2,"fromUid":3400001284,"fromUser":{"uid":3400001284,"nickName":"goodman1","photoUrl":"https://static.moschat.com/useravatar/useravatar_3400001284_1539856517322.png"},"atUids":[],"atUsers":[],"sendTime":1551359435544,"messageType":1,"cmid":"950269fa-3ad2-4b8a-8f67-4ad5301279a8","text":"[videoupload w=\\"1920\\" h=\\"1080\\" duration=\\"36.409\\" size=\\"27680599\\" cover=\\"img_3400001284_1551354121663.jpeg\\" name=\\"high 2019-01-29 20-59-11.mp4\\"]video_3400001284_1551354121408.mp4[/videoupload]","extendInfo":{"shareType":1}},{"key":"5c77dde50a28cbae4b8a83c0","rollbackUid":0,"rollbackTime":0,"rich":{},"messageId":"5c77dde50a28cbae4b8a83c0","channelId":"3627113299610092560","roomId":"5b4ee58bef31cbd8580d4cc5","roomType":2,"fromUid":3400001284,"fromUser":{"uid":3400001284,"nickName":"goodman1","photoUrl":"https://static.moschat.com/useravatar/useravatar_3400001284_1539856517322.png"},"atUids":[],"atUsers":[],"sendTime":1551359461698,"messageType":1,"cmid":"9b7eed1f-9ab4-4d8b-a2a2-e6072b9c804d","text":"[videoupload w=\\"1920\\" h=\\"1080\\" duration=\\"36.409\\" size=\\"27680599\\" cover=\\"img_3400001284_1551354121663.jpeg\\" name=\\"high 2019-01-29 20-59-11.mp4\\"]video_3400001284_1551354121408.mp4[/videoupload]","extendInfo":{"shareType":1}},{"key":"5c77dde5ef31cb4d96944892","rollbackUid":0,"rollbackTime":0,"rich":{},"messageId":"5c77dde5ef31cb4d96944892","channelId":"3627113299610092560","roomId":"5b4ee58bef31cbd8580d4cc5","roomType":2,"fromUid":3400001284,"fromUser":{"uid":3400001284,"nickName":"goodman1","photoUrl":"https://static.moschat.com/useravatar/useravatar_3400001284_1539856517322.png"},"atUids":[],"atUsers":[],"sendTime":1551359461521,"messageType":1,"cmid":"a051a0d1-a064-4b12-86aa-727422caff81","text":"[videoupload w=\\"1920\\" h=\\"1080\\" duration=\\"36.409\\" size=\\"27680599\\" cover=\\"img_3400001284_1551354121663.jpeg\\" name=\\"high 2019-01-29 20-59-11.mp4\\"]video_3400001284_1551354121408.mp4[/videoupload]","extendInfo":{"shareType":1}},{"key":"5c77dde5ef31cb4d96944893","rollbackUid":0,"rollbackTime":0,"rich":{},"messageId":"5c77dde5ef31cb4d96944893","channelId":"3627113299610092560","roomId":"5b4ee58bef31cbd8580d4cc5","roomType":2,"fromUid":3400001284,"fromUser":{"uid":3400001284,"nickName":"goodman1","photoUrl":"https://static.moschat.com/useravatar/useravatar_3400001284_1539856517322.png"},"atUids":[],"atUsers":[],"sendTime":1551359461919,"messageType":1,"cmid":"3eb972c5-07d5-471d-a0c9-2b97eb2d494d","text":"[videoupload w=\\"1920\\" h=\\"1080\\" duration=\\"36.409\\" size=\\"27680599\\" cover=\\"img_3400001284_1551354121663.jpeg\\" name=\\"high 2019-01-29 20-59-11.mp4\\"]video_3400001284_1551354121408.mp4[/videoupload]","extendInfo":{"shareType":1}},{"key":"5c77de230a28cbae4b8a83c1","rollbackUid":0,"rollbackTime":0,"rich":{},"messageId":"5c77de230a28cbae4b8a83c1","channelId":"3627113299610092560","roomId":"5b4ee58bef31cbd8580d4cc5","roomType":2,"fromUid":3400001284,"fromUser":{"uid":3400001284,"nickName":"goodman1","photoUrl":"https://static.moschat.com/useravatar/useravatar_3400001284_1539856517322.png"},"atUids":[],"atUsers":[],"sendTime":1551359523160,"messageType":1,"cmid":"9b25f784-45e3-468b-892e-2a870610d453","text":"[videoupload w=\\"1920\\" h=\\"1080\\" duration=\\"33.693\\" size=\\"28081099\\" cover=\\"img_3400001284_1551359495867.jpeg\\" name=\\"high 2019-02-01 16-55-38.mp4\\"]video_3400001284_1551359495654.mp4[/videoupload]","extendInfo":{"shareType":1}},{"key":"5c77de240a28cbae4b8a83c2","rollbackUid":0,"rollbackTime":0,"rich":{},"messageId":"5c77de240a28cbae4b8a83c2","channelId":"3627113299610092560","roomId":"5b4ee58bef31cbd8580d4cc5","roomType":2,"fromUid":3400001284,"fromUser":{"uid":3400001284,"nickName":"goodman1","photoUrl":"https://static.moschat.com/useravatar/useravatar_3400001284_1539856517322.png"},"atUids":[],"atUsers":[],"sendTime":1551359524857,"messageType":1,"cmid":"b9e4db9d-ed1c-44ff-9b7d-dc152fcc177f","text":"[videoupload w=\\"1920\\" h=\\"1080\\" duration=\\"33.693\\" size=\\"28081099\\" cover=\\"img_3400001284_1551359496415.jpeg\\" name=\\"high 2019-02-01 16-55-38.mp4\\"]video_3400001284_1551359496007.mp4[/videoupload]","extendInfo":{"shareType":1}}]'
const msg = JSON.parse(msgStr)

import appImDB from './appImDB'

window.appImDB = appImDB

export default class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      db: null,
      key: ''
    }
  }

  initDB = async () => {
    const db = new Dexie("dexie")
    this.setState({
      db
    })
    db.version(1).stores({
      friends: '++id, name, age, *tags',
      gameSessions: 'id, score',
      message: 'messageId, roomId, roomType, channelId, fromUid, sendTime, messageType'
    })
    //
    db.on('populate', () => {
      db.friends.add({ name: 'A', age: 12, tag: ['hot'] })
      db.friends.add({ name: 'B', age: 14, tag: 'blue' })

      db.message.bulkAdd(msg)
    })
    //
    // const gameId = await db.gameSessions.count() + 1
    // db.gameSessions.add({ id: gameId, score: Math.floor(Math.random() * 60 + 40) })

    db.version(2).stores({
      gameSessions: 'id, score, name'
    }).upgrade(tx => {
      console.log('upgrade 2', tx)
    })

    // const gameId2 = await db.gameSessions.count() + 1
    // //
    // db.gameSessions.add({ id: gameId2, score: Math.floor(Math.random() * 60 + 40), name: 'Dota2' })
    //
    // db.open()

    db.version(3).stores({
      gameSessions: 'id, score, name'
    }).upgrade(tx => {
      console.log('upgrade 3', tx)
      return tx.gameSessions.toCollection().modify(gameSession => {
        console.log('modify', gameSession)
        if (!gameSession.name) {
          gameSession.name = 'Dota1'
        }
      })
    })

    db.version(4).stores({
      gameSessions: 'id, score, name'
    }).upgrade(tx => {
      console.log('upgrade 3', tx)
      return tx.gameSessions.toCollection().modify(gameSession => {
        console.log('modify', gameSession)
        if (!gameSession.name) {
          gameSession.name = 'Dota1'
        }
        gameSession.version = 40
      })
    })

    db.open()
  }

  changeKey = (event) => {
    const key = event.target.value.trim()
    this.setState({
      key
    })
  }

  createStore = async () => {
    const { key } = this.state

    if (!key) {
      throw '请输入store name.'
    }

    const store = await appImDB.createStore(key).catch((err) => {
      console.log('createStore error', key, err)
      throw err
    })

    console.log('createStore success', key, store)
  }

  addData = async () => {
    const count = await appImDB.storeCount()
    console.log('总共条数', count)
    const r = Math.random() > 0.5
    const sendId = Math.floor(Math.random() * 1e5) + ''
    const messageType = r ? 1 : 3

    const sendTime = Date.now()
    const uid = r ? '3400012218' : '3400002345'
    const roomId = r ? '1' : '2'
    const text = 'Hello world'

    await appImDB.storeAdd({ sendId, sendTime, messageType, uid, roomId, text })
  }

  queryIm = async () => {
    const { key } = this.state
    const result = await appImDB.storeQuery(key, 3)
    console.log('查询结果', result)
  }

  deleteIm = async () => {
    const { key } = this.state
    const result = await appImDB.storeDelete(key)
    console.log('删除结果', result)
  }

  deleteImByRoomId = async () => {
    const { key } = this.state
    const result = await appImDB.storeDeleteByRoomId(key)

    console.log('删除结果', result)
  }

  updateIm = async () => {
    const { key } = this.state
    const sendTime = Date.now()
    const uid = '3400015318'
    const text = 'what are you doing?'
    const name = 'update IM'
    const roomId = 1 + Math.floor(Math.random() * 10) + ''
    const result = await appImDB.storeUpdate(key, { sendTime, uid, text, name, roomId })
    console.log('更新数据', result)
  }

  queryAllRoomId = async () => {
    const roomId = await appImDB.storeQueryAllRoomId()
    console.log('查询所有的roomId', roomId)
  }

  queryLast = async () => {
    const result = await appImDB.storeLast()
    console.log('最后一条消息记录', result)
  }

  queryFirst = async () => {
    const result = await appImDB.storeFirst()
    console.log('第一条消息记录', result)
  }

  addMetaStore = async () => {
    const uid = Math.floor(Math.random() * 1e5)
    const offset = Math.floor(uid / 33)
    const idc = 'cn'
    const receiveId = '5c8b140e1f5a89d724547f8b'
    const result = await appImDB.metaStoreAdd({ uid, offset, idc, receiveId })

    console.log('插入数据', result)
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

  componentDidMount () {
    this.initDB()

    appImDB.openDB('3400005555').then((db) => {
      console.log('openDB success', db)
    })
  }

  componentWillUnmount () {
    console.log('componentWillUnmount', this)
  }

  render () {
    const { db, key } = this.state
    return (
      <div className={style.im}>
        <h3>Dexie</h3>
        <Query db={db}/>
        <hr/>
        <div>
          <input type="text" className={style.imKey} value={key} onChange={this.changeKey}/>
          <div>
            <p>Message Store</p>
            <button type={"button"} onClick={ this.createStore }>创建表</button>
            <button type={"button"} onClick={ this.addData }>添加数据</button>
            <button type={"button"} onClick={ this.queryIm }>查询</button>
            <button type={"button"} onClick={ this.deleteIm }>根据sendId删除</button>
            <button type={"button"} onClick={ this.deleteImByRoomId }>根据roomId删除（多条）</button>
            <button type={"button"} onClick={ this.updateIm }>修改</button>
            <button type={"button"} onClick={ this.queryAllRoomId }>查询所有的roomId</button>
            <button type={"button"} onClick={ this.queryLast }>最后一条记录</button>
            <button type={"button"} onClick={ this.queryFirst }>第一条记录</button>
          </div>
          <hr/>
          <div>
            <p>Meta Store</p>
            <button type={"button"} onClick={ this.updateMetaStore }>更新数据</button>
            <button type={"button"} onClick={ this.deleteMetaStore }>删除数据</button>
            <button type={"button"} onClick={ this.queryMetaStore }>查询数据</button>
          </div>
        </div>
      </div>
    )
  }
}
