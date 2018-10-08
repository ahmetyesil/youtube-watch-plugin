chrome.tabs.onActiveChanged.addListener(function (tab_id) {
    chrome.tabs.getSelected(null, function (tab) {
        checkTab(tab);
    });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
        checkTab(tab);
    }
});

chrome.runtime.getBackgroundPage(function(bgWindow) {

});

function checkTab(tab) {
    const regex = /(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^\?&"'>]+)/;
    if (regex.test(tab.url)) {
        const matches = regex.exec(tab.url);
        const id = matches[5];
        if (id === 'RWeFOe2Cs4k') {
            const code = 'function onPlayerStateChange(state) { alert(JSON.stringify(state)); } var ytplayer = document.getElementById("ytplayer");ytplayer.addEventListener("onStateChange", "onPlayerStateChange");';
            chrome.tabs.executeScript(tab.id, {code: code});
            alert('helal dogru video');
        }
    }
}
