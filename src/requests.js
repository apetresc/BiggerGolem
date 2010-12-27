var game_name = $("body>table:nth-child(3)>tbody>tr>td>font>b").text();

if (game_name.indexOf("Reversi") >= 0) {
	chrome.extension.sendRequest({localstorage: "reversiStyle"},
		function(response) {
			set_reversi_style(response.green,response.go);
		});
}

if (game_name.indexOf("Shogi") >= 0) {
	set_style("blank");
	chrome.extension.sendRequest({localstorage: "style"},
		function(response) {
			set_style(response.style);
		});
}

chrome.extension.sendRequest({localstorage: "badgeUpdate", data: $("body").html()});
