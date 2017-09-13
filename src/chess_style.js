function chess_resize(size) {
  alert("RESIZE");
  $('body table td').css('width', size + 'px')
  $('body table td').css('height', size + 'px')
  $('body table img').css('width', size + 'px')
  $('body table img').css('height', size + 'px')
}
