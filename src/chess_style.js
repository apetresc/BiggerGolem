var pieceRegex = /^.*\/([wb][prnbqk])\.gif$/;

function chess_blank() {
  $('body table').css('visibility', 'hidden');
  $('body table img').each(function(i, element) {
    var piece = pieceRegex.exec(element.src);
    if (piece) {
      $(element).attr('data-piece', piece[1][0] + piece[1][1].toUpperCase());
      element.src = '';
    }
  });
  $('body table img').attr('img', '');
}

function chess_style(pieces, size) {
  if (size != '32') {
    $('body table td').css('width', size + 'px')
    $('body table td').css('height', size + 'px')
    $('body table img').css('width', size + 'px')
    $('body table img').css('height', size + 'px')
  }

  $('body table img').each(function(i, element) {
    var piece = $(element).attr('data-piece');
    if (typeof piece !== typeof undefined && piece !== false) {
      if (pieces == 'default') {
        element.src = '/ng/images/source/chess/' + piece.toLowerCase() + '.gif';
      } else {
        element.src = chrome.extension.getURL('img/chess/' + pieces + '/' + piece + '.svg');
      }
    }
  });

  $('body table').css('visibility', 'visible');
}
