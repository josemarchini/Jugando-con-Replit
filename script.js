// ID Function
function id(x) {
  return document.getElementById(x);
};

// Graph Positions
function y(x) {
  let v = id('eq').value;
  try {
    var str = `return ${v.replaceAll('x', x)};`;
    var f = new Function(str);
    var eq = f();
    id('m').innerHTML = '';
    
  } catch (e) {
    id('m').innerHTML = '!';
  };

  return cy(eq);
};

// Context
const canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// HD Canvas
canvas.width = 1600;
canvas.height = 1000;

// Coordinate transfer
function cx(x) {
  return x*20 +800;
};
function cy(y) {
  return y*-20 +500;
};

// Point thingy
let pointSize = 3;
let psHalf = pointSize/2;
function point(x,y){
  ctx.fillStyle = 'red';
  ctx.fillRect(x-psHalf, y-psHalf, pointSize, pointSize);
};

// Imagine rendering hah
var oldEquation = '';
var oldDetail = 0;
var oldRange = 0;

// Render
function render() {
if (oldEquation != id('eq').value
   ||
   oldDetail != id('detail').value
   ||
   oldRange != id('range').value
   ||
   oldDotMode != id('dot').checked) {

// Update the old stuff
oldEquation = id('eq').value;
oldDetail = id('detail').value;
oldRange = id('range').value;
oldDotMode = id('dot').checked;
  
ctx.fillStyle = 'rgb(20,20,20)'
ctx.fillRect(0, 0, canvas.width, canvas.height);
// Y Axis
ctx.lineWidth = 8;
ctx.strokeStyle = 'rgb(120,120,120)';

ctx.beginPath();
ctx.moveTo(800, 0);
ctx.lineTo(800, 1000);
ctx.closePath();
ctx.stroke();

// X Axis
ctx.beginPath();
ctx.moveTo(0, 500);
ctx.lineTo(1600, 500);
ctx.closePath();
ctx.stroke();

// X Grid
ctx.lineWidth = 1;
for (let x = 0; x < 8; x++) {
  ctx.beginPath();
  ctx.moveTo(800+ x*100, 0);
  ctx.lineTo(800+ x*100, 1000);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(800- x*100, 0);
  ctx.lineTo(800- x*100, 1000);
  ctx.closePath();
  ctx.stroke();
};

// Y Grid
for (let y = 0; y < 5; y++) {
  ctx.beginPath();
  ctx.moveTo(0, 500+ y*100);
  ctx.lineTo(1600, 500+ y*100);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, 500- y*100);
  ctx.lineTo(1600, 500- y*100);
  ctx.closePath();
  ctx.stroke();
};

// Graphing
ctx.lineWidth = 2;
ctx.strokeStyle = 'rgb(255,0,0)';

let start = id('range').value;

if (!id('dot').checked) {
  ctx.beginPath();
  ctx.moveTo(cx(-start), y(-start));
};

for (let n = -start; n < start; n += (1/id('detail').value)) {
  if (!id('dot').checked) {
    ctx.lineTo(cx(n), y(n));
  } else {
    point(cx(n), y(n));
  };
};
if (!id('dot').checked) ctx.stroke();

};};

setInterval(render, 500);
render();

////////////
////////////

const coolStuff = [
  'Math.sin(x)*2 + (x-15)**2/50 - 10',
  '(x*x) / -50 + Math.sin(x/2) + 15',
  'Math.sin(x/3)*4 + Math.cos(x*9)',
  'Math.floor(x/2) + Math.sin(x/4)',
  'Math.tan(x)*2 + Math.sin(x*7)',
];

for (let i = 0; i < coolStuff.length; i++) {
  id('list').innerHTML += `<button onclick="document.getElementById('eq').value = '${coolStuff[i]}'">Try</button>y = ${coolStuff[i]} <br>`;
};