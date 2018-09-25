(function () {

    let PAGE_LOGIN = '#yt-login';
    let PAGE_REGISTER = '#yt-register';
    let PAGE_FORGOT_PASSWORD = '#yt-forgot_password';
    let PAGE_INDEX = '#yt-index';

    let PAYMENT_URL = 'https://www.ytwatch.com/payment';
    let TOS_URL = 'https://www.ytwatch.com/tos';
    let FAQ_URL = 'https://www.ytwatch.com/faq';


    function pageRouting() {
        let current_page = '#yt-login';
        $(current_page).fadeIn();
        $('a[href]').click(function () {
            let t = $(this);
            let s = t.attr('href');
            pageRedirectByUrl(s);
        })
    }

    function pageRedirectByUrl(id) {
        if (id.indexOf('http') === -1) {
            $('.yt-pages').css('display', 'none');
            $(id).fadeIn();
        }
    }

    function locationHref(url) {
        chrome.tabs.update(null, {
            url: url
        });
    }

    pageRouting();


    $('#button-login').click(function () {
        var ths = $(this);
        ths.addClass('loading').attr('disabled','disabled');
        var login_model = new loginModel();
        login_model.email = $('#yt-login-email').val().toString();
        login_model.password = $('#yt-login-password').val().toString();
        login(login_model,function success(data) {
           pageRedirectByUrl(PAGE_INDEX);
           ths.removeClass('loading').removeAttr('disabled');
        },
        function error(err) {
            ths.removeClass('loading').removeAttr('disabled');
        }
        );

    });
    $('#link-logout').click(function () {
        pageRedirectByUrl(PAGE_LOGIN);
    });
    $('#link-channel').click(function () {
        locationHref('https://www.youtube.com/channel/UCve_taYp1VAd_WWg0lDMNlg?view_as=subscriber');
    })
    $('#button-register').click(function () {
        pageRedirectByUrl(PAGE_INDEX);
    });
    $('#button-new-password').click(function () {

    });

    $('#link-payment').click(function () {
        locationHref(PAYMENT_URL);
    })
    $('#link-tos').click(function () {
        locationHref(TOS_URL);
    })
    $('#link-faq').click(function () {
        locationHref(FAQ_URL);
    })


    $('#button-watch-subs-like').click(function () {
        locationHref('https://www.youtube.com/watch?v=KklDe7HnbTY&list=PLs8GsV2H1tV8E9B6QzptvUwHXAN6sUxRI');
    });
    $('#button-confirm').click(function () {
        alert('confirm event')
    });
    $('#button-skip').click(function () {
        alert('skip event')
    });


})();