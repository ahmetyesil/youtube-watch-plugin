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


chrome.tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab) {
        // read changeInfo data
        if (changeInfo.url) {
            // url has changed; do something here
            // like send message to content script
            alert('changeInfo.url:' + changeInfo.url);
            chrome.tabs.sendMessage( tabId, {
                message: 'hello!',
                url: changeInfo.url
            })
        }
    }
);