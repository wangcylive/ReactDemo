export function select(element) {
  let selectedText

  if (element.nodeName === 'SELECT') {
    element.focus()

    selectedText = element.value
  } else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
    var isReadOnly = element.hasAttribute('readonly')

    if (!isReadOnly) {
      element.setAttribute('readonly', '')
    }

    element.select()
    element.setSelectionRange(0, element.value.length)

    if (!isReadOnly) {
      element.removeAttribute('readonly')
    }

    selectedText = element.value
  } else {
    if (element.hasAttribute('contenteditable')) {
      element.focus()
    }

    var selection = window.getSelection()
    var range = document.createRange()

    range.selectNodeContents(element)
    selection.removeAllRanges()
    selection.addRange(range)

    selectedText = selection.toString()
  }

  return selectedText
}

export function copyText(elem) {
  return new Promise((resolve, reject) => {
    try {
      if (elem.nodeName === 'INPUT') {
        elem.select()

        const result = document.execCommand('copy')

        if (result) {
          resolve()
        } else {
          reject()
        }
      } else {
        elem.contentEditable = 'true'
        const range = document.createRange()
        range.selectNodeContents(elem)
        const sel = window.getSelection()
        sel.removeAllRanges()
        sel.addRange(range)
        elem.removeAttribute('contentEditable')
        const result = document.execCommand('copy')
        if (document.activeElement.blur) {
          document.activeElement.blur()
        }

        if (result) {
          sel.removeAllRanges()
          resolve()
        } else {
          reject()
        }
      }
    } catch (e) {
      reject()
    }
  })
}
