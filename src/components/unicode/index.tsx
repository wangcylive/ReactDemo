// https://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html
// https://apps.timwhitlock.info/
// https://blog.csdn.net/weixin_34281537/article/details/92508414
// https://juejin.cn/post/6844903841817690119
// https://www.cnblogs.com/fundebug/p/javascript_and_unicode.html
import React from 'react'
import styled from 'styled-components'

const regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g

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
  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files.length) {
      return
    }
    Array.from(files).forEach(file => {
      file.arrayBuffer().then(af => {
        const uni8 = new Uint8Array(af)
        console.log(file, uni8)
      })
    })
    console.log('change', files)
  }

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
      <CodeStyle>{`String.fromCharCode(0xD83D, 0xDE04) = '😄'
        String.fromCharCode(55357, 56836) = '😄'
        String.fromCharCode(49) = '1'
        String.fromCharCode(20013) = '中'
        String.fromCharCode(49, 20013) = '1中'
        `}</CodeStyle>
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
      <p>码位 通常被格式化为十六进制数字，零填充至少四位数，格式为 U +前缀</p>
      <p>
        Unicode 最前面的 65536 (0b1111111111111111 2byte 16bit) 个字符位，称为 基本多文种平面（BMP-—Basic Multilingual
        Plane），又简称为“零号平面”, plane 0）,它的 码位 范围是从 U+0000 到 U+FFFF。最常见的字符都放在这个平面上，这是
        Unicode 最先定义和公布的一个平面。
      </p>
      <p>
        剩下的字符都放在 辅助平面(Supplementary Plane)或者 星形平面(astral planes) ，码位范围从 U+010000 一直到
        U+10FFFF，共 16 个辅助平面。 辅助平面内的码位很容易识别:如果需要超过 4
        个十六进制数字来表示码位，那么它就是一个辅助平面内的码。
      </p>
      <p>网络上最常见的 Unicode 字符编码是UTF-8。还存在一些其他编码，如 UTF-16 或过时的 UCS-2，但推荐使用 UTF-8。</p>
      <CodeStyle>
        {`'\\x41\\x42\\x7a' = 'ABz'
        '\\u4e2d' = '中'
        `}
      </CodeStyle>
      <p>\x41 码位为 U+0041 表示大写字母 A。这些转义序列可用于 U+0000 到 U+00FF 范围内的码位。</p>
      <p>Js 二进制开头0b 八进制开头0 十六进制开头 0x</p>
      <h2>UTF-8</h2>
      <p>
        UTF是Unicode Transformation
        Format的缩写，意思是“Unicode转换格式”，后面的数字表明至少使用多少个比特位来存储字符。
      </p>
      <p>
        UTF-8 (UCS Transformation Format 8) 是万维网上最常用的字符编码。每个字符由 1 到 6 个字节表示。UTF-8 与 ASCII
        向后兼容，可以表示任何标准的 Unicode 字符。
      </p>
      <p>常用的英文字母被编码成1个字节，汉字通常是3个字节，只有很生僻的字符才会被编码成4-6个字节</p>
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
      <p>utf-16是用两个字节来编码所有的字符（可变长），utf-32则选择用4个字节来编码</p>
      <p>
        UTF-8和UTF-16的优劣.如果全部英文或英文与其他文字混合,但英文占绝大部分,用UTF-8就比UTF-16节省了很多空间.而如果全部是中文这样类似的字符或者混合字符中中文占绝大多数.UTF-16就占优势了,可以节省很多空间
      </p>
      <h2>计算机怎么知道某一个文件到底采用哪一种方式编码？</h2>
      <p>
        Unicode 规范定义，每一个文件的最前面分别加入一个表示编码顺序的字符，这个字符的名字叫做"零宽度非换行空格"（zero
        width no-break space）
      </p>
      <p>
        UTF-8不需要BOM来表明字节顺序，但可以用BOM来表明编码方式，在windows 记事本保存为 UTF-8 BOM 会带这EF BB BF
        这3个字节
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
      <hr />
      <input type="file" multiple={true} onChange={onChangeFile} placeholder="选择文件测试，支持多选" />
      <hr />
      <h2>UTF-16</h2>
      <p>
        UTF-16 是一种变长表示，它对来自常用字符 UCS-2 的码位，仍然用 2 个字节表示。而对来新增非常用的码位却用 4
        个字节表示。二者能互相区分开来，这是 UTF-16 的精妙之处所在。
      </p>
      <p>
        另外需要说明的是，最开始的 2^16 那些数据中并非都映射满了。从 U+D800（55296） 到 U+DFFF（57343）共 2048
        个码位，是永久保留的，不映射到任何 Unicode 字符。它的存在为 UTF-16 提供了方便。
      </p>
      <p>举例来说，字符😂的码位是 U+1F602(128514)，大于 65535，因此是后添加的字符。 </p>
      <p>首先用它先减去 65536，得到 62978，对应的二进制是 1111011000000010。 </p>
      <p>
        然后左补充 0 至 20 位：00001111011000000010。 再从中间切断成上下两值：0000111101（61） 和 1000000010（514）。
        添加 0xD800（55296）到上值，以形成高位：55296 + 61 = 55357（0xD83D）。 添加
        0xDC00（56320）到下值，以形成低位：56320+ 514 = 56834（0xDE02）。 0xD83D 与 0xDE02构成一个代理对，来表示码位
        U+1F602。
      </p>
      <CodeStyle>
        {`😄
          128516
          0x1f604
          \\u{1f604}
          128516 - 65536 = 62980
          0000111101 1000000100
          61         516
          55296 + 61 = 55357  0xd83d
          56320 + 516 = 56836 0xde04
          😄 = \\u{1f604}
          😄 = \\ud83d\\ude04
          `}
      </CodeStyle>
      <p>
        刚开始 Unicode 设计人员觉得 2^16 (65536)就该足够了，于是产生了 UCS-2。（注：事实上 Unicode 和 UCS
        在最开始时不是一家。）
      </p>
      <p>
        <CodeStyle>'😂'.length = 2</CodeStyle> 之所以为 2，是因为 JS 至今仍然使用 UCS-2 那种 16 进制读取方式。
      </p>
      <p>
        JavaScript 使用 UTF-16 编码，其中每个 Unicode 字符可以编码为一个或两个代码单元，因此 length
        返回的值可能与字符串中 Unicode 字符的实际数量不匹配。
      </p>
      <p>
        由于 length
        统计的是代码单元而不是字符，如果你想得到字符的数量，你可以首先用它的迭代器分割字符串，它按字符进行迭代：
      </p>
      <CodeStyle>{`[...str].length
        '😄a'.length = 3
        [...'😄a'].length = 2
        '👨‍👩‍👧‍👦'.length = 11
        [...'👨‍👩‍👧‍👦‍'].length = 8
        😄 = \\ud83d\\ude04
        '😄abc'.substring(0, 1) = '\\uD83D'

        `}</CodeStyle>
      <h2>Base64</h2>
      <p>
        Base64 是一组相似的二进制到文本（binary-to-text）的编码规则，使得二进制数据在解释成 radix-64 的表现形式后能够用
        ASCII 字符串的格式表示出来。
      </p>
      <p>
        Base64要求把每三个8Bit的字节转换为四个6Bit的字节（3*8 = 4*6 =
        24），然后把6Bit再添两位高位0，组成四个8Bit的字节，也就是说，转换后的字符串理论上将要比原来的长1/3。
      </p>
      <p>Base64 编码普遍应用于需要通过被设计为处理文本数据的媒介上储存和传输二进制数据而需要编码该二进制数据的场景。</p>
    </div>
  )
}

export default UnicodeDemo
