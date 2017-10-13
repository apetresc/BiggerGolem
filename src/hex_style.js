function fixBrokenHexBoard() {
  var emptyLinks = $('svg a:empty');

  if (emptyLinks.length == 0) {
    return;
  }

  var lines = $('svg line[style*="stroke-width:.5"]');
  var size = lines.length / 4;

  var minX = 999999, minY = 999999, maxX = 0, maxY = 0;
  var coordBase = 'a'.charCodeAt(0);
  var currentPage = window.location.href;

  lines.each(function() {
    minX = Math.min(minX, this.x1.baseVal.value, this.x2.baseVal.value);
    maxX = Math.max(maxX, this.x1.baseVal.value, this.x2.baseVal.value);
    minY = Math.min(minY, this.y1.baseVal.value, this.y2.baseVal.value);
    maxY = Math.max(maxY, this.y1.baseVal.value, this.y2.baseVal.value);
  });

  var midX = (minX + maxX) / 2;
  var midY = (minY + maxY) / 2;

  $('svg a:empty').each(function() {
    let coords = this.href.baseVal.substr(-2);
    let x = coords.charCodeAt(0) - coordBase, y = coords.charCodeAt(1) - coordBase;

    targetX = minX + y * (midX - minX) / (size - 1) + x * (midX - minX) / (size - 1);
    targetY = midY + y * (maxY - midY) / (size - 1) - x * (maxY - midY) / (size - 1);

    let tx = String.fromCharCode(coordBase + x), ty = String.fromCharCode(coordBase + y);

    $('svg').append('<a href="' + currentPage + "&move=" + tx + ty + '"><circle cx="' + targetX + '" cy="' + targetY + '" r="' + (0.5 * (midX - minX) / (size - 1)) + '" fill="none" style="pointer-events: fill"/></a>');
  });

  $('svg a:empty').remove();

  $('svg').html($('svg').html());
}
