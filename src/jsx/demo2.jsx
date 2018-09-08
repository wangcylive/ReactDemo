import React from 'react';
import ReactDOM from 'react-dom';

const names = [ 'Alice', 'Emily', 'Kate' ];

function showIndex(index, context) {
    console.log(index, context)
}

export default function () {
  return (
    <div>
      {
        names.map((name, index) => <div key={index} onClick={(e) => showIndex(index, this)}>Hello, {name}{index}</div>)
      }
    </div>
  )
}

async function getTime (index) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (index === 2) {
        reject(Date.now())
      } else {
        resolve(Date.now())
      }
    }, 1000)
  })
}

async function forShowTime () {
  for (let i = 0; i < 5; i++) {
    const time = await getTime(i).catch((err) => console.error(err))
    console.log('for', time, i)
  }

  console.log('for Done')

  return 'hhh'
}

// forShowTime()

async function forEachShowTime () {
  const arr = [1, 2, 3, 4, 5]

  arr.forEach(async (item) => {
    const time = await getTime()
    console.log('forEach', time, item)
  })

  console.log('forEach Done')
}

// forEachShowTime()

async function allShowtime () {
  const arr = []
  for (let i = 0; i < 5; i++) {
    arr.push(getTime())
  }

  const res = await Promise.all([...arr]).then((res) => {
    console.log('all', res)
  })

  console.log('all Done')
}

// allShowtime()
