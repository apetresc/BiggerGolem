// Set default values
if (localStorage.style == undefined) localStorage.style = "default";
if (localStorage.background == undefined) localStorage.background = false;
if (localStorage.go == undefined) localStorage.go = false;

// Add localStorage request handler
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.localstorage == "style")
            sendResponse({ style: localStorage.style });
        else if (request.localstorage == "reversiStyle")
            sendResponse({ green: localStorage.background, go: localStorage.go });
        else if (request.localstorage == "go-coordinates")
            sendResponse({setCoordinates: localStorage.goCoordinates, size: request.size});
        else if (request.localstorage == "badgeUpdate")
            setBadge(request.data);
        else
            sendResponse({});
    }
);

chrome.browserAction.onClicked.addListener(
    function (tab) {
        window.open('https://www.littlegolem.net/jsp/game/index.jsp', '_newtab');
    }
);

var setBadge = function (data) {
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