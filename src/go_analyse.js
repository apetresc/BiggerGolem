var analyseMode = false
var game, moves;
var boardSize;
var handicap = 0;
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
    var boardElement = document.querySelector(".tenuki-board");
    game = new tenuki.Game({ element: boardElement, 
        boardSize: boardSize, 
        komi: 6.5,
        handicapStones: handicap });
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
        $('table').parent().prepend('<div class="lg-board tenuki-board" data-include-coordinates="true"></div>')
        $('.lg-board').parent().append('<div id="show-score" style="text-align: center;"></div>')
        if (moves) {
            playSGF()
        } else {
            var sgffile = $('div.actions a').attr('href')
            $.get( sgffile, function( data ) {
                moves = data.match(/[B|W]\[(..)\]/g);
                let h = data.match(/HA\[(.)\]/)        
                if (h != null)  handicap = parseInt(data.match(/HA\[(.)\]/)[1])
                playSGF()
              });
        }
        let btn = $('<button id="score" class="btn blue">Score</button>')
        btn.click(function(){
            game.pass()
            game.pass()
            let score = game.score()
            $('#show-score').html('B: ' + score.black + ' - W: ' + score.white + '<br>Mark dead stones and press the score button again to update')
        })
        $('i.fa-fast-backward').closest('div').append(btn)
    } else {
        $('div.tenuki-board').remove()
        $('button#score').remove()
        $('#show-score').html('')
        $('table').show()
    }
}

