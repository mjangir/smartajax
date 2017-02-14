var Utils           = require('../utils');
var EventEmitter    = require('eventemitter3');

module.exports = (function () {

    'use strict';

    function _createXhr () {
        if(window.XMLHttpRequest === undefined) {
            window.XMLHttpRequest = function() {
                try {
                    this.xhr = new ActiveXObject("Msxml2.XMLHTTP.6.0");
                }
                catch(e1) {
                    try {
                        this.xhr = new ActiveXObject("Mxsml2.XMLHTTP.3.0");
                    }
                    catch(e2) {
                        this.xhr = new Error("Ajax not supported in your browser");
                    }
                }
            };
        }
        else {
            this.xhr = new XMLHttpRequest();
        }
    }

    function _updateXhrOptions () {
        // Setup timeout
        if (this.options.ajaxTimeout) {
            this.xhr.timeout = this.options.ajaxTimeout;
        }
        // Setup readystate change
        this.xhr.onreadystatechange = _readystateChange.bind(this);
    }

    function _setContentType () {
        if (this.options.ajaxContentType) {
            this.xhr.setRequestHeader("Content-Type", this.options.ajaxContentType);
        }
    }

    function _setRequestHeaders () {
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

    function _readystateChange () {
        var xhrResult;

        if (this.xhr.readyState === 4) {
            xhrResult = _parseXhrResponse.call(this);
            if (this.xhr.status >= 200 && this.xhr.status < 300) {
                this.emit('onSuccess', this.xhr, xhrResult);
            } else {
                this.emit('onError', this.xhr, xhrResult);
            }
            this.emit('onComplete', this.xhr, xhrResult);
        }
    }

    function _parseXhrResponse () {
        var result;
        try {
          result = JSON.parse(this.xhr.responseText);
        } catch (e) {
          result = this.xhr.responseText;
        }
        return result;
    }

    /**
     * Constructor function
     */
    var Ajax = function (options) {
        this.options    = options;
        this.xhr        = null;
        this.emitter    = new EventEmitter();

        _createXhr.call(this);
        _updateXhrOptions.call(this);
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
         //Setup content-type
        _setContentType.call(this);
        // Setup headers
        _setRequestHeaders.call(this);
        // Send request
        this.xhr.send(data);
    }

    Ajax.prototype.setOptions = function(opts) {
        this.options = Utils.extend(opts, this.options);
        _updateXhrOptions.call(this);
        return this;
    }

    Ajax.prototype.on = function(event, handler, context) {
        this.emitter.on(event, handler, context || undefined);
    }

    Ajax.prototype.emit = function(event, a1, a2, a3, a4, a5) {
        this.emitter.emit(event, a1, a2, a3, a4, a5);
    }

    return Ajax;
}());