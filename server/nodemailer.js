const express = require('express')
const nodemailer = require('nodemailer')
const path = require('path')

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
  host: "smtp.163.com",
  secureConnection: true,
  port: 465,
  auth: {
    user: "wangcylive@163.com",
    pass: "wang87513375"
  },
})

app.post('/email', (req, res) => {
  const img1 = path.resolve(__dirname, '../src/components/nodemailer/img/p2612216881.jpg')
  const img2 = path.resolve(__dirname, '../src/components/nodemailer/img/p2616169465.jpg')
  const options = {
    from : 'wangcylive@163.com',
    to: 'wangcylive@outlook.com, 136577647@qq.com',
    // cc         : ''  //抄送
    // bcc      : ''    //密送
    subject: '一封来自Node Mailer的邮件',
    text: '一封来自Node Mailer的邮件',
    html: '<h1>你好，这是一封来自NodeMailer的邮件！</h1><p>hhh</p>',
    attachments: [
      {
        filename: 'img1.jpg',            // 改成你的附件名
        path: img1,  // 改成你的附件路径
        cid : '00000001'                 // cid可被邮件使用
      },
      {
        filename: 'img2.jpg',            // 改成你的附件名
        path: img2,  // 改成你的附件路径
        cid : '00000002'                 // cid可被邮件使用
      },
    ]
  }
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials","true");

  transport.sendMail(options).then(() => {
    res.send('ok')
  }).catch((err) => {
    console.log(err)
    res.send('error')
  })
})

app.listen('13000', () => {
  console.log('server start')
})
