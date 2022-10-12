import React, {useEffect} from 'react'
import chinaJson from './china.json'
import * as d3 from 'd3'

console.log('jsonMap', chinaJson)

const macao = [
  [113.5986, 22.1649],
  [113.6096, 22.1265],
  [113.5547, 22.11],
  [113.5437, 22.2034],
  [113.5767, 22.2034],
  [113.5986, 22.1649],
]

const taiWan =
  'M617.3750269836867,487.0168171615774L618.4593086008574,487.6144535113727L616.2907453665157,491.1998795807872L617.3750269836867,493.58593679960467L614.122182132174,500.7228193982444L610.8705708206128,513.1441937312184L606.5334443519293,519.027930852189L604.3648811175872,527.2355077742518L603.2805995004164,528.9889294116085L602.1963178832459,523.7224126071362L596.7761433373425,520.2026718395183L594.6075801030008,513.7328914858731L595.6918617201718,505.4653448142135L606.5334443519293,487.0168171615774L613.0379005150032,483.4223928910394Z'

const t = [120.0254, 23.5986]
const taiWanP = [
  [121.9043, 25.0488],
  [121.9922, 25.0049],
  [121.8164, 24.7412],
  [121.9043, 24.5654],
  [121.6406, 24.0381],
  [121.377, 23.1152],
  [121.0254, 22.6758],
  [120.8496, 22.0605],
  [120.7617, 21.9287],
  [120.6738, 22.3242],
  [120.2344, 22.5879],
  [120.0586, 23.0713],
  [120.1465, 23.6865],
  [121.0254, 25.0488],
  [121.5527, 25.3125],
  [121.9043, 25.0488],
]

const x = 3.1422861722412967
const y = 5.236371593119826

const initMapScale = (root, projection, path) => {
  projection.scale(1).translate([0, 0]).precision(0)
  const mapDom = document.querySelector('#map')
  const width = mapDom.clientWidth
  const height = mapDom.clientHeight
  const bounds = path.bounds(root)
  const scale = 0.95 / Math.max((bounds[1][0] - bounds[0][0]) / width, (bounds[1][1] - bounds[0][1]) / height)
  const t = [(width - scale * (bounds[1][0] + bounds[0][0])) / 2, (height - scale * (bounds[1][1] + bounds[0][1])) / 2]
  projection.scale(scale).translate(t)
}

const renderMap = (root, projection, path) => {
  const mapDom = document.querySelector('#map')
  const width = mapDom.clientWidth
  const height = mapDom.clientHeight

  const map = d3
    .select('#map')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .style('transform', 'translate(0,0)')
    .style('opacity', 0)

  map.transition().duration(400).style('opacity', 1)
  map
    .selectAll('path')
    .data(root.features)
    .enter()
    .append('path')
    .attr('class', 'region')
    .attr('stroke', '#fff')
    .attr('stroke-width', 1)
    .attr('fill', function () {
      return '#5AB963'
    })
    .attr('d', path)
}

const ChinaMap: React.FC = () => {
  useEffect(() => {
    const projection = d3.geoMercator()
    const path = d3.geoPath(projection)
    console.log(path)
    initMapScale(chinaJson, projection, path)
    renderMap(chinaJson, projection, path)
  }, [])

  return (
    <div>
      <h1>China Map</h1>
      <div id="map" style={{width: '400px', height: '400px'}}></div>
      {/*<svg width={800} height={600} version={'1.1'} xmlns="http://www.w3.org/2000/svg"></svg>*/}
    </div>
  )
}

export default ChinaMap
