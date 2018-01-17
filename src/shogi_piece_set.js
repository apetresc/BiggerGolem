function set_style(style) {
  if (style == "default") {
    return;
  }

  var extension_prefix = chrome.extension.getURL();
  var divs = $("div");
  for (var i = 0; i < divs.length; i++) {
    var piece_pos = divs[i].style.backgroundImage.search(/shogi\d\d/);
    if (piece_pos >= 0) {
      var piece = divs[i].style.backgroundImage.substr(piece_pos, 7);
      divs[i].style.backgroundImage = "url(" + extension_prefix + "img/shogi/kanji/" + style + "/" + piece + ".png" + ")";
      divs[i].style.height = "48px";
    }
  }

  // Might also be a promotion box.
  if ($("body>table:nth-child(3) div").length == 43) {
    promotion_pieces = $("body>table:nth-child(3) div:eq(41)>img");
    for (var i = 0; i < promotion_pieces.length; i++) {
      var piece = promotion_pieces[i].className;
      if (piece == undefined || piece == "") {
        piece = promotion_pieces[i].src.substr(promotion_pieces[i].src.search(/shogi\d\d/), 7);
      }
      promotion_pieces[i].src = "url(" + extension_prefix + "img/shogi/kanji/" + style + "/" + piece + ".png" + ")";
    }
  }
}
