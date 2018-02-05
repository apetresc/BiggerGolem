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
  $('.caption:contains(Move List) + .actions a').attr("download", "test.pgn").attr('href', 'data:application/x-chess-pgn;base64,W0V2ZW50ICJGL1MgUmV0dXJuIE1hdGNoIl0NCltTaXRlICJCZWxncmFkZSwgU2VyYmlhIEpVRyJdDQpbRGF0ZSAiMTk5Mi4xMS4wNCJdDQpbUm91bmQgIjI5Il0NCltXaGl0ZSAiRmlzY2hlciwgUm9iZXJ0IEouIl0NCltCbGFjayAiU3Bhc3NreSwgQm9yaXMgVi4iXQ0KW1Jlc3VsdCAiMS8yLTEvMiJdDQoNCjEuIGU0IGU1IDIuIE5mMyBOYzYgMy4gQmI1IGE2IHtUaGlzIG9wZW5pbmcgaXMgY2FsbGVkIHRoZSBSdXkgTG9wZXoufQ0KNC4gQmE0IE5mNiA1LiBPLU8gQmU3IDYuIFJlMSBiNSA3LiBCYjMgZDYgOC4gYzMgTy1PIDkuIGgzIE5iOCAxMC4gZDQgTmJkNw0KMTEuIGM0IGM2IDEyLiBjeGI1IGF4YjUgMTMuIE5jMyBCYjcgMTQuIEJnNSBiNCAxNS4gTmIxIGg2IDE2LiBCaDQgYzUgMTcuIGR4ZTUNCk54ZTQgMTguIEJ4ZTcgUXhlNyAxOS4gZXhkNiBRZjYgMjAuIE5iZDIgTnhkNiAyMS4gTmM0IE54YzQgMjIuIEJ4YzQgTmI2DQoyMy4gTmU1IFJhZTggMjQuIEJ4ZjcrIFJ4ZjcgMjUuIE54ZjcgUnhlMSsgMjYuIFF4ZTEgS3hmNyAyNy4gUWUzIFFnNSAyOC4gUXhnNQ0KaHhnNSAyOS4gYjMgS2U2IDMwLiBhMyBLZDYgMzEuIGF4YjQgY3hiNCAzMi4gUmE1IE5kNSAzMy4gZjMgQmM4IDM0LiBLZjIgQmY1DQozNS4gUmE3IGc2IDM2LiBSYTYrIEtjNSAzNy4gS2UxIE5mNCAzOC4gZzMgTnhoMyAzOS4gS2QyIEtiNSA0MC4gUmQ2IEtjNSA0MS4gUmE2DQpOZjIgNDIuIGc0IEJkMyA0My4gUmU2IDEvMi0xLzI=')
}
