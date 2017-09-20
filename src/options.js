function save_options() {
    var select = document.getElementById("style");
    var style = select.children[select.selectedIndex].value;
    var chess_pieces_select = document.getElementById("chess_pieces");
    var chess_pieces = chess_pieces_select.children[chess_pieces_select.selectedIndex].value;
    var reversiOpts = document.getElementById("reversi");
    var goOpts = document.getElementById("go");

    chrome.storage.sync.set({
      shogi_style: style,

      chess_pieces: chess_pieces,
      chess_size: document.getElementById("chess_size").value,

      reversei_background: reversiOpts.green.checked,
      reversi_go: reversiOpts.go.checked,

      go_coordinates: goOpts.coordinates.checked
    }, function() {
      var status = document.getElementById("status");
      status.innerHTML = "Options saved.";
      setTimeout(function() {
        status.innerHTML = "";
      }, 750);
    });
}


function restore_options() {
  chrome.storage.sync.get({
    shogi_style: "default",
    chess_pieces: "default",
    chess_size: "32",
    reversi_background: false,
    reversi_go: false,
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
    reversiOpts.green.checked = items.reversi_background;
    reversiOpts.go.checked = items.reversi_go;

    var goOpts = document.getElementById("go");
    goOpts.coordinates.checked = items.go_coordinates;
  });
}

el = document.getElementById("save-options")
if (el) el.addEventListener("click", save_options);
document.addEventListener("DOMContentLoaded", restore_options);
