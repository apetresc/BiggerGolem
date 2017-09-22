var analyseMode = false
var game, moves;
var boardSize
function go_analyse(size) {
    $('body').prepend('<style> .lg-board {width: ' + $('table').width() +'px;} </style>')
    boardSize = size
    let btn = $('<button id="analyse" class="btn blue">Analyse</button>')
    btn.click(function(){
        toggleAnalyseMode()
    })
    $('i.fa-fast-backward').closest('div').append(btn)

    $('i.fa-fast-backward, i.fa-backward').click(function(e) {
        if (analyseMode) {
            game.undo()
            e.preventDefault()
        }
    })

    $('i.fa-fast-forward, i.fa-forward').click(function(e) {
        if (analyseMode) {
            e.preventDefault()
        }
    })
}

function characterToCoordinate(c) {
    return  (c.charCodeAt(0) - 97);
}

function playSGF() {
    for (i=0;i<moves.length; i++) {
        if (moves[i].substr(2,2) == 'tt') {
            game.pass()
        } else {
            game.playAt(characterToCoordinate(moves[i][3]), characterToCoordinate(moves[i][2]))
        }
    }
}


function toggleAnalyseMode() {
    analyseMode = !analyseMode
    $('button#analyse').toggleClass('blue').toggleClass('red')
    if (analyseMode) {
        $('table').hide()
        $('table').parent().append('<div class="lg-board tenuki-board" data-include-coordinates="true"></div>')
        var boardElement = document.querySelector(".tenuki-board");
        game = new tenuki.Game({ element: boardElement, boardSize: boardSize });
        if (moves) {
            playSGF()
        } else {
            var sgffile = $('div.actions a').attr('href')
            $.get( sgffile, function( data ) {
                moves = data.match(/[B|W]\[(..)\]/g);
                playSGF()
              });
        }
    } else {
        $('div.tenuki-board').remove()
        $('table').show()
    }
}

