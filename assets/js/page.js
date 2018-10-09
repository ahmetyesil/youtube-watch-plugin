if (document.readyState === 'loading') {
    document.onload = completed;
} else {
    completed();

}



function completed() {
    // video-stream html5-main-video
    const videos = document.getElementsByTagName('video');
    // atr_challenge : bu input[type=hidden] elementinde videonun id bilgileri bulunuyor. kullanabiliriz.

    const video = videos[0];
    console.log('video',video);
    if (video) {
        PlayCounter.create(video);
    }
}



chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        // listen for messages sent from background.js
        if (request.message === 'hello!') {
            alert('contente geçti:'+request.url);
            // new url is now in content scripts!
        }
    });