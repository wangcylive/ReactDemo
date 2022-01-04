import React, {useState} from 'react'
import Tooltip from '@/components/Tooltip/index'
import './demo.scss'

const SS: React.FC = () => {
  return <div>SS</div>
}

class AA extends React.Component {
  constructor(props: any) {
    super(props)
  }

  render() {
    return <div>AA</div>
  }
}

const Demo: React.FC = () => {
  const [visible, setVisible] = useState(true)
  const onMouseEnter = (e: React.MouseEvent, num: number) => {
    console.log('鼠标 hover', e, num)
  }
  return (
    <div className="tooltip-demo">
      <h3>Tooltip</h3>
      <hr />
      <Tooltip content={'点击播放'}>
        <button onMouseEnter={e => onMouseEnter(e, 3)}>Button1</button>
        <button>Button2</button>
      </Tooltip>
      <hr />
      <div>
        <h3>placement</h3>
        {/*<div style={{height: '100vh'}}></div>*/}
        <div className="placement-group">
          <Tooltip content={'提示文字 Tooltip'} placement={'top'}>
            <button>Top</button>
          </Tooltip>
          <Tooltip content={'提示文字 Tooltip'} placement={'right'}>
            <button>Right</button>
          </Tooltip>
          <Tooltip content={'提示文字 Tooltip'} placement={'bottom'}>
            <button>Bottom</button>
          </Tooltip>
          <Tooltip content={'提示文字 Tooltip'} placement={'left'}>
            <button>Left</button>
          </Tooltip>
        </div>
        <div className="inner-scroll">
          <ul>
            {Array.from({length: 10}).map((_, index) => (
              <li>{index + 1}</li>
            ))}
          </ul>
          <div style={{height: '150px'}}></div>
          <p style={{width: '300px'}}>这里是一段文字</p>
          <div style={{width: '400px'}}>
            <span>这里是一段文字</span>
            <span>这里是一段文字</span>
            <Tooltip
              reachable={true}
              content={
                <div>
                  打开
                  <a href="https://www.baidu.com" style={{color: '#fff'}}>
                    链接
                  </a>
                </div>
              }>
              <button>提示</button>
            </Tooltip>
            <span>这里是一段文字</span>
          </div>

          <ol>
            {Array.from({length: 10}).map((_, index) => (
              <li>{index + 1}</li>
            ))}
          </ol>
        </div>
        <hr />
        <div>
          <button onClick={() => setVisible(!visible)} style={{display: 'block'}}>
            {visible ? '隐藏' : '显示'}
          </button>
          {visible && (
            <Tooltip content="Tooltip 销毁">
              <img
                src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png"
                height={100}
                style={{border: '1px solid #eee'}}
              />
            </Tooltip>
          )}
        </div>

        <div style={{height: '100vh'}}></div>
      </div>
    </div>
  )
}

export default Demo
