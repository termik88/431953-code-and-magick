'use strict';

window.renderStatistics = function (ctx, names, times) {
  var text = {
    COLOR: 'rgba(0, 0, 0, 1)',
    FONT: '16px PT Mono',
    X: 120,
    Y: 40,
    INDENT: 20
  };

  var cloud = {
    X: 100,
    Y: 10,
    WIDTH: 420,
    HEIGHT: 270,
    COLOR: 'rgba(255, 255, 255, 1)',
    SHADOW: {
      INDENT: 10,
      COLOR: 'rgba(0, 0, 0, 0.7)'
    }
  };

  var bar = {
    WIDTH: 40,
    SPACE: 50,
    COLOR_PLAYER: 'rgba(255, 0, 0, 1)'
  };

  var drawCloud = function () {
    var drawBodyCloud = function (color, x, y, width, height) {
      ctx.fillStyle = color;
      ctx.strokeRect(x, y, width, height);
      ctx.fillRect(x, y, width, height);
    };

    var drawTextCloud = function (color, font, string, x, y) {
      ctx.fillStyle = color;
      ctx.font = font;
      ctx.fillText(string, x, y);
    };

    drawBodyCloud(cloud.SHADOW.COLOR, cloud.X + cloud.SHADOW.INDENT, cloud.Y + cloud.SHADOW.INDENT, cloud.WIDTH, cloud.HEIGHT);
    drawBodyCloud(cloud.COLOR, cloud.X, cloud.Y, cloud.WIDTH, cloud.HEIGHT);

    drawTextCloud(text.COLOR, text.FONT, 'Ура вы победили!', text.X, text.Y);
    drawTextCloud(text.COLOR, text.FONT, 'Список результатов:', text.X, text.Y + text.INDENT);
  };

  var drawGraph = function () {
    var searchMaxValue = function () {
      var max = -1;

      for (var i = 0; i < times.length; i++) {
        var time = times[i];
        if (time > max) {
          max = time;
        }
      }
      return (max);
    };

    var selectionColor = function (name) {
      if (name === 'Вы') {
        ctx.fillStyle = bar.COLOR_PLAYER;
      } else {
        ctx.fillStyle = 'rgba(0, 0, 255, ' + Math.random() + ')';
      }
    };

    var drawBar = function (time, name) {
      ctx.fillRect(text.X + (bar.WIDTH + bar.SPACE) * j, 240 - time * step, bar.WIDTH, time * step);
      ctx.fillStyle = text.COLOR;
      ctx.fillText(name, text.X + (bar.WIDTH + bar.SPACE) * j, 260);
    };

    var graphHeight = 150;
    var step = graphHeight / (searchMaxValue() - 0);

    for (var j = 0; j < times.length; j++) {
      selectionColor(names[j]);
      drawBar(times[j], names[j]);
    }
  };

  drawCloud();
  drawGraph();
};
