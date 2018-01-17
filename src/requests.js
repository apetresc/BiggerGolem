var game_name = $('h3.page-title').text();

if (game_name.indexOf("Reversi") >= 0) {
  chrome.storage.local.get({
    "reversi": {
      background: false,
      pieces: "default"
    },
  }, function (items) {
    setReversiStyle(items.reversi);
  });
} else if (game_name.indexOf("Shogi") >= 0) {
  chrome.storage.local.get({
    'shogi_style': 'default'
  }, function (items) {
    setShogiStyle(items.shogi_style);
  });
} else if (game_name.indexOf("Go") >= 0) {
  let size = 0;
  if (game_name.indexOf("19x19") >= 0 || game_name.indexOf("Go100") >= 0) {
    size = 19;
  } else if (game_name.indexOf("13x13") >= 0) {
    size = 13;
  } else if (game_name.indexOf("9x9") >= 0) {
    size = 9;
  }
  if (size > 0) {
    chrome.storage.local.get({ 'go_coordinates': false }, function (items) {
      setGoCoordinates(items.go_coordinates, size);
    });
  }
} else if (game_name.indexOf("Chess") >= 0) {
  chrome.storage.local.get({
    'chess_pieces': 'default',
    'chess_size': '32'
  }, function (items) {
    setChessStyle(items.chess_pieces, items.chess_size);
  });
} else if (game_name.indexOf("Hex") >= 0) {
  fixBrokenHexBoard();
}

setTimeout(function() {
  chrome.runtime.sendMessage({ action: "badgeUpdate", data: $("body").html() });
}, 0);
