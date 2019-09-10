import React from 'react'
import loadableHoc from './splitting'

const Home = loadableHoc(() => import('@/jsx/home'))
const Demo1 = loadableHoc(() => import('@/jsx/demo1'))
const Demo2 = loadableHoc(() => import('@/jsx/demo2'))
const Demo6 = loadableHoc(() => import('@/jsx/demo6'))
const Demo7 = loadableHoc(() => import('@/jsx/demo7'))
const Lazy = loadableHoc(() => import('@/components/lazy'))
const TodoList = loadableHoc(() => import('@/components/todo-list'))
const ClickCounter = loadableHoc(() => import('@/components/click-counter'))
const ControlPanel = loadableHoc(() => import('@/components/control-panel'))
const IndexedDB = loadableHoc(() => import('@/components/indexedDB'))
const IndexedDBNative = loadableHoc(() => import('@/components/indexedDB/native'))
const IndexedDBLocalForage = loadableHoc(() => import('@/components/indexedDB/localforage'))
const IndexedDBDexie = loadableHoc(() => import('@/components/indexedDB/dexie'))
const Cefsql = loadableHoc(() => import('@/components/indexedDB/cefsql'))
const ContextDemo = loadableHoc(() => import('@/jsx/context'))
const Focus = loadableHoc(() => import('@/components/focus'))
const PropTypes = loadableHoc(() => import('@/components/propTypes'))
const ProxyDemo = loadableHoc(() => import('@/components/proxy'))

const Intl = loadableHoc(() => import('@/components/intl'))

const Hook = loadableHoc(() => import(/* webpackChunkName: 'hook' */ '@/components/hook'))
const HookUseState = loadableHoc(() => import(/* webpackChunkName: 'hook' */ '@/components/hook/use-state'))
const HookUseContext = loadableHoc(() => import(/* webpackChunkName: 'hook' */ '@/components/hook/use-context'))
const HookUseRef = loadableHoc(() => import(/* webpackChunkName: 'hook' */ '@/components/hook/use-ref'))
const HookUseEffect = loadableHoc(() => import(/* webpackChunkName: 'hook' */ '@/components/hook/use-effect'))
const HookUseReducer = loadableHoc(() => import(/* webpackChunkName: 'hook' */ '@/components/hook/use-reducer'))
const HookUseMemo = loadableHoc(() => import(/* webpackChunkName: 'hook' */ '@/components/hook/use-memo'))
const HookUseLayoutEffect = loadableHoc(() => import(/* webpackChunkName: 'hook' */ '@/components/hook/use-layout-effect'))
const HookReactReduxUseStore = loadableHoc(() => import('@/components/hook/react-redux/use-store'))
const HookReactReduxUseSelector = loadableHoc(() => import('@/components/hook/react-redux/use-selector'))
const HookReactReduxUseDispatch = loadableHoc(() => import('@/components/hook/react-redux/use-dispatch'))

const KeepActive = loadableHoc(() => import('@/components/keep-active'))
const KeepActiveList = loadableHoc(() => import('@/components/keep-active/list'))
const KeepActiveDetail = loadableHoc(() => import('@/components/keep-active/detail'))

const routes = [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/demo1',
    component: Demo1
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
    path: '/lazy',
    component: Lazy
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
      },
      {
        path: '/react-redux-use-store',
        component: HookReactReduxUseStore
      },
      {
        path: '/react-redux-use-selector',
        component: HookReactReduxUseSelector
      },
      {
        path: '/react-redux-use-dispatch',
        component: HookReactReduxUseDispatch
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
  },
  {
    path: '/proxy',
    component: ProxyDemo
  }
]

export default routes
