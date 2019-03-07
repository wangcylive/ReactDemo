import Dexie from 'dexie'

export default class appImDb {
  static db = null

  static version = 1

  static openDB (dbName) {
    return new Promise((resolve, reject) => {
      this.db = new Dexie(dbName)
      this.db.open().then((db) => {
        this.version = db.verno
        resolve(db)
      }).catch(() => {
        // console.log('第一次打开失败', this.db.verno)
        // this.db = new Dexie(dbName)
        // this.db.open().then((db) => {
        //   this.version = db.verno
        // }).catch((err) => {
        //   reject(err)
        // })
      })
    })
  }

  static createStore (storeName) {
    console.log('createStore', this.db.verno + 1, storeName)
    return new Promise((resolve, reject) => {
      this.db.close()
      this.db.version(this.db.verno + 1).stores({
        [storeName]: 'messageId, sendTime'
      })
      this.db.open().then((db) => {
        resolve(db[storeName])
      }).catch((err) => {
        reject(err)
      })
    })
  }

  static storeAdd (storeName, data) {
    console.log(this.db.table(storeName))
    return this.db.table(storeName).add(data)
  }
}
