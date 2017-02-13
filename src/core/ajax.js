var Utils = require('../utils');

module.exports = (function () {

    'use strict';

    function _setRequestHeaders () {
        if (this.options.ajaxContentType) {
            this.xhr.setRequestHeader("Content-Type", this.options.ajaxContentType);
        }
        if (typeof this.options.ajaxRequestHeaders === 'object') {
            for (var i in this.options.ajaxRequestHeaders) {
                if (this.options.ajaxRequestHeaders.hasOwnProperty(i)) {
                    var headerName      = i,
                        headerValue     = (typeof this.options.ajaxRequestHeaders[i] === 'string') ? this.options.ajaxRequestHeaders[i] : '';
                    this.xhr.setRequestHeader(headerName, headerValue);
                }
            }
        }
    }
    /**
     * Constructor function
     */
    Ajax = function (options) {
        this.options    = options;

        this.xhr = null;
        if(window.XMLHttpRequest === undefined) {
            window.XMLHttpRequest = function() {
                try {
                    // Use the latest version of the activex object if available
                    this.xhr = new ActiveXObject("Msxml2.XMLHTTP.6.0");
                }
                catch(e1) {
                    try {
                        // Otherwise fall back on an older version
                        this.xhr = new ActiveXObject("Mxsml2.XMLHTTP.3.0");
                    }
                    catch(e2) {
                        //Otherwise, throw an error
                        this.xhr = new Error("Ajax not supported in your browser");
                    }
                }
            };
        }
        else {
            this.xhr = new XMLHttpRequest();
        }
    };

    Ajax.prototype.doRequest = function(data) {
        if (this.options.ajaxUrl === false || typeof this.options.ajaxUrl !== 'string') {
            throw new Error('Invalid Ajax URL');
        }
        this.xhr.open(
            this.options.ajaxMethod,
            this.options.ajaxUrl,
            this.options.ajaxAsync,
            this.options.ajaxUserName,
            this.options.ajaxPassword
        );
        if (this.options.ajaxTimeout) {
            this.xhr.timeout = this.options.ajaxTimeout;
        }
        _setRequestHeaders.call(this);
        this.xhr.send(data);
    }

    Ajax.prototype.setOptions = function(opts) {
        this.options = Utils.extend(opts, this.options);
        return this;
    }

    return Ajax;
}());