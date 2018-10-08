

var storage_service = new StorageService();
var routing_service = new RoutingService();
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
 * @param {Session}  The date
 */
function getSessionUrl(success, error) {
    let data = {
        path: ApiUrlsConstant.SESSION + '/google',
    }
    rest.get(data, success, error);
}


/**
 * @param {registerModel} register_model The date
 */
function createSession(success, error) {
    const params = routing_service.parseQuery(window.location.search.substring(1));
    const code = params['code'];
    if (code) {
        const google_session_create_model = new GoogleSessionCreateModel();
        google_session_create_model.code = code;
        let data = {
            path: ApiUrlsConstant.SESSION + '/google',
            model: google_session_create_model,
        }
        rest.post(data, function (response) {
            storage_service.setUserModel(response.data);
            success(response);
        }, function (err) {
            error(err);
        });
    }

}


/**
 * @param {forgotPasswordModel} forgot_password_model The date
 */
function forgotPassword(forgot_password_model, success, error) {

    let data = {
        path: ApiUrlsConstant.FORGOT_PASSWORD,
        model: forgot_password_model,
    }
    rest.post(data, success, error);
}

