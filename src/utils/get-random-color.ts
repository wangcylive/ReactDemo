function getRandomColor() {
  const rgb = Array.from({length: 3}).map(() => {
    return Math.floor(Math.random() * 256)
  })

  return `rgb(${rgb.join(',')})`
}

export default getRandomColor
