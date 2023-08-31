function getGauge(value: number) {
  return {
    grid: {
      left: '1%',
      right: '1%',
      top: '1%',
      bottom: '1%',
      backgroundColor: 'rgba(128, 128, 128, 0.5)',
    },
    series: [
      {
        type: 'gauge',
        startAngle: 210,
        endAngle: -30,
        itemStyle: {
          color: {
            colorStops: [
              {
                offset: 0,
                color: '#ACABFF',
              },
              {
                offset: 1,
                color: '#72A3FF',
              },
            ],
          },
        },
        center: ['50%', '50%'],
        progress: {
          show: true,
          roundCap: true,
          width: 12,
        },
        axisLine: {
          show: true,
          roundCap: true,
          lineStyle: {
            width: 12,
            color: [
              [0, '#E4E7ED'],
              [1, '#E4E7ED'],
            ],
          },
        },
        pointer: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        anchor: {
          show: false,
        },
        title: {
          show: false,
        },
        detail: {
          valueAnimation: true,
          offsetCenter: [0, 15],
          formatter: function (value: number) {
            return '{value|' + value.toFixed(0) + '}{unit|%}'
          },
          rich: {
            value: {
              fontSize: 36,
              fontWeight: 'bolder',
              color: '#333',
            },
            unit: {
              fontSize: 16,
              color: '#333',
              padding: [0, 0, -10, 3],
            },
          },
        },
        data: [
          {
            value: value,
          },
        ],
      },
    ],
  }
}

export default getGauge
