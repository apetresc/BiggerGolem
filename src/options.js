function save_options() {
    var select = document.getElementById("style");
    var style = select.children[select.selectedIndex].value;
    var chess_pieces_select = document.getElementById("chess_pieces");
    var chess_pieces = chess_pieces_select.children[chess_pieces_select.selectedIndex].value;
    var reversiOpts = document.getElementById("reversi");
    var goOpts = document.getElementById("go");

    chrome.storage.local.set({
      shogi_style: style,

      chess_pieces: chess_pieces,
      chess_size: document.getElementById("chess_size").value,

      reversi: {
        background: reversiOpts.green.checked,
        pieces: reversiOpts.pieces.value,
        size: reversiOpts.size.value
      },

      go_coordinates: goOpts.coordinates.checked
    }, function() {
      $('#status').text("Options saved.");
      setTimeout(function() {
        $('#status').text("");
      }, 750);
    });
}


function restore_options() {
  chrome.storage.local.get({
    shogi_style: "default",
    chess_pieces: "default",
    chess_size: "32",
    reversi: {
      background: false,
      pieces: "default",
      size: "32"
    },
    go_coordinates: false
  }, function(items) {
    var select = document.getElementById("style");
    for (var i = 0; i < select.children.length; i++) {
        var child = select.children[i];
        if (child.value == items.shogi_style) {
            child.selected = "true";
            break;
        }
    }

    var chess_pieces_select = document.getElementById("chess_pieces");
    for (var i = 0; i < chess_pieces_select.length; i++) {
      var child = chess_pieces_select.children[i];
      if (child.value == items.chess_pieces) {
          child.selected = "true";
          break;
      }
    }
    document.getElementById("chess_size").value = items.chess_size;

    var reversiOpts = document.getElementById("reversi");
    reversiOpts.green.checked = items.reversi.background;
    reversiOpts.size.value = items.reversi.size;
    const reversiPieceOption = Array.prototype.find.call(reversiOpts.pieces, function(option) {
      return option.value === items.reversi.pieces;
    });
    reversiPieceOption.selected = true;

    var goOpts = document.getElementById("go");
    goOpts.coordinates.checked = items.go_coordinates;
  });
}

el = document.getElementById("save-options")
if (el) el.addEventListener("click", save_options);
document.addEventListener("DOMContentLoaded", restore_options);
