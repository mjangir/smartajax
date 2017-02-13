var Utils   = require('../utils');
var Ajax    = require('./ajax');
var Alert   = require('../components/notifications/alert');
var Toastr  = require('../components/notifications/toastr');
var Loader  = require('./components/loader');

module.exports = (function () {

    'use strict';

    function _bindElementEvents(element) {
        if (element.nodeName == 'A' ||
            element.nodeName == 'span' ||
            element.nodeName == 'div' ||
            element.nodeName == 'i'
        ) {
            _bindOnClick(element).bind(this);
        } else if (element.nodeName == 'FORM') {
            _bindOnSubmit(element).bind(this);
        } else if (element.getAttribute('data-sa-request-style') === 'interval') {
            _bindStartTimedAjax(element).bind(this);
        } else if (element.getAttribute('data-sa-request-style') === 'timeout') {
            _bindStartIntervalAjax(element).bind(this);
        }
    }

    function _bindOnClick(element) {
        element.addEventListener('click', (function(event) {
            event.preventDefault();
            this.startAjaxRequest();
        }).bind(this), false);
    }

    function _bindOnSubmit(element) {
        element.addEventListener('submit', (function(event) {
            event.preventDefault();
            this.startAjaxRequest();
        }).bind(this), false);
    }

    function _bindStartTimedAjax(element) {
        var context = this;

        if (this.options.ajaxDoConfirm !== false && typeof this.options.ajaxDoConfirm === 'string') {
            this.requestTimerId = startTimer();
        } else {
            this.requestTimerId = startTimer();
        }

        function startTimer () {
            var timer   = setTimeout((function(){
                this.startAjaxRequest();
            }).bind(context), context.options.requestTimeout);
            return timer;
        }
    }

    function _bindStartIntervalAjax(element) {
        var context = this;

        if (this.options.ajaxDoConfirm !== false && typeof this.options.ajaxDoConfirm === 'string') {
            this.requestIntervalId = startInterval();
        } else {
            this.requestIntervalId = startInterval();
        }

        function startInterval () {
            var interval   = setInterval((function(){
                this.startAjaxRequest();
            }).bind(context), context.options.requestInterval);
            return interval;
        }
    }

    /**
     * Constructor function
     */
    Element = function (element, options) {

        var defaultOptions = {
            requestStyle            : 'regular',
            requestTimeout          : 1000,
            requestInterval         : 1000,
            ajaxUrl                 : false,
            ajaxMethod              : 'POST',
            ajaxAsync               : true,
            ajaxUserName            : null,
            ajaxPassword            : null,
            ajaxContentType         : 'application/json',
            ajaxTimeout             : 30000,
            ajaxRequestHeaders      : {'x-request-with': 'smartajax'},
            ajaxData                : {},
            ajaxBeforeSend          : this.ajaxBeforeSend,
            ajaxOnSuccess           : this.ajaxOnSuccess,
            ajaxOnError             : this.ajaxOnError,
            ajaxOnComplete          : this.ajaxOnComplete,
            ajaxOnAbort             : this.ajaxOnAbort,
            ajaxOnTimeout           : this.ajaxOnTimeout,
            ajaxShowLoader          : false,
            ajaxLoaderContainer     : 'body',
            ajaxDoConfirm           : false,
            domReplaceTo            : false,
            domReplaceClosestTo     : false,
            domReplaceInnerTo       : false,
            domReplaceClosestInnerTo: false,
            domAppendTo             : false,
            domPrepandTo            : false,
            domClearTo              : false,
            domClearClosestTo       : false,
            domRemoveTo             : false,
            domRemoveClosestTo      : false,
            notificationType        : 'toastr',
            loaderType              : 'spinner',
            notificationOptions     : {
                toastr : {},
                alert : {}
            },
            loaderOptions           : {}
        };

        this.element    = element;
        this.options    = (typeof options === 'object') ? Utils.extend(options, defaultOptions) : defaultOptions;
        this.ajax       = new Ajax(this.defaultOptions);
        this.alert      = Alert;
        this.toastr     = Toastr;
        this.loader     = Loader;

        _bindElementEvents(element).bind(this);
    };

    this.prototype.startAjaxRequest = function() {
        var data = _prepareAjaxRequestData.call(this);
        this.ajax.doRequest(data);
    }

    this.prototype.ajaxBeforeSend = function() {
        if (this.options.ajaxShowLoader) {
            this.loader.show(this.options.ajaxLoaderContainer);
        }
    }

    this.prototype.ajaxOnSuccess = function() {

    }

    this.prototype.ajaxOnError = function() {

    }

    this.prototype.ajaxOnComplete = function() {

        if (this.options.ajaxShowLoader) {
            this.loader.hide(this.options.ajaxLoaderContainer);
        }
    }

    this.prototype.ajaxOnAbort = function() {

    }

    this.prototype.ajaxOnTimeout = function() {

    }

    this.prototype.setOptions = function(opts) {
        this.options    = (typeof opts === 'object') ? Utils.extend(opts, this.options) : this.options;
        this.ajax.setOptions(this.options);
        return this;
    }

    return Element;
}());