(function () {

    let PAGE_LOGIN = '#yt-login';
    let PAGE_REGISTER = '#yt-register';
    let PAGE_FORGOT_PASSWORD = '#yt-forgot_password';
    let PAGE_INDEX = '#yt-index';

    let PAYMENT_URL = 'https://www.ytwatch.com/payment';
    let TOS_URL = 'https://www.ytwatch.com/tos';
    let FAQ_URL = 'https://www.ytwatch.com/faq';

    var loading_service = new LoadingService();
    var routing_service = new RoutingService();


    loginForm();
    routing_service.pageRouting();

    // Login API START

    function loginForm(){
        var login_model = new loginModel();
        login_model.email = 'arge@bynogame.com';
        login_model.password = '123456';
        // login_model.email = $('#yt-login-email').val().toString();
        // login_model.password = $('#yt-login-password').val().toString();
        loading_service.open('.yt-loading');
        login(login_model, function success(data) {
                routing_service.pageRedirectByUrl(PAGE_INDEX);
                loading_service.close('.yt-loading');
            },
            function error(err) {
                loading_service.close('.yt-loading');
            }
        );
    }

    // Login API END



    // Login form validation START

    $('#button-login').click(function () {});
    $("#yt-login-form").validate({

        rules: {
            'yt-login-email': {
                required: true,
                email: true
            },
            'yt-login-password': {
                required: true
            }
        },
        messages: {
             'yt-login-email': 'Lütfen geçerli email giriniz.',
             'yt-login-password': 'Lütfen 6 haneli şifrenizi giriniz.',
        },
        submitHandler: function () {
            loginForm();
        }
    });

    // Login form validation END



    $('#link-logout').click(function () {
        routing_service.pageRedirectByUrl(PAGE_LOGIN);
    });
    $('#link-channel').click(function () {
        routing_service.locationHref('https://www.youtube.com/channel/UCve_taYp1VAd_WWg0lDMNlg?view_as=subscriber');
    })
    $('#button-register').click(function () {
        routing_service.pageRedirectByUrl(PAGE_INDEX);
    });
    $('#button-new-password').click(function () {

    });

    $('#link-payment').click(function () {
        routing_service.locationHref(PAYMENT_URL);
    })
    $('#link-tos').click(function () {
        routing_service.locationHref(TOS_URL);
    })
    $('#link-faq').click(function () {
        routing_service.locationHref(FAQ_URL);
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


})();