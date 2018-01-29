// ==UserScript==
// @name         BiggerGolem
// @namespace    http://github.com/apetresc
// @version      2.4.0
// @description  Bigger Golem brings a variety of improvements to the popular turn-based board game site Little Golem
// @author       Adrian Petrescu <apetresc@gmail.com>
// @match        http*://www.littlegolem.net/*
// @run-at       document-end
// @grant        none
// @require      http://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// ==/UserScript==

// =========================== CONFIGURATION ===================================

// CHES_STYLE: Set a custom piece set for Chess and Chess960 games.
// Valid values: ["alpha", "default"]
var CHESS_STYLE = "alpha";
// CHESS_SIZE: The size, in pixels, of each square on the board.
// LittleGolem's default board is 32px.
var CHESS_SIZE = "64";

// SHOGI_STYLE: Set a custom piece set for Shogi games.
// Valid values: ["Ryoko", "Kinki", "default"]
var SHOGI_STYLE = "Ryoko";

// GO_COORDINATES: If true, draw coordinates around Go games of all board sizes
var GO_COORDINATES = true;

// REVERSI_BACKGROUND: If true, use a felt green background for all Reversi
// games
var REVERSI_BACKGROUND = false;
// REVERSI_STYLE: Set a custom piece set for Reversi games
// Valid values: ["svg", "go", "default"]
var REVERSI_STYLE = "svg";
// REVERSI_SIZE: The size, in pixels, of each square on the board.
// LittleGolem's default board size is 32px.
var REVERSI_SIZE = "64";
// =============================================================================

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
function setGoCoordinates(setCoordinates, size) {
    if (setCoordinates) {
        let num_size = parseInt(size);
        if (!isNaN(num_size)) {
            $('table[style*="wood004"] tr').prepend(function (i, txt) {
                return '<td>&nbsp;' + (num_size - i) + '</td>';
            });
            let coordinates_row = "<td></td>";
            for (i = 0; i < num_size; i++) {
                let skip_i = i >= 8 ? 1 : 0;
                coordinates_row += '<td align="center">' + String.fromCharCode(65 + i + skip_i) + '</td>';
            }
            $('table[style*="wood004"]').append('<tr>' + coordinates_row + '</tr>');
        }
    }
}
function setShogiStyle(style) {
  if (style == "default") {
    return;
  }

  if (typeof chrome != "undefined") {
    var extension_prefix = chrome.extension.getURL('');
  } else {
    var extension_prefix = "https://biggergolem.s3.amazonaws.com/";
  }
  
  $("div.col-md-12 div").each(function(i) {
      var piece_pos = this.style.backgroundImage.search(/shogi\d\d/);
      if (piece_pos >= 0) {
          var piece = this.style.backgroundImage.substr(piece_pos, 7);
          this.style.backgroundImage = "url(" + extension_prefix + "img/shogi/kanji/" + style + "/" + piece + ".png" + ")";
          this.style.height = "48px";
      }
  });

  // Might also be a promotion box.
  $('img').each(function(i) {
    var piece_pos = this.src.search(/shogi\d\d/);
    if (piece_pos >= 0) {
        var piece = this.src.substr(piece_pos, 7);
        this.src = extension_prefix + "img/shogi/kanji/" + style + "/" + piece + ".png";
    }  
  });
}
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
(function() {
    'use strict';
    
    var game_name = $('h3.page-title').text();
    
    if (game_name.indexOf('Reversi') >= 0) {
        setReversiStyle({
            background: REVERSI_BACKGROUND,
            pieces: REVERSI_STYLE,
            size: REVERSI_SIZE
        });
    } else if (game_name.indexOf('Shogi') >= 0) {
        setShogiStyle(SHOGI_STYLE);
    } else if (game_name.indexOf('Go') >= 0) {
        let size = 0;
        if (game_name.indexOf('19x19') >= 0 || game_name.indexOf('Random100') >= 0) {
            size = 19;
        } else if (game_name.indexOf('13x13') >= 0) {
            size = 13;
        } else if (game_name.indexOf('9x9') >= 0) {
            size = 9;
        }
        if (size > 0) {
            setGoCoordinates(GO_COORDINATES, size);
        }
    } else if (game_name.indexOf('Chess') >= 0) {
        setChessStyle(CHESS_STYLE, CHESS_SIZE);
    } else if (game_name.indexOf('Hex') >= 0) {
        fixBrokenHexBoard();
    }
})();