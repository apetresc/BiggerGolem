(function() {
    'use strict';

    var game_name = $('h3.page-title').text();

    if (game_name.indexOf('Reversi') >= 0) {
        setReversiStyle({
            background: REVERSI_BACKGROUND,
            pieces: REVERSI_STYLE,
            size: REVERSI_SIZE
        });
    } else if (game_name.indexOf('Shogi') >= 0) {
        setShogiStyle(SHOGI_STYLE);
        setTimeout(function() {
          fixShogiPgn();
        }, 600);
    } else if (game_name.indexOf('Go') >= 0) {
        let size = 0;
        if (game_name.indexOf('19x19') >= 0 || game_name.indexOf('Random100') >= 0) {
            size = 19;
        } else if (game_name.indexOf('13x13') >= 0) {
            size = 13;
        } else if (game_name.indexOf('9x9') >= 0) {
            size = 9;
        }
        if (size > 0) {
            setGoCoordinates(GO_COORDINATES, size);
        }
    } else if (game_name.indexOf('Chess') >= 0) {
        setChessStyle(CHESS_STYLE, CHESS_SIZE);
    } else if (game_name.indexOf('Hex') >= 0) {
        fixBrokenHexBoard();
    }
})();
