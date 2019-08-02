import {select} from 'd3-selection';
import {geoMercator, geoPath} from 'd3-geo';
import {scaleLinear} from 'd3-scale';
import {hsl} from 'd3-color';
import geoData from '../../Data/precinct_data_min.json';
const annotations = require('../../Data/annotations.json');

// Globals
const precinctIds = [1, 5, 6, 7, 9, 10, 13, 14, 17, 18, 19, 20, 22, 23, 24, 25,
  26, 28, 30, 32, 33, 34, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 52, 60, 61,
  62, 63, 66, 67, 68, 69, 70, 71, 72, 73, 75, 76, 77, 78, 79, 81, 83, 84, 88,
  90, 94, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113,
  114, 115, 120, 122, 123
];

// Width and Height of visualization
const width = 600;
const height = 600;

const bodySelection = select('#svg_container');

bodySelection.append('svg')
  .attr('width', width)
  .attr('height', height);

const myProjection = geoMercator()
  .center([-73.94, 40.70])
  .scale(52000)
  .translate([width / 2, height / 2]);

const path = geoPath()
  .projection(myProjection);

const g = select('svg');

const mapScale = scaleLinear()
  .domain([66, 6857])
  .range([0.98, 0.009]);

// Writes annotation for the current year to the text box
function writeAnnotations(year) {
  const currAnnotation = annotations[year];
  document.getElementById('annotation').innerHTML = currAnnotation;
}

// Shows the selected precinct and the number of crimes committed in current year
function showPrecinct(x, year) {
  document.getElementById('pre').innerHTML = `Precinct: ${x.properties.Precinct}`;
  document.getElementById('crimes').innerHTML = `Number of M7 violations: ${x.properties.CrimeData[year]}`;
}

// Resects the precinct text to the instructions
function resetPrecinct() {
  document.getElementById('pre').innerHTML = 'Click to see precinct';
  document.getElementById('crimes').innerHTML = '--';
}

// Draws the paths of the visualization and the fills for 2000
function drawVis() {
  g.append('g')
    .selectAll('.precinct')
    .data(geoData.features)
    .enter().append('path')
    .attr('d', path)
    .attr('id', x => `p${x.properties.Precinct}`)
    .on('mousedown', x => showPrecinct(x, 2000))
    .on('mouseout', x => resetPrecinct())
    .style('fill', x => hsl(0, 0.5, mapScale(x.properties.CrimeData[2000])));
}

// Sets up the legend and draws vis and writes annotations for 2000
function setUp() {

  const defs = g.append('defs');

  const linearGradient = defs.append('linearGradient')
      .attr('id', 'linear-gradient');

  linearGradient
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%');

  linearGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#fff');

  linearGradient.append('stop')
    .attr('offset', '50%')
    .attr('stop-color', '#bf4040');

  linearGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#000');

  g.append('rect')
      .attr('x', 50)
      .attr('y', 565)
      .attr('width', 500)
      .attr('height', 20)
      .attr('stroke', 'black')
      .attr('stroke-width', '1')
      .style('fill', 'url(#linear-gradient)');

  function addLegendText(x, y, text) {
    g.append('text')
      .attr('x', x)
      .attr('y', y)
      .attr('class', 'annotation_text')
      .text(text);
  }

  addLegendText(235, 562, 'Number of M7 Crimes');
  addLegendText(49, 598, '0');
  addLegendText(280, 598, '3500');
  addLegendText(520, 598, '7000');

  drawVis();
  writeAnnotations(2000);
}

setUp();

// Redraws fills without redrawing the paths -- big efficiency boost
function drawFills(year) {
  precinctIds.forEach(function changeFill(p) {
    select(`#p${p}`)
      .on('mousedown', x => showPrecinct(x, year))
      .on('mouseout', x => resetPrecinct())
      .style('fill', hsl(0, 0.5, mapScale(
        geoData.features[precinctIds.indexOf(p)].properties.CrimeData[year])));
  });
}

// Redraws the Vis-fills and changes annotations when slider is moved
document.getElementById('slider').oninput = function handleSlider() {
  const year = document.getElementById('slider').value;
  document.getElementById('year').innerHTML = year;
  drawFills(year);
  writeAnnotations(year);
};
