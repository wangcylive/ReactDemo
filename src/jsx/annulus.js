const pixelRatio = window.devicePixelRatio || 1

/**
 * canvas 圆环
 * @param width {number}
 * @param height {number}
 * @param lineWidth {number}
 * @param outsideStroke {string} 外圆环颜色
 * @param insideStroke {string} 内圆环颜色
 * @returns {Promise<unknown>|{el: HTMLCanvasElement, draw(*, *=): Promise<unknown>}}
 */
function canvasAnnulus ({ width = 150, height = 150, lineWidth = 10, outsideStroke = '#ebeef5', insideStroke = '#409eff' } = {}) {
  const w = width * pixelRatio
  const h = height * pixelRatio
  const borderWidth = lineWidth * pixelRatio

  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h

  const context = canvas.getContext('2d')
  context.lineWidth = borderWidth
  context.strokeStyle = outsideStroke
  context.beginPath()
  context.arc(w / 2, h / 2, w / 2 - borderWidth / 2, 0, 2 * Math.PI, false)
  context.stroke()

  let requestAnimationID

  let oldAngel = -0.5 * Math.PI

  return {
    el: canvas,

    /**
     * 绘制动画
     * @param angel number 0~360
     * @param duration number 绘制动画时长，单位ms
     * @returns {Promise<unknown>}
     */
    draw (angel, duration = 1000) {
      return new Promise((resolve) => {
        // -0.5 1.5
        const sAngle = (angel / 360 * 2 - 0.5) * Math.PI

        const changeAngle = (sAngle - oldAngel) / 60 / (duration / 1e3)

        let animationAngle = oldAngel

        function animation () {
          requestAnimationID = requestAnimationFrame(function () {
            context.clearRect(0, 0, w, h)

            context.strokeStyle = outsideStroke
            context.beginPath()
            context.arc(w / 2, h / 2, w / 2 - borderWidth / 2, 0, 2 * Math.PI, false)
            context.stroke()

            animationAngle += changeAngle

            if(sAngle > oldAngel) {
              if(animationAngle > sAngle) {
                oldAngel = animationAngle = sAngle
              }
            } else if(sAngle < oldAngel) {
              if(animationAngle < sAngle) {
                oldAngel = animationAngle = sAngle
              }
            }

            context.lineWidth = borderWidth
            context.lineCap = 'round'
            context.strokeStyle = insideStroke
            context.beginPath()
            context.arc(w / 2, h / 2, w / 2 - borderWidth / 2, animationAngle, 1.5 * Math.PI, false)
            context.stroke()

            if(oldAngel === sAngle) {
              cancelAnimationFrame(requestAnimationID)

              resolve()
            } else {
              animation()
            }
          })
        }

        animation()
      })
    },
  }
}

export default canvasAnnulus
