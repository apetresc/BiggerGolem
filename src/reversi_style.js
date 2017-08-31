function set_reversi_style(green,go) {
	var lastMove = $("table[bordercolor] td[bgcolor='#FF9115']");
    var lastMoveImg = $("table[bordercolor] td[bgcolor='#FF9115'] img");
    if (green == "true") {
	if (lastMove.length) lastMove[0].style.backgroundColor = "#00EE00";
	var tds = $("table[bordercolor] td[bgcolor!='#FF9115']:has(img)");
	for (var i = 0; i < tds.length; i++) tds[i].style.backgroundColor = "#008800";
    }
    if (go == "true") {
	if (lastMove.length) {
	var lastMoveColor = lastMoveImg[0].src.match(/\/reversi\/([bw])\.gif/)[1];
	$(lastMoveImg[0]).attr("src","/iphone/images/go/35_"+lastMoveColor+"sx.png");
	}
	var imgs = $("table[bordercolor] img[src*=reversi]");
	for (var i = 0; i < imgs.length; i++) {
	    var color = imgs[i].src.match(/\/reversi\/([bw])\.gif/)[1];
	    $(imgs[i]).attr("src","/iphone/images/go/35_"+color+"s.png");
	}
    }
}
