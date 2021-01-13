const express = require('express')
const nodemailer = require('nodemailer')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, 'nodemailer-upload/')
  },
  filename(req, file, callback) {
    const fileSuffix = file.originalname.split('.').pop()
    callback(null, Math.floor(Date.now() * Math.random()) + '.' + fileSuffix)
  }
})
const upload = multer({
  storage
})
const app = express()

// const mailTransport = nodemailer.createTransport( {
//   host : 'smtp.sina.com',
//   secureConnection: true, // use SSL
//   auth : {
//     user : '你的邮箱地址',
//     pass : '你的邮箱授权码'
//   },
// });

const transport = nodemailer.createTransport({
  host: 'smtp.163.com',
  secureConnection: true,
  port: 465,
  auth: {
    user: 'wangcylive@163.com',
    pass: 'wang87513375',
  },
})

app.post('/email', upload.array('file', 10), (req, res) => {
  console.log(req.files, req.body)
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Credentials', 'true')

  // res.send('ok')
  // return

  const { subject, text } = req.body
  const attachments = req.files.map((file, index) => ({ filename: file.originalname, path: file.path, cid: `0000000${index}` }))

  const options = {
    from : 'wangcylive@163.com',
    to: 'wangcylive@outlook.com, 136577647@qq.com',
    // cc         : ''  //抄送
    // bcc      : ''    //密送
    subject,
    text,
    attachments
    // html: '<h1>你好，这是一封来自NodeMailer的邮件！</h1><p>hhh</p>',
    // attachments: [
    //   {
    //     filename: 'img1.jpg',            // 改成你的附件名
    //     path: img1,  // 改成你的附件路径
    //     cid : '00000001'                 // cid可被邮件使用
    //   },
    //   {
    //     filename: 'img2.jpg',            // 改成你的附件名
    //     path: img2,  // 改成你的附件路径
    //     cid : '00000002'                 // cid可被邮件使用
    //   },
    // ]
  }

  console.log(options)
  // res.send('ok')
  // return


  transport.sendMail(options).then(() => {
    res.send('ok')
  }).catch((err) => {
    console.log(err)
    res.status(500)
    res.send('error')
  })
})

app.listen('13000', () => {
  console.log('server start')
})
