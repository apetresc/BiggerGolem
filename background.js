// Add localStorage request handler
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.action == "badgeUpdate")
            setBadge(request.data);
    }
);

chrome.browserAction.onClicked.addListener(
    function (tab) {
        window.open('https://www.littlegolem.net/jsp/game/index.jsp', '_newtab');
    }
);

var setBadge = function (data) {
    data = data.replace(/<img[^>]*>/g,"");
    var badgeText = '';
    var page = $(data);
    var badgeText = parseInt($("a.dropdown-toggle i.fa-cubes", page).next().html())
    if (isNaN(badgeText)) badgeText = ""
    chrome.browserAction.setBadgeText({ text: String(badgeText) });
}

var checkLittleGolem = function () {
    $.get('https://www.littlegolem.net/jsp/game/index.jsp', setBadge);
}
setInterval(checkLittleGolem, 30000);
checkLittleGolem();
