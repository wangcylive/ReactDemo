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

  static async storeAdd (data) {
    this.console('storeAdd', arguments)
    if (Array.isArray(data)) {
      return this.store.bulkAdd(data)
    }
    return this.store.add(data)
  }

  static async storeDeleteByRoomId (roomId) {
    this.console('storeDeleteByRoomId', arguments)
    return this.store.where({ roomId }).delete()
  }

  static async storeQueryAllRoomId () {
    this.console('storeQueryAllRoomId', arguments)
    const arr = []
    await this.store.orderBy('roomId').eachUniqueKey((roomId) => arr.push(roomId))
    return arr
  }

  static async storeFirst () {
    this.console('storeFirst', arguments)
    const collection = await this.store.orderBy('sendTime')
    return collection.first()
  }

  static async storeLast () {
    this.console('storeLast', arguments)
    const collection = await this.store.orderBy('sendTime')
    return collection.last()
  }

  static async storeUpdate (sendId, data) {
    this.console('storeUpdate', arguments)
    return this.store.update(sendId, data)
  }

  static async storeDelete (sendId) {
    this.console('storeDelete', arguments)
    return this.store.delete(sendId)
  }

  static async storeCount () {
    this.console('storeCount', arguments)
    return this.store.count()
  }

  static async storeQuery (roomId) {
    this.console('storeQuery', arguments)
    return this.store.where('roomId').equals(roomId).sortBy('sendTime')
  }

  static async metaStoreAdd (data) {
    this.console('metaStoreAdd', arguments)
    return this.metaStore.add(data)
  }

  static async metaStoreUpdate (uid, data) {
    this.console('metaStoreUpdate', arguments)
    return this.metaStore.update(uid, data)
  }

  static async metaStoreDelete (uid) {
    this.console('metaStoreDelete', arguments)
    return this.metaStore.delete(uid)
  }

  static async metaStoreQuery (uid) {
    this.console('metaStoreQuery', arguments)
    return this.metaStore.where('uid').equals(uid).first()
  }
}
