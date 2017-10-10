# this should be modified to handle svg structure for xiangqi board and pieces for example:
#
			
				
#<svg width="100%" height="100%" viewBox="0 0 181 203" xmlns="http://www.w3.org/2000/svg">
#	<image x="0" y="0" width="181" height="203" xlink:href="../../images/xiangqi/board0.svg"></image>
#	<circle cx="130.47499" cy="151.775" r="11" style="fill:blue;fill-opacity:0.2;"></circle>
#	<circle cx="150.625" cy="192.075" r="11" style="fill:blue;fill-opacity:0.2;"></circle>
#	<image x="0.5" y="183.0" width="18" height="18" xlink:href="../../images/xiangqi/piece4/rr.svg"></image>
#	<image x="20.65" y="41.949997" width="18" height="18" xlink:href="../../images/xiangqi/piece4/bC.svg"></image>
#	<image x="20.65" y="183.0" width="18" height="18" xlink:href="../../images/xiangqi/piece4/rn.svg"></image>
#	<image x="60.949997" y="183.0" width="18" height="18" xlink:href="../../images/xiangqi/piece4/ra.svg"></image>
#	<image x="81.1" y="183.0" width="18" height="18" xlink:href="../../images/xiangqi/piece4/rk.svg"></image>
#	<image x="101.25" y="183.0" width="18" height="18" xlink:href="../../images/xiangqi/piece4/ra.svg"></image>
#	<image x="121.399994" y="183.0" width="18" height="18" xlink:href="../../images/xiangqi/piece4/rb.svg"></image>
#	<image x="141.55" y="41.949997" width="18" height="18" xlink:href="../../images/xiangqi/piece4/bC.svg"></image>
#	<image x="161.7" y="183.0" width="18" height="18" xlink:href="../../images/xiangqi/piece4/rr.svg"></image>
#	<image x="0.5" y="1.6500092" width="18" height="18" xlink:href="../../images/xiangqi/piece4/bR.svg"></image>
#	<image x="20.65" y="1.6500092" width="18" height="18" xlink:href="../../images/xiangqi/piece4/bN.svg"></image>
#	<image x="20.65" y="142.7" width="18" height="18" xlink:href="../../images/xiangqi/piece4/rc.svg"></image>
#	<image x="40.8" y="1.6500092" width="18" height="18" xlink:href="../../images/xiangqi/piece4/bB.svg"></image>
#	<image x="60.949997" y="1.6500092" width="18" height="18" xlink:href="../../images/xiangqi/piece4/bA.svg"></image>
#	<image x="81.1" y="1.6500092" width="18" height="18" xlink:href="../../images/xiangqi/piece4/bK.svg"></image>
#	<image x="101.25" y="1.6500092" width="18" height="18" xlink:href="../../images/xiangqi/piece4/bA.svg"></image>
#	<image x="81.1" y="142.7" width="18" height="18" xlink:href="../../images/xiangqi/piece4/rb.svg"></image>
#	<image x="141.55" y="1.6500092" width="18" height="18" xlink:href="../../images/xiangqi/piece4/bN.svg"></image>
#	<image x="121.399994" y="142.7" width="18" height="18" xlink:href="../../images/xiangqi/piece4/rn.svg"></image>
#	<image x="161.7" y="1.6500092" width="18" height="18" xlink:href="../../images/xiangqi/piece4/bR.svg"></image>
#	<image x="0.5" y="122.55" width="18" height="18" xlink:href="../../images/xiangqi/piece4/rp.svg"></image>
#	<image x="40.8" y="122.55" width="18" height="18" xlink:href="../../images/xiangqi/piece4/rp.svg"></image>
#	<image x="81.1" y="122.55" width="18" height="18" xlink:href="../../images/xiangqi/piece4/rp.svg"></image>
#	<image x="141.55" y="122.55" width="18" height="18" xlink:href="../../images/xiangqi/piece4/rc.svg"></image>
#	<image x="161.7" y="122.55" width="18" height="18" xlink:href="../../images/xiangqi/piece4/rp.svg"></image>
#	<image x="40.8" y="82.25" width="18" height="18" xlink:href="../../images/xiangqi/piece4/bP.svg"></image>
#	<image x="121.399994" y="82.25" width="18" height="18" xlink:href="../../images/xiangqi/piece4/bB.svg"></image>
#	<image x="0.5" y="62.100006" width="18" height="18" xlink:href="../../images/xiangqi/piece4/bP.svg"></image>
#	<image x="81.1" y="62.100006" width="18" height="18" xlink:href="../../images/xiangqi/piece4/bP.svg"></image>
#	<image x="161.7" y="62.100006" width="18" height="18" xlink:href="../../images/xiangqi/piece4/bP.svg"></image></svg>
# 
# changing "../../images/xiangqi/piece4/bP.svg" to "url(" + chrome.extension.getURL("img/xiangqi/bP.svg") + ")";

function set_style(style) {
    var divs = $("div");
    for (var i = 0; i < divs.length; i++) {
        var piece_pos = divs[i].style.backgroundImage.search(/xiangqi\d\d/);
        if (piece_pos >= 0) {
            if (style == "blank") {
                divs[i].style.backgroundImage = "/*" + divs[i].style.backgroundImage.substr(piece_pos, 7) + "*/";
                divs[i].style.visibility = "hidden";
            } else {
                var piece = divs[i].style.backgroundImage.substr(piece_pos, 7);
                if (style != "default") {
                    divs[i].style.backgroundImage = "url(" + chrome.extension.getURL("img/xiangqi/" + piece + ".svg") + ")";
                    divs[i].style.height = "18px";
                }
                divs[i].style.visibility = "visible";
            }
        }
    }

}
