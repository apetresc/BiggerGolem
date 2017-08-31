function set_go_coordinates(setCoordinates, size) {
    if (setCoordinates == "true") {
        let num_size = parseInt(size)
        if (!isNaN(num_size)) {
            $('table[style*="wood004"] tr').prepend(function (i, txt) { return '<td>&nbsp;' + (num_size - i) + '</td>' })
            let coordinates_row = "<td></td>"
            for (i = 0; i < num_size; i++) {
                let skip_i = i >= 8 ? 1 : 0;
                coordinates_row += '<td align="center">' + String.fromCharCode(65 + i + skip_i) + '</td>'
            }
            $('table[style*="wood004"]').append('<tr>' + coordinates_row + '</tr>')
        }
    }
}

