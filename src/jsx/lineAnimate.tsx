import React from 'react'

export interface Props {
  playing?: boolean
  className?: string
  width?: number
  height?: number
}

const LineAnimate: React.FC<Props> = props => {
  const {playing, className, width = 22, height = 17} = props
  const getLine = (x: string, begin = '0s') => {
    return (
      <line x1={x} y1="2" x2={x} y2="15" stroke="url(#lineAnimateLinearGradient)" strokeWidth="2" strokeLinecap="round">
        <animate
          attributeName="y1"
          attributeType="XML"
          values={'2; 8; 2'}
          keyTimes={'0; 0.5; 1'}
          dur={'1s'}
          begin={begin}
          repeatCount={'indefinite'}
        />
        <animate
          attributeName="y2"
          attributeType="XML"
          values={'15; 9; 15'}
          keyTimes={'0; 0.5; 1'}
          dur={'1s'}
          begin={begin}
          repeatCount={'indefinite'}
        />
      </line>
    )
  }

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 22 17"
      fill="none">
      {playing ? (
        <>
          {getLine('1')}
          {getLine('6', '0.2s')}
          {getLine('11', '0.4s')}
          {getLine('16', '0.6s')}
          {getLine('21', '0.8s')}
        </>
      ) : (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.99609 1.77393C6.99609 1.22164 6.54838 0.773926 5.99609 0.773926C5.44381 0.773926 4.99609 1.22164 4.99609 1.77393L4.99609 15.1073C4.99609 15.6595 5.44381 16.1073 5.99609 16.1073C6.54838 16.1073 6.99609 15.6595 6.99609 15.1073L6.99609 1.77393ZM1.33008 4.77393C1.88236 4.77393 2.33008 5.22164 2.33008 5.77393L2.33008 11.1073C2.33008 11.6595 1.88236 12.1073 1.33008 12.1073C0.777793 12.1073 0.330078 11.6595 0.330078 11.1073V5.77393C0.330078 5.22164 0.777794 4.77393 1.33008 4.77393ZM10.6641 4.77393C11.2163 4.77393 11.6641 5.22164 11.6641 5.77393V11.1073C11.6641 11.6595 11.2163 12.1073 10.6641 12.1073C10.1118 12.1073 9.66406 11.6595 9.66406 11.1073V5.77393C9.66406 5.22164 10.1118 4.77393 10.6641 4.77393ZM16.3301 7.10693C16.3301 6.55465 15.8824 6.10693 15.3301 6.10693C14.7778 6.10693 14.3301 6.55465 14.3301 7.10693V9.7736C14.3301 10.3259 14.7778 10.7736 15.3301 10.7736C15.8824 10.7736 16.3301 10.3259 16.3301 9.7736V7.10693ZM19.9961 6.77393C20.5484 6.77393 20.9961 7.22164 20.9961 7.77393V9.10726C20.9961 9.65954 20.5484 10.1073 19.9961 10.1073C19.4438 10.1073 18.9961 9.65954 18.9961 9.10726V7.77393C18.9961 7.22164 19.4438 6.77393 19.9961 6.77393Z"
          fill="url(#lineAnimateLinearGradient)"
        />
      )}

      <defs>
        <linearGradient
          id="lineAnimateLinearGradient"
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
  )
}

export default LineAnimate
