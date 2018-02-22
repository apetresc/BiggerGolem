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

function fixShogiPgn() {
  function convertToPsn(moves) {
    function convertCoords(lgCoords) {
      return String.fromCharCode(106 - parseInt(lgCoords[0])) + (106 - lgCoords.charCodeAt(1));
    }

    var players = $('.portlet.box.yellow .portlet-body .col-xs-6.col-md-6 a')

    var psn = ""
    psn += "[Event \"Little Golem Game\"]\n";
    psn += "[Site \"littlegolem.net\"]\n";
    psn += "[Date \"2018.02.05\"]\n";
    // I am fully aware that technically the colors are flipped here. However,
    // xboard interprets "white" as the first player and "black" as the second
    // player, even in shogi, so this is the best way to match that.
    psn += "[White \"" + players[0].text.replace(" ★", "") + "\"]\n";
    psn += "[Black \"" + players[1].text.replace(" ★", "") + "\"]\n";
    psn += "[Result \"*\"]\n";
    psn += "[Variant \"shogi\"]\n";
    psn += "\n";

    var num_moves = moves.length;
    var move_num = 1;
    var move_len = 1;
    var promoted_pieces = new Set([]);
    for (var i = 0; i < num_moves; i++) {
      var promoted_move = false;
      if (i % 2 == 0) {
        psn += move_num + '. ';
        move_num++;
      } else {
        move_len = ('' + (i + 1)).length;
      }

      if (moves[i].indexOf('-') > 0) {
        if (promoted_pieces.has(moves[i].substring(move_len + 5, move_len + 7))) {
          promoted_pieces.delete(moves[i].substring(move_len + 5, move_len + 7));
        }
        if (promoted_pieces.has(moves[i].substring(move_len + 2, move_len + 4))) {
          promoted_move = true;
          promoted_pieces.delete(moves[i].substring(move_len + 2, move_len + 4));
          promoted_pieces.add(moves[i].substring(move_len + 5, move_len + 7));
        }

        psn += (promoted_move ? '+' : '') + moves[i][move_len + 1] + convertCoords(moves[i].substring(move_len + 2, move_len + 4)) + convertCoords(moves[i].substring(move_len + 5, move_len + 7)) + moves[i].substring(move_len + 7) + ' ';
      } else {
        psn += moves[i][move_len + 1] + '@' + convertCoords(moves[i].substring(move_len + 2, move_len + 4)) + moves[i].substring(move_len + 4) + ' ';
      }
      if (moves[i].endsWith("+")) {
        promoted_pieces.add(moves[i].substring(move_len + 5, move_len + 7));
      }
      promoted_move = false;
    }

    // console.log(psn);
    return btoa(psn);
  }

  $('.caption:contains(Move List) + .actions a')
      .attr("download", "game" + new URLSearchParams(window.location.search).get("gid") + ".pgn")
      .attr('href', 'data:application/x-shogi-pgn;base64,' + convertToPsn($('.caption:contains(Move List)').parents('.portlet').find('.portlet-body a,span').map(function(x) { return $(this).text(); }).get()));
}
