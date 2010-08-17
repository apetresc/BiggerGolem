alert("Hello world!");

var game_name = $("table:eq(5)>tbody>tr>td>font>b").text();

if (game_name.match("Shogi-Shogi") == null) {
    alert("Not shogi");
} else {
    var divs = $("div");
    for (var i = 0; i < divs.length; i++) {
        var piece_pos = divs[i].style.backgroundImage.search(/shogi\d\d\.png/);
        if (piece_pos >= 0) {
            var piece = divs[i].style.backgroundImage.substr(piece_pos, 7);
            divs[i].style.backgroundImage = "url(" + chrome.extension.getURL("img/shogi/kanji/" + piece + ".png") + ")";
        }
    }
}
