class ChromeService {
    constructor() {
        ChromeService.instance = this;
    }
    sendMessage(message) {
        chrome.runtime.sendMessage(message);
    }
    onMessage(message,callback) {
        chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
            callback(message);
        });
    }
}



