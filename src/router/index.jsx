import React from 'react'
import state from '@/store/index'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader/root'
import RouterWithSubRouters from './router-with-sub-routes'
import Splitting from '@/components/splitting'

const Home = Splitting(() => import('@/jsx/home'))
const Demo2 = Splitting(() => import('../jsx/demo2'))
const Demo6 = Splitting(() => import('../jsx/demo6'))
const Demo7 = Splitting(() => import('../jsx/demo7'))
const TodoList = Splitting(() => import('@/components/todo-list'))
const ClickCounter = Splitting(() => import('@/components/click-counter'))
const ControlPanel = Splitting(() => import('@/components/control-panel'))
const IndexedDB = Splitting(() => import('../components/indexedDB'))
const IndexedDBNative = Splitting(() => import('../components/indexedDB/native'))
const IndexedDBLocalForage = Splitting(() => import('../components/indexedDB/localforage'))
const IndexedDBDexie = Splitting(() => import('../components/indexedDB/dexie'))
const Cefsql = Splitting(() => import('../components/indexedDB/cefsql'))
const ContextDemo = Splitting(() => import('../jsx/context'))

import '@/css/nav.scss'

const routes = [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/demo2',
    component: Demo2
  },
  {
    path: '/demo6',
    component: Demo6
  },
  {
    path: '/demo7',
    component: Demo7
  },
  {
    path: '/todo-list',
    component: TodoList
  },
  {
    path: '/click-counter',
    component: ClickCounter
  },
  {
    path: '/control-panel',
    component: ControlPanel
  },
  {
    path: '/indexedDB',
    component: IndexedDB,
    exact: true
  },
  {
    path: '/indexedDB/native',
    component: IndexedDBNative
  },
  {
    path: '/indexedDB/localforage',
    component: IndexedDBLocalForage
  },
  {
    path: '/indexedDB/dexie',
    component: IndexedDBDexie
  },
  {
    path: '/indexedDB/cefsql',
    component: Cefsql
  },
  {
    path: '/context-demo',
    component: ContextDemo
  }
]

function RouteView () {
  return (
    <RouterWithSubRouters routes={routes} />
  )
}

const DemoIndex = (props) => (
  <Provider store={ state }>
    <RouteView { ...props }/>
  </Provider>
)

export default hot(DemoIndex)
