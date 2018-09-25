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

    var doAjax = function (method, gopts, opts) {
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
                console.log('data',data);
            },
            function reject(jqxhr, text_status, error_thrown) {
                console.log('reject',[jqxhr,text_status,error_thrown]);
            },
            function errorHandler(error) {
                console.log('error',error);
            }
        )
    };

    this.post = function (opts) {
        doAjax('POST', this.goptions, opts);
    };

    this.put = function (opts) {
        doAjax('PUT', this.goptions, opts);
    };

    this.get = function (opts) {
        doAjax('GET', this.goptions, opts);
    };

    this.remove = function (opts) {
        doAjax('DELETE', this.goptions, opts);
    };
};