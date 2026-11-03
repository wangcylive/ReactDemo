import path from 'node:path'
import {readFileSync} from 'node:fs'
import {defineConfig} from '@rsbuild/core'
import {pluginBasicSsl} from '@rsbuild/plugin-basic-ssl'
import {pluginLess} from '@rsbuild/plugin-less'
import {pluginReact} from '@rsbuild/plugin-react'
import {pluginSass} from '@rsbuild/plugin-sass'
import {pluginSvgr} from '@rsbuild/plugin-svgr'

const packageJson = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'))
const isDev = process.env.NODE_ENV !== 'production'
const enableHttps = process.env.HTTPS === '1'
const srcPath = path.resolve(import.meta.dirname, 'src')

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginSass(),
    pluginLess(),
    pluginSvgr({
      mixedImport: true,
      query: /.*/,
    }),
    enableHttps && pluginBasicSsl(),
  ].filter(Boolean),
  source: {
    entry: {
      index: './src/main/index.js',
    },
    assetsInclude: /\.zip$/,
    define: {
      'process.env.NODE_ENV': JSON.stringify(isDev ? 'development' : 'production'),
    },
  },
  resolve: {
    alias: {
      '@': srcPath,
      src: srcPath,
    },
  },
  html: {
    template: './src/html/index.html',
    favicon: './src/favicon.png',
    mountId: 'app',
  },
  output: {
    target: 'web',
    distPath: {
      root: 'dist',
    },
    assetPrefix: '/',
    dataUriLimit: 4000,
    sourceMap: isDev
      ? {
          js: 'eval-source-map',
          css: true,
        }
      : false,
    cssModules: {
      localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
      auto: (resourcePath, resourceQuery) =>
        resourcePath.includes('.module.') || resourceQuery.includes('module'),
    },
    copy: [
      {
        from: './src/worker.js',
        to: 'worker.js',
      },
    ],
  },
  server: {
    port: packageJson.serverPort,
    host: true,
    allowedHosts: true,
    compress: true,
    historyApiFallback: true,
    publicDir: [
      {
        name: 'src',
        copyOnBuild: false,
      },
    ],
    proxy: {
      '/api': {
        target: 'https://api.agora.io',
        pathRewrite: {
          '^/api': '',
        },
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
