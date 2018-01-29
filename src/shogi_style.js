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
