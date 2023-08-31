export const option1 = {
  title: {
    show: false,
    text: 'ECharts 入门示例',
  },
  tooltip: {},
  legend: {
    show: false,
    data: ['销量'],
  },
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
  },
  yAxis: {
    axisLine: {
      show: false,
      // lineStyle: {
      //   width: 1,
      //   color: '#f00',
      //   type: 'dashed',
      // },
    },
    splitLine: {
      show: true,
      lineStyle: {
        width: 1,
        type: 'dashed',
        color: ['#aaa', '#aaa'],
      },
    },
  },
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20],
    },
  ],
}
