/* global YY */
import escapeString from 'sql-escape-string'

function sqlFormat (sql, values) {
  let i = 0
  return sql.replace(/(\?\?*|@)/g, (match) => {
    let value = values[i++] || ''
    if (typeof value === 'string') {
      if (match !== '@') {
        if (match.length === 1) {
          value = escapeString(value)
        } else {
          value = `[${value}]`
        }
      }
    } else if (typeof value === 'object') {
      value = escapeString(JSON.stringify(value))
    }
    return value
  })
}

const messageStoreName = 'message'
const messageRow = [
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
    desc: 'bigint'
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
    name: 'sendTime',
    desc: 'varchar(255)'
  },
  {
    name: 'rollbackTime',
    desc: 'varchar(255)'
  },
  {
    name: 'text',
    desc: 'varchar(4000)'
  },
  {
    name: 'uid',
    desc: 'varchar(255)'
  },
  {
    name: 'uids',
    desc: 'varchar(255)' // JSON stringify
  },
  {
    name: 'meta',
    desc: 'varchar(2000)' // JSON stringify
  },
  {
    name: 'model',
    desc: 'varchar(4000)' // JSON stringify
  },
  {
    name: 'moreType',
    desc: 'varchar(2000)'
  },
  {
    name: 'extendInfo',
    desc: 'varchar(4000)' // JSON stringify
  }
]
const messageRowKeys = messageRow.map(({ name }) => name)
const updateMessageRowKeys = [...messageRowKeys] // update 不能包含 primary key
updateMessageRowKeys.shift()

const metaStoreName = 'meta'
const metaRow = [
  {
    name: 'uid',
    desc: 'varchar(255) not null primary key'
  },
  {
    name: 'meta',
    desc: 'varchar(2000)' // JSON stringify
  }
]

/**
 * 生成 Sqlite 语句
 */
const sqlStatement = {
  tableCount (storeName) {
    return sqlFormat('SELECT COUNT(*) FROM sqlite_master WHERE type="table" and name = ?;', [ storeName ])
  },
  createTable (storeName, row) {
    const setRow = row.map(({ name, desc }) => (name + ' ' + desc)).join(', ')

    return sqlFormat('CREATE TABLE ? (@);', [ storeName, setRow ])
  },
  insertMessage (data) {
    let { sendId, appid, cmid = '', messageType, offset, receiveId, roomId, sendTime, rollbackTime = 0, text, uid, uids, meta, model = {}, moreType = '', extendInfo = {} } = data

    const values = [ messageStoreName, sendId, appid, cmid, messageType, offset, receiveId, roomId, sendTime, rollbackTime, text, uid, uids, meta, model, moreType, extendInfo ]

    return sqlFormat('INSERT INTO ? VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', values)
  },
  updateMessage (sendId, data) {
    const setColumn = []
    for (let [key, value] of Object.entries(data)) {
      if (updateMessageRowKeys.includes(key)) {
        if (typeof value === 'object') {
          value = JSON.stringify(value)
        }
        if (key === 'sendTime' || key === 'rollbackTime') {
          value = value + ''
        }
        if (typeof value === 'string') {
          value = escapeString(value)
        }
        setColumn.push(`[${key}] = ${value}`)
      }
    }

    return sqlFormat('UPDATE ? SET @ WHERE [sendId] = ?;', [ messageStoreName, setColumn.join(', '), sendId ])
  },
  deleteMessageBySendId (sendId) {
    return sqlFormat('DELETE FROM ? WHERE sendId = ?;', [ messageStoreName, sendId ])
  },
  deleteMessageByRoomId (roomId) {
    return sqlFormat('DELETE FROM ? WHERE roomId = ?;', [ messageStoreName, roomId ])
  },
  queryMessage (roomId, messageType) {
    if (typeof messageType === 'number') {
      return sqlFormat('SELECT * FROM ? WHERE roomId = ? AND messageType = ? ORDER BY sendTime ASC;', [ messageStoreName, roomId, messageType ])
    }
    return sqlFormat('SELECT * FROM ? WHERE roomId = ? ORDER BY sendTime ASC;', [ messageStoreName, roomId ])
  },
  queryMessageBySendId (sendId) {
    return sqlFormat('SELECT * FROM ? WHERE sendId = ?;', [ messageStoreName, sendId ])
  },
  queryMessageByUid (uid) {
    return sqlFormat('SELECT * FROM ? WHERE uid = ? ORDER BY sendTime ASC;', [ messageStoreName, uid ])
  },
  queryFirst () {
    return sqlFormat('SELECT * FROM ? ORDER BY sendTime ASC LIMIT 1;', [ messageStoreName ])
  },
  queryLast () {
    return sqlFormat('SELECT * FROM ? ORDER BY sendTime DESC LIMIT 1;', [ messageStoreName ])
  },
  queryDistinctColumn (column) {
    return sqlFormat('SELECT ? FROM ? GROUP BY roomId ORDER BY sendTime DESC;', [ column, messageStoreName ])
  },
  queryCount () {
    return sqlFormat('SELECT COUNT(1) FROM ?;', [ messageStoreName ])
  },
  insertMeta (data) {
    const { uid } = data

    return sqlFormat('INSERT INTO ? VALUES (?, ?);', [ metaStoreName, uid, data ])
  },
  updateMeta (uid, data) {
    return sqlFormat('UPDATE ? SET meta = ? WHERE uid = ?;', [ metaStoreName, data, uid ])
  },
  deleteMeta (uid) {
    return sqlFormat('DELETE FROM ? WHERE uid = ?;', [ metaStoreName, uid ])
  },
  queryMeta (uid) {
    return sqlFormat('SELECT * FROM ? WHERE uid = ?;', [ metaStoreName, uid ])
  }
}

/**
 * 执行 Sqlite 语句
 * @param statement
 * @returns {Promise<*>}
 */
async function sqlExec (statement) {
  const result = await YY.Sqlite.execSql(statement).catch(() => {
    throw new Error('Sqlite exec error.')
  })
  if (result && result.result === 0) {
    return result.data
  }
  throw new Error('Sqlite exec error.')
}

/**
 * 判断表是否存在
 * @param storeName {string}
 * @returns {Promise<boolean>}
 */
async function existStore (storeName) {
  const result = await sqlExec(sqlStatement.tableCount(storeName))
  return result[0]['COUNT(*)'] > 0
}

/**
 * 格式化 message，保存数据时不支持类型使用字符串，读取数据需要还原类型
 * @param array
 * @returns {*}
 */
function messageFormat (array) {
  return array.map((item) => {
    let { uid, uids, text, meta, model, extendInfo, sendTime, rollbackTime } = item

    uid = Number(uid)
    sendTime = Number(sendTime)
    rollbackTime = Number(rollbackTime)

    try {
      uids = JSON.parse(uids)
    } catch (e) {
      uids = []
    }
    try {
      meta = JSON.parse(meta)
    } catch (e) {
      meta = {}
    }
    try {
      model = JSON.parse(model)
    } catch (e) {
      model = {}
    }
    try {
      extendInfo = JSON.parse(extendInfo)
    } catch (e) {
      extendInfo = {}
    }
    return Object.assign(item, { uid, uids, text, meta, model, extendInfo, sendTime, rollbackTime })
  })
}

/**
 * 打印日志
 * @param callerName {string} 方法名称
 * @param args {object} 方法参数
 */
function _console (callerName, args) {
  console.log('appImDB', callerName, ...args, Date.now())
}

export default class {
  /**
   * 打开数据库，创建message、meta表
   * @param dbName {string} 数据库名称，使用uid创建
   * @returns {Promise<void>}
   */
  static async openDB (dbName) {
    _console('openDB', arguments)
    await YY.Sqlite.open(dbName + '')

    const hasMessageStore = await existStore(messageStoreName)
    if (!hasMessageStore) {
      await sqlExec(sqlStatement.createTable(messageStoreName, messageRow))
    }

    const hasMetaStore = await existStore(metaStoreName)
    if (!hasMetaStore) {
      await sqlExec(sqlStatement.createTable(metaStoreName, metaRow))
    }
  }

  /**
   * message 表添加数据
   * @param data {object|array}
   * @returns {Promise<void>}
   */
  static async storeAdd (data) {
    _console('storeAdd', arguments)
    const arr = []
    if (!Array.isArray(data)) {
      arr.push(data)
    } else {
      arr.push(...data)
    }

    for (let i = 0; i < arr.length; i++) {
      const statement = sqlStatement.insertMessage(arr[i])
      await sqlExec(statement).catch(() => {
        console.error('sql exec error. ', statement)
      })
    }
  }

  /**
   * message 表根据 roomId 删除数据
   * @param roomId
   * @returns {Promise<*>}
   */
  static async storeDeleteByRoomId (roomId) {
    _console('storeDeleteByRoomId', arguments)
    return sqlExec(sqlStatement.deleteMessageByRoomId(roomId))
  }

  /**
   * message 表查询所有的 roomId
   * @returns {Promise<*>}
   */
  static async storeQueryAllRoomId () {
    _console('storeQueryAllRoomId', arguments)

    const result = await sqlExec(sqlStatement.queryDistinctColumn('roomId'))
    const ids = new Set()
    result.forEach(({ roomId }) => {
      if (roomId) {
        ids.add(roomId)
      }
    })
    return [...ids]
  }

  /**
   * message 表查询第一条数据
   * @returns {Promise<*>}
   */
  static async storeFirst () {
    _console('storeFirst', arguments)
    const result = await sqlExec(sqlStatement.queryFirst())
    if (result.length) {
      return messageFormat(result)[0]
    }
  }

  /**
   * message 表查询最后一条数据
   * @returns {Promise<*>}
   */
  static async storeLast () {
    _console('storeLast', arguments)
    const result = await sqlExec(sqlStatement.queryLast())
    if (result.length) {
      return messageFormat(result)[0]
    }
  }

  /**
   * message 表更新数据
   * @param sendId {string}
   * @param data {object}
   * @returns {Promise<*>}
   */
  static async storeUpdate (sendId, data) {
    _console('storeUpdate', arguments)

    return sqlExec(sqlStatement.updateMessage(sendId, data))
  }

  /**
   * message 表根据 sendId 删除数据
   * @param sendId {string}
   * @returns {Promise<*>}
   */
  static async storeDelete (sendId) {
    _console('storeDelete', arguments)
    return sqlExec(sqlStatement.deleteMessageBySendId(sendId))
  }

  /**
   * message 表查询数据条数
   * @returns {Promise<*>}
   */
  static async storeCount () {
    _console('storeCount', arguments)
    const result = await sqlExec(sqlStatement.queryCount())
    return result[0]['COUNT(1)']
  }

  /**
   * message 表查询数据
   * @param roomId {string}
   * @param messageType {number?}
   * @returns {Promise<*>}
   */
  static async storeQuery (roomId, messageType) {
    _console('storeQuery', arguments)
    const result = await sqlExec(sqlStatement.queryMessage(roomId, messageType))
    return messageFormat(result)
  }

  /**
   * message 表根据 sendId 查询数据
   * @param sendId {string}
   * @returns {Promise<*>}
   */
  static async storeQueryBySendId (sendId) {
    _console('stateQueryBySendId', arguments)
    const result = await sqlExec(sqlStatement.queryMessageBySendId(sendId))
    return messageFormat(result)[0]
  }

  /**
   * message 表根据 uid 查询数据
   * @param uid {number}
   * @returns {Promise<*>}
   */
  static async storeQueryByUid (uid) {
    _console('storeQueryByUid', arguments)
    const result = await sqlExec(sqlStatement.queryMessageByUid(uid))
    return messageFormat(result)
  }

  /**
   * meta 表更新数据，之前没有增加，有修改
   * @param data {object}
   * @returns {Promise<*>}
   */
  static async metaStoreUpdate (data) {
    _console('metaStoreUpdate', arguments)
    const { uid } = data
    const curData = await this.metaStoreQuery(uid)
    if (curData) {
      return sqlExec(sqlStatement.updateMeta(uid, Object.assign(curData, data)))
    } else {
      return sqlExec(sqlStatement.insertMeta(data))
    }
  }

  /**
   * meta 表删除数据
   * @param uid {number}
   * @returns {Promise<*>}
   */
  static async metaStoreDelete (uid) {
    _console('metaStoreDelete', arguments)
    return sqlExec(sqlStatement.deleteMeta(uid))
  }

  /**
   * meta 表查询数据
   * @param uid {number}
   * @returns {Promise<*>}
   */
  static async metaStoreQuery (uid) {
    _console('metaStoreQuery', arguments)
    let result = await sqlExec(sqlStatement.queryMeta(uid))
    if (!result.length) {
      return
    }
    try {
      result = JSON.parse(result[0].meta)
    } catch (e) {
      result = {}
    }
    return result
  }
}
