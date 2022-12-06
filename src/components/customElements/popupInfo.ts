class PopupInfo extends HTMLElement {
  static get observedAttributes() {
    return ['context', 'textContent']
  }

  constructor() {
    super()
    console.log('constructor', this)
  }

  // 当 custom element 首次被插入文档 DOM 时，被调用
  connectedCallback() {
    console.log('connectedCallback', this)

    const shadow = this.attachShadow({mode: 'open'})
    const context = this.getAttribute('context')
    const wrap = document.createElement('div')
    wrap.className = 'wrap'
    const info = document.createElement('div')
    info.className = 'info'
    info.textContent = context
    info.style.display = 'none'
    const text = document.createElement('span')
    text.textContent = this.textContent
    wrap.appendChild(text)
    wrap.appendChild(info)

    text.addEventListener('mouseenter', function () {
      info.style.display = 'block'
    })
    text.addEventListener('mouseleave', function () {
      info.style.display = 'none'
    })

    const style = document.createElement('style')
    style.textContent = `
    .wrap {
      display: inline-block;
      position: relative;
    }
    .info {
      position: absolute;
      left: 0;
      top: -10px;
      width: 200px;
      border: 1px solid #333;
      border-radius: 5px;
      padding: 10px;
      transform: translateY(-100%);
      background-color: #fff;
    }
    `
    shadow.appendChild(wrap)
    shadow.appendChild(style)
  }
  // 当 custom element 从文档 DOM 中删除时，被调用
  disconnectedCallback() {
    console.log('disconnectedCallback', this)
  }
  // 当 custom element 被移动到新的文档时，被调用
  adoptedCallback() {
    console.log('adoptedCallback', this)
  }
  // 当 custom element 增加、删除、修改自身属性时，被调用
  attributeChangedCallback(name, oldValue, newValue) {
    const shadow = this.shadowRoot
    const info = shadow?.querySelector('.info')
    if (info) {
      info.textContent = this.getAttribute('context')
    }
    console.log('attributeChangedCallback', this, name, oldValue, newValue)
  }
}

customElements.define('popup-info', PopupInfo)
// customElements.whenDefined('popup-info').then(res => {
//   console.log('whenDefined', res)
// })

customElements
  .whenDefined('popup-info3')
  .then(res => {
    console.log('whenDefined', res)
  })
  .catch(err => {
    console.log('whenDefined', err)
  })
