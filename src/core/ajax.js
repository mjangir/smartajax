/*global
alert, confirm, console, Debug, opera, prompt, WSH, require, module, ActiveXObject
*/
var Utils           = require('../utils');
var EventEmitter    = require('eventemitter3');

module.exports = (function () {
    
    'use strict';
    
    var parseXhrResponse = function () {
            var result;
            try {
                result = JSON.parse(this.xhr.responseText);
            } catch (e) {
                result = this.xhr.responseText;
            }
            return result;
        },
        
        setupXHR = function () {
            if (window.XMLHttpRequest === undefined) {
                window.XMLHttpRequest = function () {
                    try {
                        this.xhr = new ActiveXObject("Msxml2.XMLHTTP.6.0");
                    } catch (e1) {
                        try {
                            this.xhr = new ActiveXObject("Mxsml2.XMLHTTP.3.0");
                        } catch (e2) {
                            this.xhr = new Error("Ajax not supported in your browser");
                        }
                    }
                };
            } else {
                this.xhr = new XMLHttpRequest();
            }
        },
        
        setContentType = function () {
            if (this.options.ajaxContentType) {
                this.xhr.setRequestHeader("Content-Type", this.options.ajaxContentType);
            }
        },

        setRequestHeaders = function () {
            var i, headerName, headerValue;
            if (typeof this.options.ajaxRequestHeaders === 'object') {
                for (i in this.options.ajaxRequestHeaders) {
                    if (this.options.ajaxRequestHeaders.hasOwnProperty(i)) {
                        headerName      = i;
                        headerValue     = (typeof this.options.ajaxRequestHeaders[i] === 'string') ? this.options.ajaxRequestHeaders[i] : '';
                        this.xhr.setRequestHeader(headerName, headerValue);
                    }
                }
            }
        },

        setupXHROnAbort = function () {
            this.xhr.onabort = function () {
                this.emit('onAbort', this.xhr);
            }.bind(this);
        },

        setupXHROnTimeout = function () {
            if (this.options.ajaxTimeout) {
                this.xhr.timeout = this.options.ajaxTimeout;
            }
            this.xhr.onabort = function () {
                this.emit('onTimeout', this.xhr);
            }.bind(this);
        },
    
        setupOnReadyStateChange = function () {
            var xhrResult;

            if (this.xhr.readyState === 4) {
                xhrResult = parseXhrResponse.call(this);
                if (this.xhr.status >= 200 && this.xhr.status < 300) {
                    this.emit('onSuccess', this.xhr, xhrResult);
                } else {
                    this.emit('onError', this.xhr, xhrResult);
                }
                this.emit('onComplete', this.xhr, xhrResult);
            }
        },

        setupXHRReadyState = function () {
            this.xhr.onreadystatechange = setupOnReadyStateChange.bind(this);
        },

        updateXHROptions = function () {
            setupXHROnAbort.call(this);
            setupXHROnTimeout.call(this);
            setupXHRReadyState.call(this);
        },
        
        Ajax = function (options) {
            this.options    = options;
            this.xhr        = null;
            this.emitter    = new EventEmitter();

            setupXHR.call(this);
            updateXHROptions.call(this);
        };

    Ajax.prototype.doRequest = function (data) {
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
        setContentType.call(this);
        setRequestHeaders.call(this);
        this.xhr.send(data);
    };

    Ajax.prototype.setOptions = function (opts) {
        this.options = Utils.extend(this.options, opts);
        updateXHROptions.call(this);
        return this;
    };

    Ajax.prototype.on = function (event, handler, context) {
        this.emitter.on(event, handler, context || undefined);
    };

    Ajax.prototype.emit = function (event, a1, a2, a3, a4, a5) {
        this.emitter.emit(event, a1, a2, a3, a4, a5);
    };

    return Ajax;
}());