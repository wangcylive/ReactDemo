import fs from 'fs'
import path from 'path'
import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import ServerDemo1 from '@/server-demo1'
import getHeader from './header'

const app = express()

app.get('/*', (req, res) => {
  // const renderedString = ReactDOM.hydrate(
  //   <StaticRouter>
  //     <App></App>
  //   </StaticRouter>
  // );

  res.send(getHeader({title: 'React SSR', content: ReactDOMServer.renderToString(<ServerDemo1/>)}))
})

app.listen(3001)
