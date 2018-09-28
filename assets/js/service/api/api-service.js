var rest = new RestClient({
    url: EnvironmentConstant.API_URL,
    dataType: 'json',
    contentType: 'application/json',
    processData: true,
    timeout: 120000,
    synchronous: false,
    errorRedirect: false
});

/**
 * @param {loginModel} login_model The date
 */
function login(login_model,success,error) {

    let data = {
        path: ApiUrlsConstant.SESSION,
        model: login_model,
    }
    rest.post(data,success,error);
}


/**
 * @param {registerModel} register_model The date
 */
function register(register_model,success,error) {

    let data = {
        path: ApiUrlsConstant.REGISTER,
        model: register_model,
    }
    rest.post(data,success,error);
}


/**
 * @param {forgotPasswordModel} forgot_password_model The date
 */
function forgotPassword(forgot_password_model,success,error) {

    let data = {
        path: ApiUrlsConstant.FORGOT_PASSWORD,
        model: forgot_password_model,
    }
    rest.post(data,success,error);
}

