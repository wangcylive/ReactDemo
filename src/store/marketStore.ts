import {autorun, makeAutoObservable, makeObservable, observable, action, computed, flow} from 'mobx'

console.log('observable', observable)

export interface MarketData {
  opentype: string
  goodid: string
  typeid: string
  [key: string]: any
}

export enum MarketOpenType {
  BeanTask = 'beantask', // 玩豆任务
  AllGoods = 'allgoods', // 全部商品
}

// 限时抢购、热门兑换、游戏道具、房间福利、PC特权
const typesId = [-1, -2, 2, 3, 1]
class MarketStore {
  opentype: string | undefined = undefined
  goodid: number | undefined = undefined
  typeid: number | undefined = undefined
  haveShow = false

  constructor() {
    makeAutoObservable(this)
  }

  setInfo(opentype: any, typeid: any, goodid: any) {
    this.opentype = opentype || undefined
    if (typeid) {
      const nTypeid = Number(typeid)
      this.typeid = typesId.includes(nTypeid) ? nTypeid : typesId[0]
    } else {
      this.typeid = undefined
    }
    this.goodid = goodid ? Number(goodid) : undefined
    if (opentype === MarketOpenType.AllGoods) {
      this.haveShow = false
    }

    // console.log('wcytest setInfo', this.opentype, this.typeid, this.goodid, this)
  }
  initInfo() {
    const search = new URLSearchParams(location.search)
    const opentype = search.get('opentype')
    const typeid = search.get('typeid')
    const goodid = search.get('goodid')
    this.setInfo(opentype, typeid, goodid)
  }
  updateInfo(data: Partial<MarketData>) {
    const {opentype, goodid, typeid} = data
    this.setInfo(opentype, goodid, typeid)
  }

  updateHaveShow(val: boolean) {
    this.haveShow = val
  }
}

const marketStore = new MarketStore()

// setInterval(() => {
//   marketStore.updateInfo({opentype: Date.now() + ''})
// }, 1000)

autorun(() => {
  console.log('autorun', marketStore.opentype)
})

export default marketStore
