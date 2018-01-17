function show_scoreboard() {
  var me = $('span.username').text();
  var win = 0, lost = 0, draw = 0, ongoing = 0;
  $.each($('div.portlet-body tr'), function (i, tr) {
    var opponent = $($(tr).find('td')[1]).text()
    if (opponent == me) {
      switch ($($(tr).find('td')[5]).text()) {
        case 'win':
        lost++;
        $(tr).css('background-color', '#fc9595');
        break;
        case 'lost':
        win++
        $(tr).css('background-color', '#67fc67');
        break;
        case 'draw':
        draw++
        $(tr).css('background-color', '#90e1ff');
        break;
        default:
        ongoing++;
        $(tr).css('background-color', '#90e1ff');
      }
    }
  })
  if (lost + win + ongoing + draw > 0) {
    var total = win + lost + draw;
    var markup = `
      <div class="portlet box yellow-casablanca">
        <div class="portlet-title">
          <div class="caption">
            <i class="fa fa-cogs"></i>
            Statistics ${$('span.username').text()} vs. ${$($('.caption')).text().match(/\[.*?\]/g)[0]}
          </div>
          <div class="tools"> <a href="javascript:;" class="collapse" data-original-title="" title=""></a><a href="javascript:;" class="remove" data-original-title="" title=""></a>
          </div>
        </div>
        <div id="BiggerGolemStatistics" class="portlet-body">
          <table cellpadding="2" cellspacing="1" border="0" width="100%" align="center" bordercolor="white">
            <tr><td>Wins: ${win} ${total > 0 ? "(" + Math.round((win / total * 1000)) / 10 + "%)" : " "}</td></tr>
            <tr><td>Draws: ${draw} ${total > 0 ? "(" + Math.round((draw / total * 1000)) / 10 + "%)" : " "}</td></tr>
            <tr><td>Losses: ${lost} ${total > 0 ? "(" + Math.round((lost / total * 1000)) / 10 + "%)" : " "}</td></tr>
            <tr><td>Ongoing: ${ongoing}</td></tr>
          </table>
        </div>
      </div>`

      $('div.portlet.box').before(markup)
  }
}

function parseResults(data, url) {
  var me = $(data).find('span.username').text();
  var win = 0, lost = 0, draw = 0, ongoing = 0;
  $.each($(data).find('div.portlet-body tr'), function (i, tr) {
    var opponent = $($(tr).find('td')[1]).text()
    if (opponent == me) {
      switch ($($(tr).find('td')[5]).text()) {
        case 'win':
        lost++;
        break;
        case 'lost':
        win++
        break;
        case 'draw':
        draw++
        break;
        default:
        ongoing++;
      }
    }
  })
  if (lost + win + ongoing + draw > 0) {
    var bg = '#90e1ff'
    if (win > lost) {
      bg = '#67fc67'
    } else if (lost > win) {
      bg = '#fc9595'
    }
    var stats = "<td style=\"background-color: " + bg + "\"><a href=\"" + url + "\"> " + $(data).find('.caption').text().match(/\[.*?\]/g)[1] + "</a></td>"
    var total = win + lost + draw;
    stats += "<td>Wins: " + win + (total > 0 ? " (" + Math.round((win / total * 1000)) / 10 + "%)" : "") + " </td>"
    stats += "<td>Draws: " + draw + (total > 0 ? " (" + Math.round((draw / total * 1000)) / 10 + "%)" : "") + " </td>"
    stats += "<td>Losses: " + lost + (total > 0 ? " (" + Math.round((lost / total * 1000)) / 10 + "%)" : "") + " </td>"
    stats += "<td>Ongoing: " + ongoing + "</td>"
    $('#BiggerGolemStatistics table').append('<tr align="right" bgcolor="#FFFFD5">' + stats + '</tr>');
  }
}

function statistics() {
  var me = $('span.username').text();
  var them = $($('.box.green tr').first().find('td')[1]).text();
  if (me.replace(" ★", "") == them) {
    return;
  }

  var markup = `
  <div class="portlet box yellow-casablanca">
    <div class="portlet-title">
      <div class="caption">
        <i class="fa fa-cogs"></i>
        Statistics ${me} vs. ${them}
      </div>
      <div class="tools"> <a href="javascript:;" class="collapse" data-original-title="" title=""></a><a href="javascript:;" class="remove" data-original-title="" title=""></a>
      </div>
    </div>
    <div id="BiggerGolemStatistics" class="portlet-body">
      <table cellpadding="2" cellspacing="1" border="0" width="100%" align="center" bordercolor="white">
      </table>
    </div>
  </div>`
  $($('.portlet')[1]).before(markup)

  $.each($('.portlet-body').last().find('td[nowrap] a'), function (i, e) {
    var url = e.href
    $.get(url, function (data) {
      parseResults(data, url)
    });
  })
}

if ($('h2').text() == "List of games") {
  show_scoreboard();
} else if (document.location.pathname == "/jsp/info/player.jsp") {
  statistics();
}
