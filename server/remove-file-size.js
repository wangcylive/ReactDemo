const fs = require('fs/promises')
const express = require('express')
const axios = require('axios')
const formatFileSize = require('./format-file-size')

let templateHtml = ''
function getTemplateHtml(info) {
  return new Promise(resolve => {
    if (templateHtml) {
      resolve(templateHtml)
    } else {
      fs.readFile('./template.html', 'utf8').then(res => {
        templateHtml = res
        resolve(res)
      })
    }
  }).then(html => {
    return html.replace('{{app}}', createTableHtml(info))
  })
}

const requestOk = status => (status >= 200 && status < 300) || status === 304

function createTableHtml(info) {
  const successCount = info.list.filter(item => requestOk(item.status)).length
  const errorCount = info.list.length - successCount
  const total = `<h1>Total:${formatFileSize(
    info.total,
  )}, <small>Request Success <span class="success">${successCount}</span>, Error <span class="error">${errorCount}</span></small></h1>`
  let table = ''
  if (info.list.length > 0) {
    const thRows = '<tr><th>size</th><th>status</th><th>content-type</th><th>url</th></tr>'
    let tdRows = ''
    info.list.forEach(item => {
      tdRows +=
        '<tr>' +
        Object.entries(item)
          .map(([key, value]) => {
            let content = value
            if (key === 'url') {
              content = `<a href="${value}" target="_blank">${value}</a>`
            } else if (key === 'status') {
              content = `<span class="${requestOk(value) ? 'success' : 'error'}">${value}</span>`
            } else if (key === 'size') {
              content = formatFileSize(value)
            }
            return `<td>${content}</td>`
          })
          .join('') +
        '</tr>'
    })
    table = `<table><thead>${thRows}</thead><tbody>${tdRows}</tbody></table>`
  }
  return total + table
}

const app = express()

app.get(['/', '/html'], async (req, res) => {
  const url = req.query.url
  let total = 0
  let list = []
  if (url) {
    const arrUrl = url.split(',')
    list = await Promise.all(arrUrl.filter(url => !!url).map(url => getUrlContentLength(url)))
    total = list.reduce((previousValue, currentValue) => previousValue + currentValue.size, 0)
  }

  res.status(200)

  const info = {
    total,
    list,
  }

  if (req.path === '/html') {
    const html = await getTemplateHtml(info)
    res.send(html)
  } else {
    res.json(info)
  }
})

app.listen(2300)

function getUrlContentLength(url) {
  return new Promise((resolve, reject) => {
    axios
      .request({
        url,
        method: 'HEAD',
      })
      .then(async res => {
        let size = 0
        let headerContentLength = res.headers['content-length']
        // 如果 header 未返回长度，获取资源内容
        if (!headerContentLength) {
          const getRes = await axios.request({url, method: 'get', responseType: 'blob'}).catch(err => {
            return err.response
          })
          headerContentLength = getRes?.data?.length || 0
        }
        const val = Number(headerContentLength)
        const status = res.status
        const contentType = res.headers['content-type']
        if (Number.isSafeInteger(val)) {
          size = val
        }
        resolve({
          size,
          status,
          contentType,
          url,
        })
      })
      .catch(err => {
        let size = 0
        const res = err.response
        let status = 0
        let contentType = 'unknown'

        if (res) {
          status = res.status
          contentType = res.headers['content-type']
          const val = Number(res.headers['content-length'])
          if (Number.isSafeInteger(val)) {
            size = val
          }
        }

        resolve({
          size,
          status,
          contentType,
          url,
        })
      })
  })
}
