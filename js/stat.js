'use strict';

window.renderStatistics = function (ctx, names, times) {
  var cloudX = 100;
  var cloudY = 10;
  var cloudWidth = 420;
  var cloudHeight = 270;
  var cloudColor = 'rgba(255, 255, 255, 1)';
  var cloudShadowIndent = 10;
  var cloudShadowColor = 'rgba(0, 0, 0, 0.7)';
  var textColor = 'rgba(0, 0, 0, 1)';
  var textFont = '16px PT Mono';
  var textX = 120;
  var textY = 40;
  var textIndent = 20;
  var barWidth = 40;
  var barSpace = 50;
  var barColorPlayer = 'rgba(255, 0, 0, 1)';

  ctx.fillStyle = cloudShadowColor;
  ctx.strokeRect(cloudX + cloudShadowIndent, cloudY + cloudShadowIndent, cloudWidth, cloudHeight);
  ctx.fillRect(cloudX + cloudShadowIndent, cloudY + cloudShadowIndent, cloudWidth, cloudHeight);

  ctx.fillStyle = cloudColor;
  ctx.strokeRect(cloudX, cloudY, cloudWidth, cloudHeight);
  ctx.fillRect(cloudX, cloudY, cloudWidth, cloudHeight);

  ctx.fillStyle = textColor;
  ctx.font = textFont;
  ctx.fillText('Ура вы победили!', textX, textY);
  ctx.fillText('Список результатов:', textX, textY + textIndent);

  var max = -1;

  for (var i = 0; i < times.length; i++) {
    var time = times[i];
    if (time > max) {
      max = time;
    }
  }

  var graphHeight = 150;
  var step = graphHeight / (max - 0);

  for (var j = 0; j < times.length; j++) {
    if (names[j] === 'Вы') {
      ctx.fillStyle = barColorPlayer;
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + Math.random() + ')';
    }
    ctx.fillRect(textX + (barWidth + barSpace) * j, 240 - times[j] * step, barWidth, times[j] * step);
    ctx.fillStyle = textColor;
    ctx.fillText(names[j], textX + (barWidth + barSpace) * j, 260);
  }
}
