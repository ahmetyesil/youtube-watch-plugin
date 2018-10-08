var loading_service = new LoadingService();
var alert_service = new AlertService();
var routing_service = new RoutingService();
var http_status_service = new HttpStatusService();


// Login API START
function login() {
    loading_service.open('.yt-loading');
    getSessionUrl(function success(response) {
            loading_service.close('.yt-loading');
            routing_service.locationHref(response.data);
        },
        function error(err) {
            loading_service.close('.yt-loading');
            http_status_service.errorHandler(err);
        }
    );
}

$('#button-login').click(function () {
    login();
});

$('#link-logout').click(function () {
    routing_service.pageRedirectByUrl(SiteInfoConstant.PAGE_LOGIN);
});
$('#link-channel').click(function () {
    routing_service.locationHref('https://www.youtube.com/channel/UCve_taYp1VAd_WWg0lDMNlg?view_as=subscriber');
})

$('#link-payment').click(function () {
    routing_service.locationHref(SiteInfoConstant.PAYMENT_URL);
})
$('#link-tos').click(function () {
    routing_service.locationHref(SiteInfoConstant.TOS_URL);
})
$('#link-faq').click(function () {
    routing_service.locationHref(SiteInfoConstant.FAQ_URL);
})


$('#button-watch-subs-like').click(function () {
    routing_service.locationHref('https://www.youtube.com/watch?v=KklDe7HnbTY&list=PLs8GsV2H1tV8E9B6QzptvUwHXAN6sUxRI');
});
$('#button-confirm').click(function () {
    alert('confirm event')
});
$('#button-skip').click(function () {
    alert('skip event')
});

(function () {
    console.log(' location.href ', location.href);
    createSession(function success(response) {
            routing_service.pageRedirectByUrl(SiteInfoConstant.PAGE_INDEX);
            console.log('response', response)
        },
        function error(err) {
            loading_service.close('.yt-loading');
            http_status_service.errorHandler(err);
        }
    );
})();

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        // listen for messages sent from background.js
        if (request.message === 'hello!') {
            console.log(request.url) // new url is now in content scripts!
        }
    });