function setChessStyle(pieces, size) {
  var pieceRegex = /^.*\/([wb][prnbqk])\.gif$/;
  if (typeof chrome != "undefined") {
    var extension_prefix = chrome.extension.getURL('');
  } else {
    var extension_prefix = "https://biggergolem.s3.amazonaws.com/";
  }

  if (size != '32') {
    $('body table td').css('width', size + 'px');
    $('body table td').css('height', size + 'px');
    $('body table img').css('width', size + 'px');
    $('body table img').css('height', size + 'px');
  }

  if (pieces != 'default') {
    $('body table img').each(function(i, element) {
      var piece = pieceRegex.exec(element.src);
      if (piece !== null) {
        piece = piece[1][0] + piece[1][1].toUpperCase();
        element.src = extension_prefix + 'img/chess/' + pieces + '/' + piece + '.svg';
      }
    });
  }
}
