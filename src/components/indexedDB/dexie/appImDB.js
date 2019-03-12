import Dexie from 'dexie'

export default class appImDb {
  static db = null

  static store = null

  static version = 1

  static dbName = 'AppIm'

  static storeIndex = 'messageId, sendTime, uid, roomId'

  static async openDB (storeName) {
    const db = this.db = new Dexie(this.dbName)
    await db.open().catch(async (err) => {
      if (err.name === 'NoSuchDatabaseError') {
        db.close()
        this.version = 1
        db.version(this.version).stores({
          [ storeName ]: this.storeIndex
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
      schema[ table.name ] = this.storeIndex
    })
    db.version(this.version).stores(schema)
    await db.open()
    this.store = await this.createStore(storeName)

    return db
  }

  static async createStore (storeName) {
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
      [ storeName ]: this.storeIndex
    })
    await this.db.open()
    return db[ storeName ]
  }

  static async storeAdd (data) {
    if (Array.isArray(data)) {
      return this.store.bulkAdd(data)
    }
    return this.store.add(data)
  }

  static async storeDeleteByRoomId (roomId) {
    return this.store.where({ roomId }).delete()
  }

  static async storeQueryAllRoomId () {
    const arr = []
    await this.store.orderBy('roomId').eachUniqueKey((roomId) => arr.push(roomId))
    return arr
  }

  static async storeFirst () {
    const collection = await this.store.orderBy('sendTime')
    return collection.first()
  }

  static async storeLast () {
    const collection = await this.store.orderBy('sendTime')
    return collection.last()
  }

  static async storeUpdate (messageId, data) {
    return this.store.update(messageId, data)
  }

  static async storeDelete (messageId) {
    return this.store.delete(messageId)
  }

  static async storeCount () {
    return await this.store.count()
  }

  static async storeQuery (roomId) {
    return await this.store.where('roomId').equals(roomId).sortBy('sendTime')
  }
}
