import React, {createElement} from 'react'
import loadableHoc from './splitting'

const Home = loadableHoc(() => import('@/jsx/home'))
const Demo1 = loadableHoc(() => import('@/jsx/demo1'))
const Demo2 = loadableHoc(() => import('@/jsx/demo2'))
const Demo6 = loadableHoc(() => import('@/jsx/demo6'))
const Demo7 = loadableHoc(() => import('@/jsx/demo7'))
const SvgDemo = loadableHoc(() => import('@/jsx/svg'))
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
const HookUseLayoutEffect = loadableHoc(() =>
  import(/* webpackChunkName: 'hook' */ '@/components/hook/use-layout-effect'),
)
const HookReactReduxUseStore = loadableHoc(() => import('@/components/hook/react-redux/use-store'))
const HookReactReduxUseSelector = loadableHoc(() => import('@/components/hook/react-redux/use-selector'))
const HookReactReduxUseDispatch = loadableHoc(() => import('@/components/hook/react-redux/use-dispatch'))

const KeepActive = loadableHoc(() => import('@/components/keep-active'))
const KeepActiveList = loadableHoc(() => import('@/components/keep-active/list'))
const KeepActiveDetail = loadableHoc(() => import('@/components/keep-active/detail'))

const QrcodeResearch = loadableHoc(() => import('@/jsx/qrcode-research'))

const Photoswipe = loadableHoc(() => import('@/components/photoswipe'))
// const Copy = loadableHoc(() => import('@/elements/copy'))

const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/demo1',
    element: <Demo1 />,
  },
  {
    path: '/demo2',
    element: <Demo2 />,
  },
  {
    path: '/demo6',
    element: createElement(Demo6),
  },
  {
    path: '/demo7',
    element: createElement(Demo7),
  },
  {
    path: '/svg',
    element: createElement(SvgDemo),
  },
  {
    path: '/lazy',
    element: createElement(Lazy),
  },
  {
    path: '/todo-list',
    element: createElement(TodoList),
  },
  {
    path: '/click-counter*',
    element: createElement(ClickCounter),
  },
  {
    path: '/control-panel',
    element: createElement(ControlPanel),
  },
  {
    path: '/indexedDB',
    element: createElement(IndexedDB),
    children: [
      {
        path: 'native',
        element: createElement(IndexedDBNative),
      },
      {
        path: 'localforage',
        element: createElement(IndexedDBLocalForage),
      },
      {
        path: 'dexie',
        element: createElement(IndexedDBDexie),
      },
      {
        path: 'cefsql',
        element: createElement(Cefsql),
      },
    ],
  },
  {
    path: '/context-demo',
    element: createElement(ContextDemo),
  },
  {
    path: '/focus',
    element: createElement(Focus),
  },
  {
    path: '/propTypes',
    element: createElement(PropTypes),
  },
  {
    path: '/intl',
    element: createElement(Intl),
  },
  {
    path: '/hook',
    element: createElement(Hook),
    children: [
      {
        path: 'useState',
        element: createElement(HookUseState),
      },
      {
        path: 'useContext',
        element: createElement(HookUseContext),
      },
      {
        path: 'useRef',
        element: createElement(HookUseRef),
      },
      {
        path: 'useEffect',
        element: createElement(HookUseEffect),
      },
      {
        path: 'useLayoutEffect',
        element: createElement(HookUseLayoutEffect),
      },
      {
        path: 'useReducer',
        element: createElement(HookUseReducer),
      },
      {
        path: 'useMemo',
        element: createElement(HookUseMemo),
      },
      {
        path: 'react-redux-use-store',
        element: createElement(HookReactReduxUseStore),
      },
      {
        path: 'react-redux-use-selector',
        element: createElement(HookReactReduxUseSelector),
      },
      {
        path: 'react-redux-use-dispatch',
        element: createElement(HookReactReduxUseDispatch),
      },
    ],
  },
  {
    path: '/keep-active',
    redirect: '/keep-active/list',
    element: createElement(KeepActive),
    children: [
      {
        path: 'list',
        element: createElement(KeepActiveList),
        keepAlive: true,
      },
      {
        path: 'detail/:id',
        element: createElement(KeepActiveDetail),
      },
    ],
  },
  {
    path: '/proxy',
    element: createElement(ProxyDemo),
  },
  {
    path: '/qrcode-research',
    element: createElement(QrcodeResearch),
  },
  {
    path: '/photoswipe',
    element: createElement(Photoswipe),
  },
  // {
  //   path: '/copy',
  //   element: <Copy />,
  // },
  // {
  //   path: '/media-source',
  //   element: loadableHoc(() => import('@/elements/media-source')),
  // },
  // {
  //   path: '/grid',
  //   element: loadableHoc(() => import('@/elements/grid')),
  // },
  // {
  //   path: '/notification',
  //   element: loadableHoc(() => import('@/elements/notification')),
  // },
  // {
  //   path: '/nodemailer',
  //   element: loadableHoc(() => import('@/elements/nodemailer')),
  // },
]

export default routes
