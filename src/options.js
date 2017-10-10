function save_options() {
    var select_shogi = document.getElementById("shogi_style");
    var style_shogi = select_shogi.children[select.selectedIndex].value;
    var select_xiangqi = document.getElementById("xiangqi_tyle");
    var style_xiangqi = select_xiangqi.children[select.selectedIndex].value;
    var chess_pieces_select = document.getElementById("chess_pieces");
    var chess_pieces = chess_pieces_select.children[chess_pieces_select.selectedIndex].value;
    var reversiOpts = document.getElementById("reversi");
    var goOpts = document.getElementById("go");

    chrome.storage.local.set({
      shogi_style: style_shogi,
      xiangqi_style: style_xiangqi,

      chess_pieces: chess_pieces,
      chess_size: document.getElementById("chess_size").value,

      reversei_background: reversiOpts.green.checked,
      reversi_go: reversiOpts.go.checked,

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
    xiangqi_style: "western",
    chess_pieces: "default",
    chess_size: "32",
    reversi_background: false,
    reversi_go: false,
    go_coordinates: false
  }, function(items) {
    var select_shogi = document.getElementById("shogi_style");
    for (var i = 0; i < select_shogi.children.length; i++) {
        var child = select_shogi.children[i];
        if (child.value == items.shogi_style) {
            child.selected = "true";
            break;
        }
    }
    var select_xiangqi = document.getElementById("xiangqi_style");
    for (var i = 0; i < select_xiangki.children.length; i++) {
        var child = select_xiangki.children[i];
        if (child.value == items.xiangqi_style) {
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
