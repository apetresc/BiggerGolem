function setReversiStyle({ background, pieces, size }) {
  if (typeof chrome != "undefined") {
    var extension_prefix = chrome.extension.getURL('');
  } else {
    var extension_prefix = "https://biggergolem.s3.amazonaws.com/";
  }
  
  var lastMove = $("table[bordercolor] td[bgcolor='#FF9115']");
  var lastMoveImg = $("table[bordercolor] td[bgcolor='#FF9115'] img");
  if (background) {
    if (lastMove.length) {
      lastMove[0].style.backgroundColor = "#00EE00";
    }
    var tds = $("table[bordercolor] td[bgcolor!='#FF9115']:has(img)");
    for (var i = 0; i < tds.length; i++) {
      tds[i].style.backgroundColor = "#008800";
    }
  }

  if (pieces === 'go') {
    if (lastMove.length) {
      var lastMoveColor = lastMoveImg[0].src.match(/\/reversi\/([bw])\.gif/)[1];
      $(lastMoveImg[0]).attr("src","/iphone/images/go/35_"+lastMoveColor+"sx.png");
    }
    var imgs = $("table[bordercolor] img[src*=reversi]");
    for (var i = 0; i < imgs.length; i++) {
      var color = imgs[i].src.match(/\/reversi\/([bw])\.gif/)[1];
      $(imgs[i]).attr("src","/iphone/images/go/35_"+color+"s.png");
    }
  } else if (pieces === 'svg') {
    $('body table img').each(function(i, element) {
      const color = element.getAttribute('alt');
      if (color && color.length > 0) {
        element.src = extension_prefix + `img/reversi/${color.toLowerCase()}.svg`;
      }
    });
  }

  if (size !== '32') {
    const sizeString = `${size}px`;
    $('body table td').css({ height: sizeString, width: sizeString });
    $('body table img').css({ height: sizeString, width: sizeString });
  }
}
