import React from 'react'
import Splitting from './splitting'

const Home = Splitting(() => import('@/jsx/home'))
const Demo2 = Splitting(() => import('@/jsx/demo2'))
const Demo6 = Splitting(() => import('@/jsx/demo6'))
const Demo7 = Splitting(() => import('@/jsx/demo7'))
const TodoList = Splitting(() => import('@/components/todo-list'))
const ClickCounter = Splitting(() => import('@/components/click-counter'))
const ControlPanel = Splitting(() => import('@/components/control-panel'))
const IndexedDB = Splitting(() => import('@/components/indexedDB'))
const IndexedDBNative = Splitting(() => import('@/components/indexedDB/native'))
const IndexedDBLocalForage = Splitting(() => import('@/components/indexedDB/localforage'))
const IndexedDBDexie = Splitting(() => import('@/components/indexedDB/dexie'))
const Cefsql = Splitting(() => import('@/components/indexedDB/cefsql'))
const ContextDemo = Splitting(() => import('@/jsx/context/index.jsx'))
const Focus = Splitting(() => import('@/components/focus'))
const PropTypes = Splitting(() => import('@/components/propTypes'))

const Intl = Splitting(() => import('@/components/intl'))

const Hook = Splitting(() => import(/* webpackChunkName: 'hook' */ '@/components/hook'))
const HookUseState = Splitting(() => import(/* webpackChunkName: 'hook' */ '@/components/hook/use-state'))
const HookUseContext = Splitting(() => import(/* webpackChunkName: 'hook' */ '@/components/hook/use-context'))
const HookUseRef = Splitting(() => import(/* webpackChunkName: 'hook' */ '@/components/hook/use-ref'))
const HookUseEffect = Splitting(() => import(/* webpackChunkName: 'hook' */ '@/components/hook/use-effect'))
const HookUseReducer = Splitting(() => import(/* webpackChunkName: 'hook' */ '@/components/hook/use-reducer'))
const HookUseMemo = Splitting(() => import(/* webpackChunkName: 'hook' */ '@/components/hook/use-memo'))
const HookUseLayoutEffect = Splitting(() => import(/* webpackChunkName: 'hook' */ '@/components/hook/use-layout-effect'))

const KeepActive = Splitting(() => import('@/components/keep-active'))
const KeepActiveList = Splitting(() => import('@/components/keep-active/list'))
const KeepActiveDetail = Splitting(() => import('@/components/keep-active/detail'))

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
    exact: true,
    children: [
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
    ]
  },
  {
    path: '/context-demo',
    component: ContextDemo
  },
  {
    path: '/focus',
    component: Focus
  },
  {
    path: '/propTypes',
    component: PropTypes
  },
  {
    path: '/intl',
    component: Intl
  },
  {
    path: '/hook',
    component: Hook,
    children: [
      {
        path: '/useState',
        component: HookUseState
      },
      {
        path: '/useContext',
        component: HookUseContext
      },
      {
        path: '/useRef',
        component: HookUseRef
      },
      {
        path: '/useEffect',
        component: HookUseEffect
      },
      {
        path: '/useLayoutEffect',
        component: HookUseLayoutEffect
      },
      {
        path: '/useReducer',
        component: HookUseReducer
      },
      {
        path: '/useMemo',
        component: HookUseMemo
      }
    ]
  },
  {
    path: '/keep-active',
    redirect: '/keep-active/list',
    component: KeepActive,
    children: [
      {
        path: '/keep-active/list',
        component: KeepActiveList,
        keepAlive: true
      },
      {
        path: '/keep-active/detail/:id',
        component: KeepActiveDetail
      }
    ]
  }
]

export default routes
