import React from 'react'
import slarkImg from '@/images/slark.jpeg'
import LineAnimate from '@/jsx/lineAnimate'

const svgStyle = {
  margin: '0 0 0 5px',
  border: '1px solid #000',
}

const SvgDemo = props => {
  const onClickRect = event => {
    console.log(event, event.target)
  }

  return (
    <div>
      <h1>SVG</h1>
      <svg id="svg" width="200" height="200" version="1.1" xmlns="http://www.w3.org/2000/svg">
        {Array.from(new Array(3)).map((item, index) => (
          <line key={index} x1={0} y1={50 * (index + 1)} x2="200" y2={50 * (index + 1)} stroke="hsla(0, 0%, 0%, .3)" />
        ))}
        {Array.from(new Array(3)).map((item, index) => (
          <line key={index} x1={50 * (index + 1)} y1={0} x2={50 * (index + 1)} y2={200} stroke="hsla(0, 0%, 0%, .3)" />
        ))}
        <rect
          x="5"
          y="5"
          width="40"
          height="40"
          stroke="black"
          strokeWidth="1"
          rx="5"
          ry="5"
          fill="transparent"
          onClick={onClickRect}
        />
        <circle cx="75" cy="25" r="20" fill="#ccc" stroke="#333" strokeWidth="1" />
        <ellipse cx="125" cy="25" rx="20" ry="10" />
        <polyline points="160 10, 190 20, 160 30, 190 40" stroke="red" fill="transparent" />
        <polygon
          points="5 55, 40 55, 15 80"
          onClick={e => {
            console.log(e)
          }}
          onMouseEnter={e => {
            console.log(e)
          }}
        />
        <path d="M55 55 H 95 V 95 H 55 Z" />
        <path d="M105 55 h 20 v 20 h -20 Z" />
        <path d="M155 60 C 180 80, 180 80, 190 60" fill="transparent" stroke="red" />
        <path
          d="M5 135 c 15 -30, 30 -40, 40 0"
          fill="transparent"
          stroke="green"
          strokeWidth={5}
          strokeOpacity={0.5}
          strokeLinecap="round"
        />
        <text x={75} y={130} textAnchor="middle">
          SVG
        </text>
        <g fill="red">
          <rect x={105} y={105} width={20} height={20} />
          <rect x={105} y={130} width={10} height={10} transform="translate(10, 0)" />
        </g>
      </svg>

      <svg width="200" height="200" version="1.1" xmlns="http://www.w3.org/2000/svg" style={svgStyle}>
        <path id="test1" stroke="transparent" fill="none" d="M50 75a60 60 0 1 0 120 0a60 60 0 1 0 -120 0z" />

        <text>
          <textPath href="#test1">窗前明月光，疑是地上霜，😄😄😄😄😄😄😄😄😄😄😄😄😄😄😄😄😄😄😄😄😄😄😄</textPath>
        </text>
      </svg>

      <svg width="200" height="200" version="1.1" xmlns="http://www.w3.org/2000/svg" style={svgStyle}>
        <path
          id="test2"
          fill="none"
          stroke="red"
          d="M 10,100
           Q 100,10 190,100"
        />
        <text>
          <textPath href="#test2" fontSize={12}>
            😄😄😄😄😄😄😄😄😄😄😄😄😄😄😄😄😄😄😄😄😄😄😄
          </textPath>
        </text>
      </svg>

      <svg width="225" height="225" version="1.1" style={svgStyle}>
        <image href={slarkImg} x={0} y={0} width={225} height={225} />
      </svg>

      <svg width="200" height="200" version="1.1" style={svgStyle}>
        <defs>
          <pattern id="imgId1" width="1" height="1">
            <image href={slarkImg} width={100} height={100}></image>
          </pattern>
          <pattern id="imgId2" width="1" height="1">
            <image href={slarkImg} width={40} height={40}></image>
          </pattern>
          <pattern id="imgId3" width="1" height="1">
            <image href={slarkImg} width={90} height={90}></image>
          </pattern>
        </defs>
        <rect
          className="nodeCircle"
          fill="url(#imgId1)"
          width="100"
          stroke="#f00"
          strokeWidth={1}
          height="100"
          rx={10}
          ry={10}
          x="2"
          y="2">
          <animate attributeName="x" from="0" to="100" dur="2s" repeatCount="indefinite" />
        </rect>
        <circle cx="120" cy="120" r="20" fill="url(#imgId2)" stroke="#333" strokeWidth="1">
          <animate
            attributeName="cy"
            attributeType="XML"
            values={'120; 140; 120'}
            keyTimes={'0; 0.8; 1'}
            dur={'1s'}
            repeatCount={'indefinite'}
          />
        </circle>
        <polygon points="110 10, 190 10, 190 100" fill="url(#imgId3)">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={'0 110 10'}
            to={'360 110 10'}
            dur={'1s'}
            repeatCount={'indefinite'}></animateTransform>
        </polygon>
      </svg>
      <svg viewBox="0 0 200 100" width={200} height={200} xmlns="http://www.w3.org/2000/svg" style={svgStyle}>
        <path id="path1" fill="none" stroke="lightgrey" d="M20,50 C20,-50 180,150 180,50 C180-50 20,150 20,50 z" />

        {/*<circle r="5" fill="red">*/}
        {/*  <animateMotion dur="10s" repeatCount="indefinite">*/}
        {/*    <mpath href={'#path1'} />*/}
        {/*  </animateMotion>*/}
        {/*</circle>*/}

        <text fill="red">
          8
          <animateMotion dur="10s" repeatCount="indefinite">
            <mpath href={'#path1'} />
          </animateMotion>
        </text>
      </svg>

      <svg xmlns="http://www.w3.org/2000/svg" width="220" height="170" viewBox="0 0 22 17" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.99609 1.77393C6.99609 1.22164 6.54838 0.773926 5.99609 0.773926C5.44381 0.773926 4.99609 1.22164 4.99609 1.77393L4.99609 15.1073C4.99609 15.6595 5.44381 16.1073 5.99609 16.1073C6.54838 16.1073 6.99609 15.6595 6.99609 15.1073L6.99609 1.77393ZM1.33008 4.77393C1.88236 4.77393 2.33008 5.22164 2.33008 5.77393L2.33008 11.1073C2.33008 11.6595 1.88236 12.1073 1.33008 12.1073C0.777793 12.1073 0.330078 11.6595 0.330078 11.1073V5.77393C0.330078 5.22164 0.777794 4.77393 1.33008 4.77393ZM10.6641 4.77393C11.2163 4.77393 11.6641 5.22164 11.6641 5.77393V11.1073C11.6641 11.6595 11.2163 12.1073 10.6641 12.1073C10.1118 12.1073 9.66406 11.6595 9.66406 11.1073V5.77393C9.66406 5.22164 10.1118 4.77393 10.6641 4.77393ZM16.3301 7.10693C16.3301 6.55465 15.8824 6.10693 15.3301 6.10693C14.7778 6.10693 14.3301 6.55465 14.3301 7.10693V9.7736C14.3301 10.3259 14.7778 10.7736 15.3301 10.7736C15.8824 10.7736 16.3301 10.3259 16.3301 9.7736V7.10693ZM19.9961 6.77393C20.5484 6.77393 20.9961 7.22164 20.9961 7.77393V9.10726C20.9961 9.65954 20.5484 10.1073 19.9961 10.1073C19.4438 10.1073 18.9961 9.65954 18.9961 9.10726V7.77393C18.9961 7.22164 19.4438 6.77393 19.9961 6.77393Z"
          fill="url(#paint0_linear_3785_2638)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_3785_2638"
            x1="17.8962"
            y1="13.8073"
            x2="9.61808"
            y2="-0.139125"
            gradientUnits="userSpaceOnUse">
            <stop stopColor="#3EDCFF" />
            <stop offset="1" stopColor="#6183FF" />
          </linearGradient>
        </defs>
      </svg>
      <LineAnimate />
    </div>
  )
}

export default SvgDemo
