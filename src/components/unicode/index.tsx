// https://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html
// https://apps.timwhitlock.info/
import React from 'react'
import styled from 'styled-components'

const TableStyled = styled.table`
  border-collapse: collapse;

  td,
  th {
    border: 1px solid #ccc;
    padding: 8px 15px;
  }
`

const ImgStyle = styled.img`
  margin: 1em 0;
  display: block;
  max-width: 800px;
  height: auto;
  box-shadow: 0 0 3px hsla(0, 0%, 0%, 0.2);
`

const CodeStyle = styled.code`
  display: inline-block;
  background-color: hsla(0, 0%, 0%, 0.06);
  padding: 15px;
  line-height: 1.6;
  white-space: pre-line;
  color: #333;
  border-radius: 4px;
`

const UnicodeDemo: React.FC = () => {
  return (
    <div>
      <h2>encodeURIComponent() 和 encodeURI 有以下几个不同点：</h2>
      <CodeStyle>
        {`var set1 = ";,/?:@&=+$";  // 保留字符
var set2 = "-_.!~*'()";   // 不转义字符
var set3 = "#";           // 数字标志
var set4 = "ABC abc 123"; // 字母数字字符和空格

console.log(encodeURI(set1)); // ;,/?:@&=+$
console.log(encodeURI(set2)); // -_.!~*'()
console.log(encodeURI(set3)); // #
console.log(encodeURI(set4)); // ABC%20abc%20123 (空格被编码为 %20)

console.log(encodeURIComponent(set1)); // %3B%2C%2F%3F%3A%40%26%3D%2B%24
console.log(encodeURIComponent(set2)); // -_.!~*'()
console.log(encodeURIComponent(set3)); // %23
console.log(encodeURIComponent(set4)); // ABC%20abc%20123 (空格被编码为 %20)`}
      </CodeStyle>
      <h2>String.fromCharCode(num1,[, ...[, numN]])</h2>
      <p>
        一系列 UTF-16 代码单元的数字。范围介于 0 到 65535（0xFFFF）之间。大于 0xFFFF 的数字将被截断。不进行有效性检查。
      </p>
      <h2>String.fromCodePoint(num1,[, ...[, numN]])</h2>
      <p>使用指定的 Unicode 编码位置创建的字符串。</p>
      <p>ES6 提供了String.fromCodePoint()方法，可以识别大于0xFFFF的字符，弥补了String.fromCharCode()方法的不足。</p>
      <CodeStyle>
        {`String.fromCharCode(97) = 'a'
        String.fromCodePoint(97) = 'a'
        String.fromCharCode(20013) = '中'
        String.fromCodePoint(20013) = '中'
        String.fromCharCode(128516) = ''
        String.fromCodePoint(128516) = '😄'
        `}
      </CodeStyle>
      <h2>String.prototype.charCodeAt(index)</h2>
      <p>
        charCodeAt() 方法返回 0 到 65535（0xFFFF）之间的整数，表示给定索引处的 UTF-16 代码单元，如果 index
        超出范围，charCodeAt() 返回 NaN
      </p>
      <h2>String.prototype.codePointAt(index)</h2>
      <p>codePointAt() 方法返回 一个 Unicode 编码点值的非负整数。如果在索引处没找到元素则返回 undefined</p>
      <CodeStyle>
        {`'a'.charCodeAt(0) = 97
        'a'.codePointAt(0) = 97
        '中'.charCodeAt(0) = 20013
        '中'.codePointAt(0) = 20013
        '😄'.charCodeAt(0) = 55357
        '😄'.codePointAt(0) = 128516
        `}
      </CodeStyle>
      <h2>ASCII码</h2>
      <p>
        ASCII (American Standard Code for Information Interchange，美国信息交换标准码)， 从 2007 年开始逐渐被UTF-8
        代替。
      </p>
      <p>
        ASCII
        码一共规定了128个字符的编码，比如空格SPACE是32（二进制00100000），大写的字母A是65（二进制01000001）。这128个符号（包括32个不能打印出来的控制符号），只占用了一个字节的后面7位，最前面的一位统一规定为0。
      </p>
      <h2>Unicode</h2>
      <p>Unicode 是一种字符集标准，用于对来自世界上不同语言、文字系统和符号进行编号和字符定义。</p>
      <p>
        Unicode 码点（code points）的范围从 0 到 1114111 (0x10FFFF）。开头的 128 个 Unicode 编码单元和 ASCII
        字符编码一样。
      </p>
      <p>网络上最常见的 Unicode 字符编码是UTF-8。还存在一些其他编码，如 UTF-16 或过时的 UCS-2，但推荐使用 UTF-8。</p>
      <h2>UTF-8</h2>
      <p>
        UTF-8 (UCS Transformation Format 8) 是万维网上最常用的字符编码。每个字符由 1 到 4 个字节表示。UTF-8 与 ASCII
        向后兼容，可以表示任何标准的 Unicode 字符。
      </p>
      <p>UTF-8 是 Unicode 的实现方式之一。</p>
      <ImgStyle src={require('./img.png').default} />
      <p>
        UTF-8
        最大的一个特点，就是它是一种变长的编码方式。它可以使用1~4个字节表示一个符号，根据不同的符号而变化字节长度。
      </p>
      <p>UTF-8 的编码规则很简单，只有二条：</p>
      <ul>
        <li>
          对于单字节的符号，字节的第一位设为0，后面7位为这个符号的 Unicode 码。因此对于英语字母，UTF-8 编码和 ASCII
          码是相同的。
        </li>
        <li>
          对于n字节的符号（n &gt; 1），第一个字节的前n位都设为1，第n +
          1位设为0，后面字节的前两位一律设为10。剩下的没有提及的二进制位，全部为这个符号的 Unicode 码。
        </li>
      </ul>
      <p>下表总结了编码规则，字母x表示可用编码的位。</p>
      <TableStyled>
        <thead>
          <tr>
            <th>Unicode符号范围</th>
            <th>UTF-8编码方式</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0000 0000-0000 007F(0 - 127)</td>
            <td>0xxxxxxx</td>
          </tr>
          <tr>
            <td>0000 0080-0000 07FF(128 - 2047)</td>
            <td>110xxxxx 10xxxxxx</td>
          </tr>
          <tr>
            <td>0000 0800-0000 FFFF(2048 - 65535)</td>
            <td>1110xxxx 10xxxxxx 10xxxxxx</td>
          </tr>
          <tr>
            <td>0001 0000-0010 FFFF(65536 - 1114111)</td>
            <td>11110xxx 10xxxxxx 10xxxxxx 10xxxxxx</td>
          </tr>
        </tbody>
      </TableStyled>
      <p>
        严的 Unicode 是4E25（100111000100101），根据上表，可以发现4E25处在第三行的范围内（0000 0800 - 0000
        FFFF），因此严的 UTF-8 编码需要三个字节，即格式是1110xxxx 10xxxxxx
        10xxxxxx。然后，从严的最后一个二进制位开始，依次从后向前填入格式中的x，多出的位补0。这样就得到了，严的 UTF-8
        编码是11100100 10111000 10100101，转换成十六进制就是E4B8A5。
      </p>
      <CodeStyle>
        {`a => 97 => 01100001 => Uint8Array([97])
          中 => 20013 => 1001110 00101101 => 11100100 10111000 10101101 => Unit8Array([228, 184, 173])
          😄 => 128516 => 1 11110110 00000100 => 11110000 10011111 10011000 10000100 => Uint8Array([240, 159, 152, 132])
          `}
      </CodeStyle>
      <p>utf-16是用两个字节来编码所有的字符，utf-32则选择用4个字节来编码</p>
      <p>
        UTF-8和UTF-16的优劣.如果全部英文或英文与其他文字混合,但英文占绝大部分,用UTF-8就比UTF-16节省了很多空间.而如果全部是中文这样类似的字符或者混合字符中中文占绝大多数.UTF-16就占优势了,可以节省很多空间
      </p>
      <h2>计算机怎么知道某一个文件到底采用哪一种方式编码？</h2>
      <p>
        Unicode 规范定义，每一个文件的最前面分别加入一个表示编码顺序的字符，这个字符的名字叫做"零宽度非换行空格"（zero
        width no-break space）
      </p>
      <TableStyled>
        <tbody>
          <tr>
            <td>EF BB BF</td>
            <td>UTF-8</td>
          </tr>
          <tr>
            <td>FE FF</td>
            <td>UTF-16/UCS-2, little endian</td>
          </tr>
          <tr>
            <td>FF FE</td>
            <td>UTF-16/UCS-2, big endian</td>
          </tr>
          <tr>
            <td>FF FE 00 00</td>
            <td>UTF-32/UCS-4, little endian.</td>
          </tr>
          <tr>
            <td>00 00 FE FF</td>
            <td>UTF-32/UCS-4, big-endian.</td>
          </tr>
        </tbody>
      </TableStyled>
    </div>
  )
}

export default UnicodeDemo
