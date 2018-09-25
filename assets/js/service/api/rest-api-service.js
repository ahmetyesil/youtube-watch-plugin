RestClient = function (goptions) {
    this.goptions = goptions;

    var constants = {
        dataType: 'json',
        contentType: 'application/json',
        processData: true,
        timeout: 120000,
        synchronous: false,
        errorRedirect: false
    };

    var doAjax = function (method, gopts, opts,success,error) {
        var dt = opts.dataType ? opts.dataType : (gopts.dataType ? gopts.dataType : constants.dataType);


        $.when($.ajax({
            type: method,
            url: gopts.url.lastIndexOf('/') == gopts.url.length - 1 ? gopts.url + opts.path : gopts.url + '/'
                + opts.path,
            headers: opts.headers ? opts.headers : (gopts.headers ? gopts.headers : {}),
            data: opts.model ? /^json/i.test(dt) ? JSON.stringify(opts.model) : opts.model : '',
            dataType: dt,
            contentType: opts.contentType ? opts.contentType : (gopts.contentType ? gopts.contentType
                : constants.contentType),
            processData: opts.processData ? opts.processData : (gopts.processData ? gopts.processData
                : constants.processData),
            timeout: opts.timeout ? opts.timeout : (gopts.timeout ? gopts.timeout : constants.timeout),

            complete: opts.complete ? opts.complete : (gopts.complete ? gopts.complete : function () {
            }),
            async: opts.synchronous ? !opts.synchronous : (gopts.synchronous ? !gopts.synchronous
                : !constants.synchronous)
        })).then(function success(data) {
                success(data);
            },
            function reject(jqxhr, text_status, error_thrown) {
                error(jqxhr);
            },
            function errorHandler(err) {
                error(err);
            }
        )
    };

    this.post = function (opts,success,error) {
        doAjax('POST', this.goptions, opts,success,error);
    };

    this.put = function (opts,success,error) {
        doAjax('PUT', this.goptions, opts,success,error);
    };

    this.get = function (opts,success,error) {
        doAjax('GET', this.goptions, opts,success,error);
    };

    this.remove = function (opts,success,error) {
        doAjax('DELETE', this.goptions, opts,success,error);
    };
};