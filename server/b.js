const express = require('express')

const app = new express()

app.get('/api', (req, res) => {
  res.send('https://www.baidu.com')
})

app.listen('3001')
