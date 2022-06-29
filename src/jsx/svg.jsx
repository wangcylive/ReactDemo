import React from 'react'

const SvgDemo = (props) => {
  const onClickRect = (event) => {
    console.log(event, event.target)
  }

  return (
    <div>
      <h1>SVG</h1>
      <svg id="svg" width="200" height="200" version="1.1" xmlns="http://www.w3.org/2000/svg">
        {
          Array.from(new Array(3)).map((item, index) =>
            <line key={index} x1={0} y1={50 * (index + 1)} x2="200" y2={50 * (index + 1)} stroke="hsla(0, 0%, 0%, .3)"/>)
        }
        {
          Array.from(new Array(3)).map((item, index) =>
            <line key={index} x1={50 * (index + 1)} y1={0} x2={50 * (index + 1)} y2={200} stroke="hsla(0, 0%, 0%, .3)"/>)
        }
        <rect x="5" y="5" width="40" height="40" stroke="black" strokeWidth="1" rx="5" ry="5" fill="transparent"
              onClick={onClickRect}/>
        <circle cx="75" cy="25" r="20" fill="#ccc" stroke="#333" strokeWidth="1"/>
        <ellipse cx="125" cy="25" rx="20" ry="10"/>
        <polyline points="160 10, 190 20, 160 30, 190 40" stroke="red" fill="transparent"/>
        <polygon points="5 55, 40 55, 15 80"/>
        <path d="M55 55 H 95 V 95 H 55 Z"/>
        <path d="M105 55 h 20 v 20 h -20 Z"/>
        <path d="M155 60 C 180 80, 180 80, 190 60" fill="transparent" stroke="red"/>
        <path d="M5 135 c 15 -30, 30 -40, 40 0" fill="transparent" stroke="green" strokeWidth={5}
              strokeOpacity={0.5} strokeLinecap="round"/>
        <text x={75} y={130} textAnchor="middle">SVG</text>
        <g fill="red">
          <rect x={105} y={105} width={20} height={20}/>
          <rect x={105} y={130} width={10} height={10} transform="translate(10, 0)"/>
        </g>
      </svg>
    </div>
  )
}

export default SvgDemo
