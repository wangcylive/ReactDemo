import React from 'react'
import styled from 'styled-components'

const Code = styled.code`
  background: #eee;
  border-radius: 2px;
  padding: 3px;
`

const Table = styled.table`
  border-spacing: 0;
  border-collapse: collapse;
  th {
    white-space: nowrap;
  }
  th,
  td {
    padding: 0.5em;
    border: 1px solid #ccc;
  }
`

const ContentSecurityPolicy: React.FC = () => {
  return (
    <div>
      <h2>内容安全策略（CSP）是一个额外的安全层，用于检测并削弱某些特定类型的攻击</h2>
      <p>
        为使 CSP 可用，你需要配置你的网络服务器返回 Content-Security-Policy HTTP 标头，&lt;meta&gt;
        元素也可以被用来配置该策略，例如
      </p>
      <p>
        <Code>
          &lt;meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src https://*; child-src
          'none';" /&gt;
        </Code>
      </p>

      <Table>
        <tbody>
          <tr>
            <th>upgrade-insecure-requests</th>
            <td>
              指示客户端将该站点的所有不安全 URL（通过 HTTP 提供的 URL）视为已被替换为安全 URL（通过 HTTPS 提供的
              URL）。该指令适用于需要重写大量不安全的旧版 URL 的网站。
            </td>
          </tr>
          <tr>
            <th>default-src</th>
            <td>
              可以为其他 CSP 拉取指令（fetch directives）提供备选项。
              <p>
                协议名如<Code>'http:'</Code> 或者 <Code>'https:'</Code>。必须带有冒号，不要有单引号。
              </p>
              <p>
                <Code>'self'</Code> 指向与要保护的文件所在的源，包括相同的 URL scheme 与端口号。必须有单引号。
              </p>
              <p>
                <Code>'unsafe-inline'</Code> 允许使用内联资源。
              </p>
              <p>
                <Code>'unsafe-eval'</Code> 允许使用 eval() 以及相似的函数来从字符串创建代码。必须有单引号。
              </p>
              <p>
                <Code>'none'</Code> 不允许任何内容。必须有单引号。
              </p>
            </td>
          </tr>
          <tr>
            <th>style-src</th>
            <td>
              指定样式表的有效来源 要允许内联样式<Code>'unsafe-inline'</Code>
            </td>
          </tr>
          <tr>
            <th>script-src</th>
            <td>指定有效的 JavaScript 源</td>
          </tr>
          <tr>
            <th>img-src</th>
            <td>指定图像的有效来源</td>
          </tr>
          <tr>
            <th>font-src</th>
            <td>
              指定<Code>@font-face</Code>的有效来源
            </td>
          </tr>
          <tr>
            <th>media-src</th>
            <td>
              指令指定使用<Code>&lt;audio&gt;</Code>和<Code>&lt;video&gt;</Code>元素加载媒体的有效来源
            </td>
          </tr>
          <tr>
            <th>connect-src</th>
            <td>
              用于限制通过使用脚本接口加载的 URL。
              <p>
                <Code>&lt;a&gt; ping</Code>
                <br />
                <Code>fetch()</Code>
                <br />
                <Code>XMLHttpRequest</Code>
                <br />
                <Code>WebSocket</Code>
                <br />
                <Code>EventSource</Code>
                <br />
                <Code>Navigator.sendBeacon()</Code>
              </p>
            </td>
          </tr>
          <tr>
            <th>child-src</th>
            <td>
              指令定义了使用如 <Code>&lt;frame&gt;</Code> 和 <Code>&lt;iframe&gt;</Code> 等元素在加载{' '}
              <Code>web worker</Code>
              和嵌套浏览上下文时的有效来源。对于 <Code>worker</Code>{' '}
              来说，不合规的请求会被用户代理当作致命的网络错误处理。
            </td>
          </tr>
          <tr>
            <th>frame-src</th>
            <td>允许您指定可以从何处加载页面中的 iframe</td>
          </tr>
          <tr>
            <th>frame-ancestors</th>
            <td>允许您指定哪些父源可以嵌入页面</td>
          </tr>
        </tbody>
      </Table>
      <h3>
        HTTP Strict-Transport-Security（通常简称为 HSTS）响应标头用来通知浏览器应该只通过 HTTPS 访问该站点，并且以后使用
        HTTP 访问该站点的所有尝试都应自动重定向到 HTTPS。
      </h3>
      <p>
        备注： 这比在你的服务器上简单地配置 HTTP 到 HTTPS（301）重定向要安全，因为初始的 HTTP 连接仍然易受到中间人攻击。
      </p>
      <p>
        <Code>Strict-Transport-Security: max-age=&lt;expire-time&gt;; includeSubDomains</Code>
      </p>
    </div>
  )
}

export default ContentSecurityPolicy
