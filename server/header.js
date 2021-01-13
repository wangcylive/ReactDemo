function getHeader({ title, content }) {
  return `<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="renderer" content="webkit">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
    <title>${title}</title>
</head>
<body>
<div id="app">${content}</div>
</body>
</html>`
}

export default getHeader
