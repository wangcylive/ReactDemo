import React, {createElement} from 'react'
import {createBrowserRouter} from 'react-router-dom'
import loadableHoc from './splitting'
import loader from '@/components/react-router-await/loader'
import axios from 'axios'
import reactRouterAwait, {AwaitError} from '@/components/react-router-await'

const PageHome = loadableHoc(() => import('@/home'))

const Home = loadableHoc(() => import('@/jsx/home'))
const Demo1 = loadableHoc(() => import(/* webpackChunkName: 'demo1' */ '@/jsx/demo1'))
const Demo2 = loadableHoc(() => import(/* webpackPrefetch: true */ '@/jsx/demo2'))
const Demo6 = loadableHoc(() => import(/* webpackPrefetch: true */ '@/jsx/demo6'))
const Demo7 = loadableHoc(() => import(/* webpackPrefetch: true */ '@/jsx/demo7'))
const SvgDemo = loadableHoc(() => import(/* webpackPreload: true */ '@/jsx/svg'))
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
const HookUseId = loadableHoc(() => import('@/components/hook/useId'))
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

export const routes = [
  {
    path: '/',
    element: <PageHome />,
    children: [
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
        path: '/chinaMap',
        element: createElement(loadableHoc(() => import('@/components/china-map'))),
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
        path: '/click-counter/*',
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
            path: 'useTransition',
            element: createElement(loadableHoc(() => import('@/components/hook/use-transition'))),
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
            path: 'useId',
            element: createElement(HookUseId),
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
      {
        path: '/content-editable',
        element: createElement(loadableHoc(() => import('@/components/content-editable'))),
      },
      {
        path: '/orientation',
        element: createElement(loadableHoc(() => import('@/components/orientation'))),
      },
      {
        path: '/bscroll',
        element: createElement(loadableHoc(() => import('@/components/bscroll'))),
      },
      {
        path: '/copy',
        element: createElement(loadableHoc(() => import('@/components/copy'))),
      },
      {
        path: '/media-source',
        element: createElement(loadableHoc(() => import('@/components/media-source'))),
      },
      {
        path: '/grid',
        element: createElement(loadableHoc(() => import('@/components/grid'))),
      },
      {
        path: '/notification',
        element: createElement(loadableHoc(() => import('@/components/notification'))),
      },
      {
        path: '/nodemailer',
        element: createElement(loadableHoc(() => import('@/components/nodemailer'))),
      },
      {
        path: '/touch-action',
        element: createElement(loadableHoc(() => import('@/components/touch-action'))),
      },
      {
        path: '/textarea-ts',
        element: createElement(loadableHoc(() => import('@/components/textarea-ts'))),
      },
      {
        path: '/carousel',
        element: createElement(loadableHoc(() => import('@/components/Carousel/demo'))),
      },
      {
        path: '/tooltip',
        element: createElement(loadableHoc(() => import('@/components/Tooltip/demo'))),
      },
      {
        path: '/react-content-loader',
        element: createElement(loadableHoc(() => import('@/components/react-content-loader'))),
      },
      {
        path: '/key',
        element: createElement(loadableHoc(() => import('@/components/key'))),
      },
      {
        path: '/iframe',
        element: createElement(loadableHoc(() => import('@/components/iframe'))),
      },
      {
        path: '/drag',
        element: createElement(loadableHoc(() => import('@/components/drag'))),
      },
      {
        path: '/border-image',
        element: createElement(loadableHoc(() => import('@/components/border-image'))),
      },
      {
        path: '/styled-components',
        element: createElement(loadableHoc(() => import('@/components/styled-components'))),
      },
      {
        path: '/custom-elements',
        element: createElement(loadableHoc(() => import('@/components/customElements'))),
      },
      {
        path: '/shadow-dom',
        element: createElement(loadableHoc(() => import('@/components/shadow-dom'))),
      },
      {
        path: '/fetch',
        element: createElement(loadableHoc(() => import('@/components/fetch'))),
      },
      {
        path: '/stream',
        element: createElement(loadableHoc(() => import('@/components/Stream'))),
      },
      {
        path: '/typedArray',
        element: createElement(loadableHoc(() => import('@/components/TypedArray'))),
      },
      {
        path: '/unicode',
        element: createElement(loadableHoc(() => import('@/components/unicode'))),
      },
      {
        path: '/content-security-policy',
        element: createElement(loadableHoc(() => import('@/components/content-security-policy'))),
      },
      {
        path: '/input',
        element: createElement(loadableHoc(() => import('@/components/input'))),
      },
      {
        path: '/interactive-widget',
        element: createElement(loadableHoc(() => import('@/components/interactive-widget'))),
      },
      {
        path: '/screen-orientation',
        element: createElement(loadableHoc(() => import('@/components/screenOrientation'))),
      },
      {
        path: '/echart',
        element: createElement(loadableHoc(() => import('@/components/echart'))),
      },
      {
        path: '/svelte-gantt',
        element: createElement(loadableHoc(() => import('@/components/svelte-gantt'))),
      },
      {
        path: '/listdemo',
        element: createElement(loadableHoc(() => import('@/components/list'))),
        redirect: '/listdemo/list',
        children: [
          {
            path: 'list',
            element: <></>,
          },
          {
            path: 'detail/:id',
            element: createElement(reactRouterAwait(loadableHoc(() => import('@/components/list/detail')))),
            errorElement: <AwaitError />,
            loader: loader(params => {
              console.log('params', params)
              // return new Promise((resolve, reject) => {
              //   setTimeout(() => {
              //     // resolve({status: 0, data: []})
              //     reject({status: -1, data: null})
              //   }, 3000)
              // })
              return axios.get('https://unpkg.com/react@18.2.0/package.json')
            }),
          },
        ],
      },
      {
        path: '/resize-events',
        element: createElement(loadableHoc(() => import('@/components/resize-events'))),
      },
    ],
  },
]

const router = createBrowserRouter(routes)

export default router
