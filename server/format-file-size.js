/**
 * 格式化文件尺寸 EX:1.00MB
 * @param value {number}
 * @return {string}
 */
function formatFileSize(value) {
  if (value <= 0) {
    return '0Bytes'
  }
  const unitArray = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const floatSize = parseFloat(value)
  const index = Math.floor(Math.log(floatSize) / Math.log(1024))
  const size = (floatSize / Math.pow(1024, index)).toFixed(2)
  return size + unitArray[index]
}

module.exports = formatFileSize
