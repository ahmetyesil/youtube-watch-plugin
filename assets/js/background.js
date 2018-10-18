var browser = self.browser;
if (typeof browser === "undefined") {
    browser = self.chrome;
}

// Try cloud sync, else fallback to localstorage
var storage = browser.storage.sync;
if (typeof storage === "undefined") {
    storage = browser.storage.local;
}
var session_id;

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


function checkTab(tab) {
    // const regex = /(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^\?&"'>]+)/;
    // if (regex.test(tab.url)) {
    //     const matches = regex.exec(tab.url);
    //     const id = matches[5];
    //     if (id === 'RWeFOe2Cs4k') {
    //         const code = 'function onPlayerStateChange(state) { alert(JSON.stringify(state)); } var ytplayer = document.getElementById("ytplayer");ytplayer.addEventListener("onStateChange", "onPlayerStateChange");';
    //         chrome.tabs.executeScript(tab.id, {code: code});
    //         alert('helal dogru video');
    //     }
    // }

    if (tab.url && tab.url.indexOf('http://localhost:4200/?code=') > -1) {
        // alert('tab.id'+tab.url);
        // alert(chrome.tabs.executeScript(tab.id, {code: code}));
        chrome.tabs.executeScript(tab.id, {code: 'localStorage.getItem("storage_session_id");'}, function (storage_session_id) {
            if (storage_session_id && storage_session_id !== "" && storage_session_id !== '' && storage_session_id !== null) {
                localStorage.setItem("session_id", storage_session_id);
                session_id = storage_session_id;
            }
        });
    }

    chrome.tabs.query({url: "https://www.youtube.com/*"}, function (tabs) {
        tabs.forEach(function (tab) {
            // alert('storage_session_id:' + session_id);
            chrome.tabs.executeScript(tab.id, {code: 'localStorage.setItem("session_id",' + session_id + ');'}, function (d) {
                console.log('d',d);
            });
        });
    });


}

