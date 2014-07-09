(function(document) {
function Graph(config) {
  // user defined properties
  this.canvas = document.getElementById(config.canvasId);
  this.minX = config.minX;
  this.maxX = config.maxX;
  this.rangeX = config.rangeX;
  this.rangeY = config.rangeY;
  this.unitsPerTick = config.unitsPerTick;

  // constants
  this.axisColor = '#aaa';
  this.font = '8pt Calibri';
  this.tickSize = 20;

  // relationships
  this.context = this.canvas.getContext('2d');

  this.unitX = this.canvas.width / this.rangeX;
  this.unitY = this.canvas.height / this.rangeY;
  this.centerY = this.canvas.height / 2.0;
  this.centerX = this.canvas.width / 2.0;
  this.iteration = this.rangeX / 1000;
  this.scaleX = this.canvas.width / this.rangeX;
  this.scaleY = this.canvas.height / this.rangeY;

  // draw x and y axis
  this.drawXAxis();
  this.drawYAxis();
}

Graph.prototype.drawXAxis = function() {
  var context = this.context;
  context.save();
  context.beginPath();
  context.moveTo(0, this.centerY);
  context.lineTo(this.canvas.width, this.centerY);
  context.strokeStyle = this.axisColor;
  context.lineWidth = 2;
  context.stroke();

  // draw tick marks
  var xPosIncrement = this.unitsPerTick * this.unitX;
  var xPos, unit;
  context.font = this.font;
  context.textAlign = 'center';
  context.textBaseline = 'top';

  // draw left tick marks
  xPos = this.centerX - xPosIncrement;
  unit = -1 * this.unitsPerTick;
  while(xPos > 0) {
    context.moveTo(xPos, this.centerY - this.tickSize / 2);
    context.lineTo(xPos, this.centerY + this.tickSize / 2);
    context.stroke();
    context.fillText(unit, xPos, this.centerY + this.tickSize / 2 + 3);
    unit -= this.unitsPerTick;
    xPos = Math.round(xPos - xPosIncrement);
  }

  // draw right tick marks
  xPos = this.centerX + xPosIncrement;
  unit = this.unitsPerTick;
  while(xPos < this.canvas.width) {
    context.moveTo(xPos, this.centerY - this.tickSize / 2);
    context.lineTo(xPos, this.centerY + this.tickSize / 2);
    context.stroke();
    context.fillText(unit, xPos, this.centerY + this.tickSize / 2 + 3);
    unit += this.unitsPerTick;
    xPos = Math.round(xPos + xPosIncrement);
  }
  context.restore();
};

Graph.prototype.drawYAxis = function() {
  var context = this.context;
  context.save();
  context.beginPath();
  context.moveTo(this.centerX, 0);
  context.lineTo(this.centerX, this.canvas.height);
  context.strokeStyle = this.axisColor;
  context.lineWidth = 2;
  context.stroke();

  // draw tick marks
  var yPosIncrement = this.unitsPerTick * this.unitY;
  var yPos, unit;
  context.font = this.font;
  context.textAlign = 'right';
  context.textBaseline = 'middle';

  // draw top tick marks
  yPos = this.centerY - yPosIncrement;
  unit = this.unitsPerTick;
  while(yPos > 0) {
    context.moveTo(this.centerX - this.tickSize / 2, yPos);
    context.lineTo(this.centerX + this.tickSize / 2, yPos);
    context.stroke();
    context.fillText(unit, this.centerX - this.tickSize / 2 - 3, yPos);
    unit += this.unitsPerTick;
    yPos = Math.round(yPos - yPosIncrement);
  }

  // draw bottom tick marks
  yPos = this.centerY + yPosIncrement;
  unit = -1 * this.unitsPerTick;
  while(yPos < this.canvas.height) {
    context.moveTo(this.centerX - this.tickSize / 2, yPos);
    context.lineTo(this.centerX + this.tickSize / 2, yPos);
    context.stroke();
    context.fillText(unit, this.centerX - this.tickSize / 2 - 3, yPos);
    unit -= this.unitsPerTick;
    yPos = Math.round(yPos + yPosIncrement);
  }
  context.restore();
};

Graph.prototype.drawEquation = function(equation, color, thickness) {
  var context = this.context;
  context.save();
  this.transformContext();

  context.beginPath();
  context.moveTo(this.minX, equation(this.minX));

  var x = this.minX + this.iteration;
  for(; x <= this.maxX; x += this.iteration) {
    context.lineTo(x, equation(x));
  }
  context.lineTo(1, 0);
  context.restore();
  context.lineJoin = 'round';
  context.lineWidth = thickness;
  context.strokeStyle = color;
  context.stroke();

  //Add a border around the line
  context.globalCompositeOperation = 'destination-over'
  context.strokeStyle = 'black';
  context.lineWidth = thickness + 2;
  context.stroke();
};

Graph.prototype.transformContext = function() {
  var context = this.context;

  // move context to center of canvas
  context.translate(this.centerX, this.centerY);

  /*
   * stretch grid to fit the canvas window, and
   * invert y scale so that that increments bottom-up
   */
  context.rotate(Math.PI * 1.5);
  context.scale(this.scaleX, -this.scaleY);
};

var eggGraph = new Graph({
  canvasId: 'eggCanvas',
  minX: -1,
  maxX: 1,
  rangeX: 4,
  rangeY: 4,
  unitsPerTick: 1
});

eggGraph.drawEquation(function(x) {
  return (Math.sqrt(1-x*x)/(1.6*Math.pow(1.4, x)));
}, 'beige', 3);
eggGraph.drawEquation(function(x) {
  return (Math.sqrt(1-x*x)/(1.6*Math.pow(1.4, x)))*-1;
}, 'beige', 3);
})(document);