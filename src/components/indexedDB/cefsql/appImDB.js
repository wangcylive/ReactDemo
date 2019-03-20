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
    desc: 'varchar(2000)'
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

const metaStoreName = 'meta'
const metaRow = [
  {
    name: 'uid ',
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
    return `select count(*) from sqlite_master where type="table" and name = "${storeName}";`
  },
  createTable (storeName, row) {
    return `create table ${storeName} (${row.map(({ name, desc }) => (name + ' ' + desc)).join(', ')});`
  },
  insertMessage (data) {
    let { sendId, appid, cmid, messageType, offset, receiveId, roomId, sendTime, rollbackTime = 0, text, uid, uids, meta, model, moreType = '', extendInfo } = data

    sendTime = sendTime + ''
    rollbackTime = rollbackTime + ''
    uids = JSON.stringify(uids)
    meta = JSON.stringify(meta)
    model = JSON.stringify(model) || ''
    extendInfo = JSON.stringify(extendInfo) || ''

    return `insert into ${messageStoreName} values ("${sendId}", "${appid}", "${cmid}", ${messageType}, ${offset}, "${receiveId}",
    "${roomId}", "${sendTime}", "${rollbackTime}", "${text}", ${uid}, '${uids}', '${meta}', '${model}', "${moreType}", '${extendInfo}');`
  },
  updateMessage (sendId, data) {
    const setColumn = []
    for (let [key, value] of Object.entries(data)) {
      if (key !== 'sendId') {
        if (typeof value === 'object') {
          value = JSON.stringify(value)
        }
        if (key === 'sendTime' || key === 'rollbackTime') {
          value = value + ''
        }
        if (typeof value === 'string') {
          value = `"${value}"`
        }
        setColumn.push(`${key} = ${value}`)
      }
    }

    return `update ${messageStoreName} set ${setColumn.join(', ')} where sendId = "${encodeURI(sendId)}";`
  },
  deleteMessageBySendId (sendId) {
    return `delete from ${messageStoreName} where sendId = "${encodeURI(sendId)}";`
  },
  deleteMessageByRoomId (roomId) {
    return `delete from ${messageStoreName} where roomId = "${encodeURI(roomId)}";`
  },
  queryMessage (roomId, messageType) {
    let and = ''
    if (typeof messageType === 'number') {
      and = ` and messageType = ${messageType}`
    }
    return `select * from ${messageStoreName} where roomId = "${encodeURI(roomId)}"${and} order by sendTime ASC;`
  },
  queryFirst () {
    return `select * from ${messageStoreName} order by sendTime asc limit 1;`
  },
  queryLast () {
    return `select * from ${messageStoreName} order by sendTime desc limit 1;`
  },
  queryDistinctColumn (column) {
    return `select distinct ${column} from ${messageStoreName};`
  },
  queryCount () {
    return `select count(1) from ${messageStoreName};`
  },
  insertMeta (data) {
    const { uid } = data
    const meta = JSON.stringify(data)

    return `insert into ${metaStoreName} values ("${uid}", '${meta}');`
  },
  updateMeta (uid, data) {
    const meta = JSON.stringify(data)
    return `update ${metaStoreName} set meta = '${meta}' where uid = "${uid}";`
  },
  deleteMeta (uid) {
    return `delete from ${metaStoreName} where uid = "${uid}";`
  },
  queryMeta (uid) {
    return `select * from ${metaStoreName} where uid = "${uid}";`
  }
}

/**
 * 执行 Sqlite 语句
 * @param statement
 * @returns {Promise<*>}
 */
async function sqlExec (statement) {
  const result = await YY.Sqlite.execSql(statement).catch(() => throw 'Sqlite exec error.')
  if (result && result.result === 0) {
    return result.data
  }
  throw 'Sqlite exec error.'
}

/**
 * 判断表是否存在
 * @param storeName {string}
 * @returns {Promise<boolean>}
 */
async function existStore (storeName) {
  const result  = await sqlExec(sqlStatement.tableCount(storeName))
  return result[0]['count(*)'] > 0
}

/**
 * 格式化 message，保存数据时不支持类型使用字符串，读取数据需要还原类型
 * @param array
 * @returns {*}
 */
function messageFormat (array) {
  return array.map((item) => {
    let { uids, meta, model, extendInfo, sendTime, rollbackTime } = item

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
    return Object.assign(item, { uids, meta, model, extendInfo, sendTime, rollbackTime })
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
      await sqlExec(sqlStatement.insertMessage(arr[i]))
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

    return sqlExec(sqlStatement.queryDistinctColumn('roomId'))
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
    return result[0]['count(1)']
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
