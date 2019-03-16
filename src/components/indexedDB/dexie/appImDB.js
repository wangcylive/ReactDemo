import Dexie from 'dexie'

export default class appImDb {
  static db = null

  static store = null
  
  static metaStore = null

  static version = 1

  static dbName = 'AppIm'

  static storeIndex = 'sendId, sendTime, uid, roomId, messageType, [roomId+messageType]'

  static metaStoreName = 'meta'

  static metaStoreIndex = 'uid'

  static console (callerName, args) {
    console.log('appImDB', callerName, ...args, Date.now())
  }

  /**
   * 打开数据库，创建用户表和meta表
   * @param storeName {string} 表名
   * @returns {Promise<Dexie>}
   */
  static async openDB (storeName) {
    this.console('openDB', arguments)
    const db = this.db = new Dexie(this.dbName)
    await db.open().catch(async (err) => {
      if (err.name === 'NoSuchDatabaseError') {
        db.close()
        this.version = 1
        db.version(this.version).stores({
          [ storeName ]: this.storeIndex,
          [ this.metaStoreName ]: this.metaStoreIndex
        })
        await db.open()
        this.store = db[ storeName ]
        return db
      } else {
        throw err
      }
    })
    this.version = db.verno
    db.close()
    const schema = {}
    db.tables.forEach((table) => {
      schema[ table.name ] = table.schema.primKey.name === 'sendId' ? this.storeIndex : this.metaStoreIndex
    })
    db.version(this.version).stores(schema)
    await db.open()
    this.metaStore = await this.createStore(this.metaStoreName, this.metaStoreIndex)
    this.store = await this.createStore(storeName, this.storeIndex)

    return db
  }

  /**
   * 创建表
   * @param storeName {string} 表名
   * @param storeIndex {string} 索引
   * @returns {Promise<*>}
   */
  static async createStore (storeName, storeIndex = '++') {
    this.console('createStore', arguments)
    const db = this.db
    const hasTable = db.tables.some((table) => {
      if (table.name === storeName) {
        this.store = table
        return true
      }
    })
    if (hasTable) {
      return this.store
    }

    db.close()
    this.version++
    db.version(this.version).stores({
      [ storeName ]: storeIndex
    })
    await this.db.open()
    return db[ storeName ]
  }

  /**
   * 用户表添加数据
   * @param data {object|array}
   * @returns {Promise<*>}
   */
  static async storeAdd (data) {
    this.console('storeAdd', arguments)
    if (Array.isArray(data)) {
      return this.store.bulkAdd(data)
    }
    return this.store.add(data)
  }

  /**
   * 用户表根据 roomId 删除所有数据
   * @param roomId {*}
   * @returns {Dexie.Promise<number>}
   */
  static async storeDeleteByRoomId (roomId) {
    this.console('storeDeleteByRoomId', arguments)
    return this.store.where({ roomId }).delete()
  }

  /**
   * 用户表查询里面所有的 roomId
   * @returns {Promise<Array>}
   */
  static async storeQueryAllRoomId () {
    this.console('storeQueryAllRoomId', arguments)
    const arr = []
    await this.store.orderBy('roomId').eachUniqueKey((roomId) => arr.push(roomId))
    return arr
  }

  /**
   * 用户表查询里面第一条数据
   * @returns {Dexie.Promise<Dexie.Promise<T | undefined> | Dexie.Promise<any> | * | number[]>}
   */
  static async storeFirst () {
    this.console('storeFirst', arguments)
    const collection = await this.store.orderBy('sendTime')
    return collection.first()
  }

  /**
   * 用户表查询里面最后一条数据
   * @returns {Dexie.Promise<Dexie.Promise<T | undefined> | Dexie.Promise<any> | *>}
   */
  static async storeLast () {
    this.console('storeLast', arguments)
    const collection = await this.store.orderBy('sendTime')
    return collection.last()
  }

  /**
   * 用户表更新数据
   * @param sendId {*}
   * @param data {*}
   * @returns {Dexie.Promise<Dexie.Promise<number> | * | IDBRequest<IDBValidKey> | Promise<void> | void | Hash>}
   */
  static async storeUpdate (sendId, data) {
    this.console('storeUpdate', arguments)
    return this.store.update(sendId, data)
  }

  /**
   * 用户表删除数据
   * @param sendId {*}
   * @returns {Promise<*>}
   */
  static async storeDelete (sendId) {
    this.console('storeDelete', arguments)
    return this.store.delete(sendId)
  }

  /**
   * 用户表获取存储数据数量
   * @returns {Promise<*>}
   */
  static async storeCount () {
    this.console('storeCount', arguments)
    return this.store.count()
  }

  /**
   * 用户表查询数据
   * @param roomId {*}
   * @param messageType {*}
   * @returns {Dexie.Promise<T[]>}
   */
  static async storeQuery (roomId, messageType) {
    this.console('storeQuery', arguments)
    if (arguments.length === 2) {
      return this.store.where({ roomId, messageType }).sortBy('sendTime')
    }
    return this.store.where('roomId').equals(roomId).sortBy('sendTime')
  }

  /**
   * meta 表添加数据
   * @param data {*}
   * @returns {Promise<*>}
   */
  static async metaStoreAdd (data) {
    this.console('metaStoreAdd', arguments)
    return this.metaStore.add(data)
  }

  /**
   * meta 表更新数据
   * @param uid {*}
   * @param data {*}
   * @returns {Dexie.Promise<Dexie.Promise<number> | * | IDBRequest<IDBValidKey> | Promise<void> | void | Hash>}
   */
  static async metaStoreUpdate (uid, data) {
    this.console('metaStoreUpdate', arguments)
    return this.metaStore.update(uid, data)
  }

  /**
   * meta 表删除数据
   * @param uid {*}
   * @returns {Promise<*>}
   */
  static async metaStoreDelete (uid) {
    this.console('metaStoreDelete', arguments)
    return this.metaStore.delete(uid)
  }

  /**
   * meta 表查询数据
   * @param uid {*}
   * @returns {Dexie.Promise<T | undefined>}
   */
  static async metaStoreQuery (uid) {
    this.console('metaStoreQuery', arguments)
    return this.metaStore.where('uid').equals(uid).first()
  }
}
