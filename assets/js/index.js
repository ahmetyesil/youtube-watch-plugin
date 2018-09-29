(function () {

    var loading_service = new LoadingService();
    var alert_service = new AlertService();
    var routing_service = new RoutingService();
    var http_status_service = new HttpStatusService();


    loginForm();
    routing_service.pageRouting();

    // Login API START
    function loginForm() {
        var login_model = new loginModel();
        login_model.email = 'arge@bynogame.com';
        login_model.password = '123456';
        // login_model.email = $('#yt-login-email').val().toString();
        // login_model.password = $('#yt-login-password').val().toString();
        loading_service.open('.yt-loading');
        login(login_model, function success(data) {
                routing_service.pageRedirectByUrl(SiteInfoConstant.PAGE_INDEX);
                loading_service.close('.yt-loading');
                http_status_service.successHandler(data);
            },
            function error(err) {
                loading_service.close('.yt-loading');
                http_status_service.errorHandler(err);
            }
        );
    }

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
    // Login API END


    // register API START
    function registerForm() {
        var register_model = new registerModel();
        register_model.email = $('#yt-register-email').val().toString();
        register_model.channel_url = $('#yt-register-channel-url').val().toString();
        register_model.password = $('#yt-register-password').val().toString();
        register_model.password_confirm = $('#yt-register-password-confirm').val().toString();
        if (register_model.password === register_model.password_confirm) {
            loading_service.open('.yt-loading');
            register(register_model, function success(data) {
                    routing_service.pageRedirectByUrl(SiteInfoConstant.PAGE_INDEX);
                    loading_service.close('.yt-loading');
                },
                function error(err) {
                    loading_service.close('.yt-loading');
                }
            );
        }

    }

    $("#yt-register-form").validate({

        rules: {
            'yt-register-email': {
                required: true,
                email: true
            },
            'yt-register-channel-url': {
                required: true,
                email: true
            },
            'yt-register-password': {
                required: true
            },
            'yt-register-password-confirm': {
                required: true,
                equalTo: "#yt-register-password"
            }
        },
        messages: {
            'yt-register-email': 'Lütfen gmail adresinizi giriniz.',
            'yt-register-channel-url': 'Lütfen youtube kanal linkinizi giriniz',
            'yt-register-password': 'Lütfen 6 haneli şifrenizi oluşturunuz.',
            'yt-register-password-confirm': 'Lütfen 6 haneli şifrenizi tekrar giriniz.',
        },
        submitHandler: function () {
            registerForm();
        }
    });
    // register API END


    // Forgot Password API START
    function forgotPasswordForm() {
        var forgot_password_model = new forgotPasswordModel();
        forgot_password_model.email = $('#yt-forgot-password-email').val().toString();
        loading_service.open('.yt-loading');
        forgotPassword(forgot_password_model, function success(data) {
                routing_service.pageRedirectByUrl(SiteInfoConstant.PAGE_LOGIN);
                loading_service.close('.yt-loading');
            },
            function error(err) {
                loading_service.close('.yt-loading');
            }
        );
    }

    $("#yt-forgot-password-form").validate({
        rules: {
            'yt-forgot-password-email': {
                required: true,
                email: true
            }
        },
        messages: {
            'yt-forgot-password-email': 'Lütfen sisteme kayıtlı email adresinizi giriniz.',

        },
        submitHandler: function () {
            forgotPasswordForm();
        }
    });
    // Forgot Password API END


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


})();