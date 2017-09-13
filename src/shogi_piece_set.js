
function set_style(style) {
    var divs = $("div");
    for (var i = 0; i < divs.length; i++) {
        var piece_pos = divs[i].style.backgroundImage.search(/shogi\d\d/);
        if (piece_pos >= 0) {
            if (style == "blank") {
                divs[i].style.backgroundImage = "/*" + divs[i].style.backgroundImage.substr(piece_pos, 7) + "*/";
                divs[i].style.visibility = "hidden";
            } else {
                var piece = divs[i].style.backgroundImage.substr(piece_pos, 7);
                if (style != "default") {
                    divs[i].style.backgroundImage = "url(" + chrome.extension.getURL("img/shogi/kanji/" + style + "/" + piece + ".png") + ")";
                    divs[i].style.height = "48px";
                }
                divs[i].style.visibility = "visible";
            }
        }
    }

    // Might also be a promotion box.
    if ($("body>table:nth-child(3) div").length == 43) {
        promotion_pieces = $("body>table:nth-child(3) div:eq(41)>img");
        for (var i = 0; i < promotion_pieces.length; i++) {
            if (style == "blank") {
                var piece_pos = promotion_pieces[i].src.search(/shogi\d\d/);
                promotion_pieces[i].className = promotion_pieces[i].src.substr(piece_pos, 7);
                //promotion_pieces[i].removeAttribute("src");
                promotion_pieces[i].style.visibility = "hidden";
            } else {
                var piece = promotion_pieces[i].className;
                if (piece == undefined || piece == "") { piece = promotion_pieces[i].src.substr(promotion_pieces[i].src.search(/shogi\d\d/), 7); }
                if (style != "default") {
                    promotion_pieces[i].src = "url(" + chrome.extension.getURL("img/shogi/kanji/" + style + "/" + piece + ".png") + ")";
                }
                promotion_pieces[i].style.visibility = "visible";
            }
        }
    }
}
