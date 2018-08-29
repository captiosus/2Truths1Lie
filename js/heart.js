var canvas = document.getElementById('video-background');
var ctx = canvas.getContext("2d");
var beat = false;
var beatInterval;
var pulseTriangles = [
  {'start': 15, 'width': 10, 'height': 20},
  {'start': 30, 'width': 5, 'height': -10},
  {'start': 50, 'width': 10, 'height': 80},
  {'start': 60, 'width': 10, 'height': -65},
  {'start': 90, 'width': 10, 'height': 70},
  {'start': 100, 'width': 10, 'height': -50}
]

function drawGrid() {
  gridWidth = 20;
  ctx.beginPath();
  for (var x = gridWidth; x < canvas.width; x += gridWidth) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
  }

  for (var y = gridWidth; y < canvas.height; y += gridWidth) {
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
  }

  ctx.strokeStyle = 'gray';
  ctx.stroke();
  ctx.closePath();
}

function setupGrid() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function drawHeart(scale) {
  ctx.beginPath();
  ctx.translate((canvas.width / 2) - (75 * scale), (canvas.height / 2) - (120 * scale));
  ctx.scale(scale, scale);
  ctx.moveTo(75, 40);
  ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
  ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
  ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
  ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
  ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
  ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.closePath();
}

function drawTriangle(startX, startY, direction, width, height, length) {
  var slope = height / width / 2;
  var line1 = Math.min(length, width / 2);
  ctx.lineTo(startX + line1 * direction, startY - (slope * line1));
  if (line1 != width / 2) {
    return startY - slope * line1;
  }
  var line2 = Math.min(length, width);
  ctx.lineTo(startX + line2 * direction, startY - (slope * (width - line2)));
  if (line2 != width) {
    return startY - slope * (width - line2);
  }
  return startY;
}

function drawEkg(startX, startY, direction, length) {
  var endY = startY;
  ctx.beginPath();
  ctx.translate((canvas.width / 2) - 75, (canvas.height / 2) - 100);
  ctx.moveTo(startX, startY);
  ctx.lineTo(startX + Math.min(length, 15) * direction, startY);
  for (var index = 0; index < pulseTriangles.length; index++) {
    var start = pulseTriangles[index].start;
    var width = pulseTriangles[index].width;
    var height = pulseTriangles[index].height;
    var end = length;
    if (index + 1 != pulseTriangles.length) {
      end = Math.min(length, pulseTriangles[index + 1].start);
    }
    if (!end) {
      break;
    }
    if (length > start) {
      ctx.lineTo(startX + start * direction, startY);
      endY = drawTriangle(startX + start * direction, startY, direction, width, height, length - start);
      if (endY != startY) {
        break;
      }
    }
    ctx.lineTo(startX + end * direction, startY);
  }
  ctx.strokeStyle = 'green';
  ctx.stroke();
  ctx.closePath();
  ctx.beginPath();
  ctx.arc(startX + length * direction, endY, 1.5, 0, 2 * Math.PI, false);
  ctx.fillStyle = 'green';
  ctx.fill();
  ctx.closePath();
}

function heartBeat(bpm) {
  clearInterval(beatInterval);
  var startScale = 1;
  var endScale = 1.04;
  var startEkg = 0;
  var endEkg = 130;
  beatInterval = setInterval(function() {
    if (beat) {
      startScale = 1.04;
      endScale = 1;
    }
    var beatScale = beatRate / 10;
    var scaleInterval = (endScale - startScale) / beatScale;
    var ekgScale = (endEkg - startEkg) / beatScale;
    var pulseCount = 0;
    var pulse = setInterval(function() {
      if (pulseCount == beatScale) {
        clearInterval(pulse);
        return;
      }
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawHeart(startScale + scaleInterval * pulseCount);
      pulseCount++;
    }, 10);
    beat = !beat;
  }, beatRate);
}

window.onload = function() {
  setupGrid();
  ctx.save();
  drawHeart(1);
  ctx.restore();
  ctx.save();
  drawEkg(130, 40, 1, 100);
  ctx.restore();
  drawEkg(20, 40, -1, 100);
}

window.onresize = function() {
  setupGrid();
  drawHeart(1);
}

// heartBeat(1000);
