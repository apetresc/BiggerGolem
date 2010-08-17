var game_name = $("body>table:nth-child(3)>tbody>tr>td>font>b").text();
var style = "blank";
var wait_for_response = true;

function set_style(style) {
    if (game_name.indexOf("Shogi") >= 0) {
        if (style != "default") {
            var divs = $("div");
            for (var i = 0; i < divs.length; i++) {
                var piece_pos = divs[i].style.backgroundImage.search(/shogi\d\d\.png/);
                if (piece_pos >= 0) {
                    if (style == "blank") {
                        divs[i].style.backgroundImage = "shogi00.png";
                        divs[i].style.visibility = "hidden";
                    } else {
                        var piece = divs[i].style.backgroundImage.substr(piece_pos, 7);
                        divs[i].style.backgroundImage = "url(" + chrome.extension.getURL("img/shogi/kanji/" + style + "/" + piece + ".png") + ")";
                        divs[i].style.height = "48px";
                        divs[i].style.visibility = "visible";
                    }
                }
            }
        }
    }
}

set_style("blank");
chrome.extension.sendRequest({localstorage: "style"},
                             function(response) {
                                set_style(response.style);
                                wait_for_response = false;
                             });
