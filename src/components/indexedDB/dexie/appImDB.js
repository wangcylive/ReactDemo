import Dexie from 'dexie'

let db = null

let store = null

let metaStore = null

let version = 1

const dbName = 'AppIm'

const storeIndex = 'sendId, sendTime, uid, roomId, messageType, [roomId+messageType]'

const metaStoreName = 'meta'

const metaStoreIndex = 'uid'

const dbUninitialized = new Error('indexedDB uninitialized.')

/**
 * 打印日志
 * @param callerName {string} 方法名称
 * @param args {object} 方法参数
 */
function _console (callerName, args) {
  console.log('appImDB', callerName, ...args, Date.now())
}

/**
 * 创建表
 * @param storeName {string} 表名
 * @param storeIndex {string} 索引
 * @returns {Promise<*>}
 */
async function createStore (storeName, storeIndex = '++') {
  _console('createStore', arguments)
  storeName = storeName + ''
  const hasTable = db.tables.some((table) => {
    if (table.name === storeName) {
      store = table
      return true
    }
  })
  if (hasTable) {
    return store
  }

  db.close()
  version++
  db.version(version).stores({
    [ storeName ]: storeIndex
  })
  await db.open()
  return db[ storeName ]
}

export default class appImDb {
  /**
   * 打开数据库，创建 message、meta 表
   * @param storeName {string} 表名
   * @returns {Promise<Dexie>}
   */
  static async openDB (storeName) {
    _console('openDB', arguments)
    storeName = storeName + ''
    db = new Dexie(dbName)
    await db.open().catch(async (err) => {
      if (err.name === 'NoSuchDatabaseError') {
        db.close()
        version = 1
        db.version(version).stores({
          [ storeName ]: storeIndex,
          [ metaStoreName ]: metaStoreIndex
        })
        await db.open()
        this.store = db[ storeName ]
        return db
      } else {
        throw err
      }
    })
    version = db.verno
    db.close()
    const schema = {}
    db.tables.forEach((table) => {
      schema[ table.name ] = table.schema.primKey.name === 'sendId' ? storeIndex : metaStoreIndex
    })
    db.version(version).stores(schema)
    await db.open()
    metaStore = await createStore(metaStoreName, metaStoreIndex)
    store = await createStore(storeName, storeIndex)

    return db
  }

  /**
   * message 表添加数据
   * @param data {object|array}
   * @returns {Promise<*>}
   */
  static async storeAdd (data) {
    _console('storeAdd', arguments)
    if (!store) {
      throw dbUninitialized
    }
    if (Array.isArray(data)) {
      return store.bulkAdd(data)
    }
    return store.add(data)
  }

  /**
   * message 表根据 roomId 删除所有数据
   * @param roomId {*}
   * @returns {Dexie.Promise<number>}
   */
  static async storeDeleteByRoomId (roomId) {
    _console('storeDeleteByRoomId', arguments)
    if (!store) {
      throw dbUninitialized
    }
    return store.where({ roomId }).delete()
  }

  /**
   * message 表查询里面所有的 roomId
   * @returns {Promise<Array>}
   */
  static async storeQueryAllRoomId () {
    _console('storeQueryAllRoomId', arguments)
    if (!store) {
      throw dbUninitialized
    }
    const ids = new Set()
    await store.orderBy('sendTime').each(({ roomId }) => {
      if (roomId) {
        ids.add(roomId)
      }
    })
    return [...ids].reverse()
  }

  /**
   * message 表查询里面第一条数据
   * @returns {Dexie.Promise<Dexie.Promise<T | undefined> | Dexie.Promise<any> | * | number[]>}
   */
  static async storeFirst () {
    _console('storeFirst', arguments)
    if (!store) {
      throw dbUninitialized
    }
    const collection = await store.orderBy('sendTime')
    return collection.first()
  }

  /**
   * message 表查询里面最后一条数据
   * @returns {Dexie.Promise<Dexie.Promise<T | undefined> | Dexie.Promise<any> | *>}
   */
  static async storeLast () {
    _console('storeLast', arguments)
    if (!store) {
      throw dbUninitialized
    }
    const collection = await store.orderBy('sendTime')
    return collection.last()
  }

  /**
   * message 表更新数据
   * @param sendId {*}
   * @param data {*}
   * @returns {Dexie.Promise<Dexie.Promise<number> | * | IDBRequest<IDBValidKey> | Promise<void> | void | Hash>}
   */
  static async storeUpdate (sendId, data) {
    _console('storeUpdate', arguments)
    if (!store) {
      throw dbUninitialized
    }
    return store.update(sendId, data)
  }

  /**
   * message 表删除数据
   * @param sendId {*}
   * @returns {Promise<*>}
   */
  static async storeDelete (sendId) {
    _console('storeDelete', arguments)
    if (!store) {
      throw dbUninitialized
    }
    return store.delete(sendId)
  }

  /**
   * message 表获取存储数据数量
   * @returns {Promise<*>}
   */
  static async storeCount () {
    _console('storeCount', arguments)
    if (!store) {
      throw dbUninitialized
    }
    return store.count()
  }

  /**
   * message 表查询数据
   * @param roomId {*}
   * @param messageType {*}
   * @returns {Dexie.Promise<T[]>}
   */
  static async storeQuery (roomId, messageType) {
    _console('storeQuery', arguments)
    if (!store) {
      throw dbUninitialized
    }
    if (arguments.length === 2) {
      return store.where({ roomId, messageType }).sortBy('sendTime')
    }
    return store.where('roomId').equals(roomId).sortBy('sendTime')
  }

  /**
   * message 表根据 uid 查询数据
   * @param uid {number}
   * @returns {Dexie.Promise<T[]>}
   */
  static async storeQueryByUid (uid) {
    _console('storeQueryByUid', arguments)
    return store.where('uid').equals(uid).sortBy('sendTime')
  }

  /**
   * meta 表更新数据，之前没有增加，有修改
   * @param data {*}
   * @returns {Dexie.Promise<Dexie.Promise<number> | * | IDBRequest<IDBValidKey> | Promise<void> | void | Hash>}
   */
  static async metaStoreUpdate (data) {
    _console('metaStoreUpdate', arguments)
    if (!metaStore) {
      throw dbUninitialized
    }
    const { uid } = data
    const has = await this.metaStoreQuery(uid)
    if (has) {
      return metaStore.update(uid, data)
    } else {
      return metaStore.add(data)
    }
  }

  /**
   * meta 表删除数据
   * @param uid {*}
   * @returns {Promise<*>}
   */
  static async metaStoreDelete (uid) {
    _console('metaStoreDelete', arguments)
    if (!metaStore) {
      throw dbUninitialized
    }
    return metaStore.delete(uid)
  }

  /**
   * meta 表查询数据
   * @param uid {*}
   * @returns {Dexie.Promise<T | undefined>}
   */
  static async metaStoreQuery (uid) {
    _console('metaStoreQuery', arguments)
    if (!metaStore) {
      throw dbUninitialized
    }
    return metaStore.where('uid').equals(uid).first()
  }
}
