
class RoutingService {
    constructor() {
        RoutingService.instance = this;
    }

    pageRouting() {
        let current_page = '#yt-login';
        $(current_page).fadeIn();
        $('a[href]').click(function () {
            let t = $(this);
            let s = t.attr('href');
            pageRedirectByUrl(s);
        });
    }

    pageRedirectByUrl(id) {
        if (id.indexOf('http') === -1) {
            $('.yt-pages').css('display', 'none');
            $(id).fadeIn();
        }
    }

    locationHref(url) {
        chrome.tabs.update(null, {
            url: url
        });
    }
}