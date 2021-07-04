window.onload = function() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var anim, onState = false,
    counter = 0;
  var cog_radius = 50;
  var cog_t_x = 30,
    cog_t_y = 40,
    cog_t_offset = 20.5,
    cog_l_x = 75,
    cog_l_y = 100,
    cog_l_offset = 24.25,
    cog_r_x = 533,
    cog_r_offset = 11.25;  
  var chain = {
    offset: 0,
    paint: function() {
      ctx.beginPath();
      ctx.moveTo(75, 50);
      ctx.lineTo(533, 50);
      ctx.arc(533, 100, 50, (Math.PI * 1.5), (Math.PI * 0.5), false);
      ctx.lineTo(75, 150);
      ctx.arc(75, 100, 50, (Math.PI * 0.5), (Math.PI * 1.5), false);
      ctx.lineWidth = 5;
      ctx.fillStyle = 'transparent';
      ctx.setLineDash([12, 14.16]);
      ctx.lineDashOffset = this.offset;
      ctx.fill();
      ctx.stroke();
    }
  };
  var cog = {
    paint: function(x, y, r, offset) {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.lineWidth = 5;
      ctx.setLineDash([12, 14.16]);
      ctx.lineDashOffset = offset;
      ctx.strokeStyle = 'tan';
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x, y, (r - 2), 0, Math.PI * 2, true);
      ctx.arc(x, y, (r / 2.5), 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fillStyle = 'tan';
      ctx.fill('evenodd');
    }
  };
  var swChain = {
    offColor: 'crimson',
    onColor: 'darkseagreen',
    paint: function(type) {
      ctx.beginPath();
      ctx.moveTo(75, 100);
      ctx.lineTo(75, 225);
      ctx.closePath();
      ctx.setLineDash([8, 8]);
      ctx.stroke();
      ctx.arc(75, 100, 5, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.arc(75, 235, 8, 0, Math.PI * 1, false);
      ctx.bezierCurveTo(67, 228, 75, 227, 75, 220);
      ctx.bezierCurveTo(75, 227, 83, 228, 83, 235);
      ctx.closePath();
      ctx.fillStyle = (type) ? this.onColor : this.offColor;
      ctx.fill();
    }
  };

  var spark = {
    x: 75,
    y: 100,
    paint: function() {
      ctx.beginPath();
      var lineargradient = ctx.createRadialGradient(59, 134, 0, 59, 134, 19);
      lineargradient.addColorStop(0, 'yellow');
      lineargradient.addColorStop(1, 'crimson');
      ctx.fillStyle = lineargradient;
      ctx.strokeStyle = 'indianred';
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x - 35, this.y + 35);
      ctx.lineTo(this.x - 20, this.y + 30);
      ctx.lineTo(this.x - 30, this.y + 45);
      ctx.lineTo(this.x - 15, this.y + 40);
      ctx.lineTo(this.x - 30, this.y + 65);
      ctx.lineTo(this.x + 5, this.y + 30);
      ctx.lineTo(this.x - 10, this.y + 35);
      ctx.lineTo(this.x, this.y + 20);
      ctx.lineTo(this.x - 15, this.y + 25);
      ctx.lineTo(this.x, this.y);
      ctx.stroke();
      ctx.fill();
    }
  };

  /*  var box = {
      x: 75,
      y: 40,
      offset: 0,
      paint: function(x, y) {
        ctx.strokeStyle = 'khaki';
        ctx.lineWidth = 15;
        ctx.setLineDash([15, 100]);
        ctx.lineDashOffset = this.offset;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.moveTo(70, 37.5);
        ctx.lineTo(540, 37.5);
        ctx.arc(540, 92.5, 55, (Math.PI * 1.5), (Math.PI * 0), false);
        ctx.lineTo(595, 240);
        ctx.stroke();
      }
    };*/

  function paint(type) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    chain.offset -= (6.54 / 10);
    cog_l_offset += (6.54 / 10);
    cog_r_offset += (6.54 / 10);
    cog_t_offset -= (6.54 / 10);
    /*box.offset -= (6.54 / 10);*/
    ctx.save();
    cog.paint(cog_t_x, cog_t_y, (cog_radius / 2), cog_t_offset);
    ctx.restore();
    ctx.save();
    chain.paint();
    ctx.restore();
    ctx.save();
    cog.paint(cog_l_x, cog_l_y, cog_radius, cog_l_offset);
    ctx.restore();
    ctx.save();
    cog.paint(cog_r_x, cog_l_y, cog_radius, cog_r_offset);
    ctx.restore();
    /*ctx.save();
    box.paint(box.x, box.y);
    ctx.restore();*/
    ctx.save();
    swChain.paint(type);
    ctx.restore();
    if (type && counter < 30) {
      ctx.save();
      spark.paint();
      ctx.restore();
      counter++;
    }
    if (type) {
      anim = window.requestAnimationFrame(function() {
        paint(type);
      })
    }
  }
  paint(onState);

  canvas.addEventListener('click', function(e) {
    ctx.beginPath();
    ctx.arc(75, 235, 8, 0, Math.PI * 1, false);
    ctx.bezierCurveTo(67, 228, 75, 227, 75, 220);
    ctx.bezierCurveTo(75, 227, 83, 228, 83, 235);
    coords = canvas.relMouseCoords(event);
    canvasX = coords.x;
    canvasY = coords.y;

    if (ctx.isPointInPath(canvasX, canvasY)) {
      onState = !onState;
      if (!onState) {
        window.cancelAnimationFrame(anim);
        counter = 0;
      }
      paint(onState);
    }
  });
  canvas.addEventListener('mousemove', function(e) {
    ctx.beginPath();
    ctx.arc(75, 235, 8, 0, Math.PI * 1, false);
    ctx.bezierCurveTo(67, 228, 75, 227, 75, 220);
    ctx.bezierCurveTo(75, 227, 83, 228, 83, 235);
    coords = canvas.relMouseCoords(event);
    canvasX = coords.x;
    canvasY = coords.y;

    if (ctx.isPointInPath(canvasX, canvasY))
      canvas.style.cursor = 'pointer';
    else
      canvas.style.cursor = 'default';
  });

  /* Taken from a Stackoverflow answer */
  function relMouseCoords(event) {
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;

    do {
      totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
      totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    }
    while (currentElement = currentElement.offsetParent)

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    return {
      x: canvasX,
      y: canvasY
    }
  }
  HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;
}