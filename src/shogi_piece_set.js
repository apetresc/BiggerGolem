var game_name = $("body>table:nth-child(3)>tbody>tr>td>font>b").text();
var style = "Ryoko";

if (game_name.indexOf("Shogi") >= 0) {
    var divs = $("div");
    for (var i = 0; i < divs.length; i++) {
        var piece_pos = divs[i].style.backgroundImage.search(/shogi\d\d\.png/);
        if (piece_pos >= 0) {
            var piece = divs[i].style.backgroundImage.substr(piece_pos, 7);
            divs[i].style.backgroundImage = "url(" + chrome.extension.getURL("img/shogi/kanji/" + style + "/" + piece + ".png") + ")";
        }
    }
}
