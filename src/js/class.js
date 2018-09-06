class Dialog {
  constructor(title) {
    this.title = title
  }
  * [Symbol.iterator]() {
    for (let x = 0; x < 10; x++) {
      yield x
    }
  }
  static getName () {
    return this
  }
}

class SuccessDialog extends Dialog {
  constructor(title, success) {
    super(title)
    this.title = title
    this.success = success
  }

  getTitle () {
    return this.title
  }

  getSuccess () {
    return this.success
  }

  getName () {
    return super.getName()
  }
}

const dialog1 = new Dialog('title')
const successDialog1 = new SuccessDialog('title', 'success')
console.log(successDialog1.getName)

console.log(dialog1, successDialog1)