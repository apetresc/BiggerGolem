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
    set_style(items.shogi_style);
  });
} else if (game_name.indexOf("Go") >= 0) {
  let size = 0;
  if (game_name.indexOf("19x19") >= 0) {
    size = 19;
  } else if (game_name.indexOf("13x13") >= 0) {
    size = 13;
  } else if (game_name.indexOf("9x9") >= 0) {
    size = 9;
  }
  if (size > 0) {
    chrome.storage.local.get({ 'go_coordinates': false }, function (items) {
      set_go_coordinates(items.go_coordinates, size);
    });
  }
} else if (game_name.indexOf("Chess") >= 0) {
  chess_blank();
  chess_style('alpha', '64');
  /*
  chrome.storage.local.get({
    'chess_pieces': 'default',
    'chess_size': '32'
  }, function (items) {
    chess_style(items.chess_pieces, items.chess_size);
  });
  */
} else if (game_name.indexOf("Hex") >= 0) {
  fixBrokenHexBoard();
}

//$(document).ready(function() {
$('body').css("visibility", "visible");
//});

chrome.runtime.sendMessage({ action: "badgeUpdate", data: $("body").html() });
