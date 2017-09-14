
var game_name = $('h3.page-title').text();

if (game_name.indexOf("Reversi") >= 0) {
	chrome.runtime.sendMessage({ localstorage: "reversiStyle" },
		function (response) {
			set_reversi_style(response.green, response.go);
		});
}

if (game_name.indexOf("Shogi") >= 0) {
	set_style("blank");
	chrome.runtime.sendMessage({ localstorage: "style" },
		function (response) {
			set_style(response.style);
		});
}

if (game_name.indexOf("Go") >= 0) {
	let size = 0;
	if (game_name.indexOf("19x19") >= 0) {
		size = 19
	}
	else if (game_name.indexOf("13x13") >= 0) {
		size = 13
	} else if (game_name.indexOf("9x9") >= 0) {
		size = 9
	}
	if (size > 0) {
		chrome.runtime.sendMessage({ localstorage: "go-coordinates", size: size },
			function (response) {
				set_go_coordinates(response.setCoordinates, response.size)
			});
	}
}

if (game_name.indexOf("Chess") >= 0) {
  chess_blank();
  chrome.runtime.sendMessage({ localstorage: "chess-style" },
    function (response) {
      chess_style(response.chess_pieces, response.chess_size);
    });
}

chrome.runtime.sendMessage({ localstorage: "badgeUpdate", data: $("body").html() });
