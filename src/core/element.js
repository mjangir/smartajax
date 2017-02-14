var Utils           = require('../utils');
var Ajax            = require('./ajax');
var Alert           = require('../components/notifications/alert');
var Toastr          = require('../components/notifications/toastr');
var Loader          = require('../components/loader');
var EventEmitter    = require('eventemitter3');

module.exports = (function () {

    'use strict';

    function _handlerElementAjaxSuccess (saXhr, response) {
        this.emit('sa:on-ajax-success', saXhr, response);
    }

    function _handlerElementAjaxError (saXhr, response) {
        this.emit('sa:on-ajax-error', saXhr, response);
    }

    function _handlerElementAjaxComplete (saXhr, response) {
        this.emit('sa:on-ajax-complete', saXhr, response);
    }

    function _handlerElementAjaxAbort (saXhr, response) {
        this.emit('sa:on-ajax-abort', saXhr, response);
    }

    function _handlerElementAjaxTimeout (saXhr, response) {
        this.emit('sa:on-ajax-timeout', saXhr, response);
    }
    /**
     * Bind XHR events
     *
     * @return {*}
     */
    function _bindXhrEvents () {
        this.ajax.on('onSuccess',    _handlerElementAjaxSuccess, this);
        this.ajax.on('onError',      _handlerElementAjaxError,   this);
        this.ajax.on('onComplete',   _handlerElementAjaxComplete, this);
        this.ajax.on('onAbort',      _handlerElementAjaxAbort, this);
        this.ajax.on('onTimeout',    _handlerElementAjaxTimeout, this);
    }

    function _ajaxBeforeSend (dataToSend) {
        return dataToSend;
    }

    function _ajaxOnSuccess (saXhr, response) {
        console.log(saXhr, response);
    }

    function _ajaxOnError (saXhr, response) {
        console.log(saXhr, response);
    }

    function _ajaxOnComplete (saXhr, response) {
        console.log(saXhr, response);
    }

    function _ajaxOnAbort (saXhr, response) {
        console.log(saXhr, response);
    }

    function _ajaxOnTimeout (saXhr, response) {
        console.log(saXhr, response);
    }

    /**
     * Bind class specific events
     *
     * @return {void}
     */
    function _bindClassEvents () {
        this.on('sa:on-ajax-before', this.options.ajaxBeforeSend, this);
        this.on('sa:on-ajax-success', this.options.ajaxOnSuccess, this);
        this.on('sa:on-ajax-error', this.options.ajaxOnError, this);
        this.on('sa:on-ajax-complete', this.options.ajaxOnComplete, this);
        this.on('sa:on-ajax-abort', this.options.ajaxOnAbort, this);
        this.on('sa:on-ajax-timeout', this.options.ajaxOnTimeout, this);
    }

    /**
     * Bind DOM element events
     * @return {*}
     */
    function _bindElementEvents () {
        var context = this,
            element = this.element;

        function bindTimedAjax () {

            function startTimer () {
                return setTimeout((function(){
                    this.startAjaxRequest();
                }).bind(context), context.options.requestTimeout);
            }

            if (context.options.ajaxDoConfirm !== false &&
                typeof context.options.ajaxDoConfirm === 'string' &&
                confirm(context.options.ajaxDoConfirm)
            ) {
                context.requestTimerId = startTimer();
            } else {
                context.requestTimerId = startTimer();
            }
        }
        function bindIntervalAjax() {

            function startInterval () {
                return setInterval((function(){
                    this.startAjaxRequest();
                }).bind(context), context.options.requestInterval);
            }

            if (context.options.ajaxDoConfirm !== false &&
                typeof context.options.ajaxDoConfirm === 'string' &&
                confirm(context.options.ajaxDoConfirm)
            ) {
                context.requestIntervalId = startInterval();
            } else {
                context.requestIntervalId = startInterval();
            }
        }

        function bindClickAjax() {
            element.addEventListener('click', (function(event) {
                event.preventDefault();
                this.startAjaxRequest();
            }).bind(context), false);
        }

        function bindSubmitAjax() {
            element.addEventListener('submit', (function(event) {
                event.preventDefault();
                this.startAjaxRequest();
            }).bind(context), false);
        }

        // Bind actual events
        if (element.getAttribute('data-sa-request-style') === 'interval') {
            bindTimedAjax();
        } else if (element.getAttribute('data-sa-request-style') === 'timeout') {
            bindIntervalAjax();
        } else if (element.nodeName == 'A' ||
            element.nodeName == 'span' ||
            element.nodeName == 'div' ||
            element.nodeName == 'i'
        ) {
            bindClickAjax();
        } else if (element.nodeName == 'FORM') {
            bindSubmitAjax();
        }
    }

    function _updateElementAttributesToOptions () {
        var attribute,
            element     = this.element,
            camelize    = function(str) {
                str = str.replace('data-sa-','').replace('-',' ');
                return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
                    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
                }).replace(/\s+/g, '');
            };

        for (var i = 0, attrs = element.attributes, n = attrs.length; i < n; i++) {
            attribute = attrs[i];
            if (typeof this.options[camelize(attribute.nodeName)] !== 'undefined') {
                this.options[camelize(attribute.nodeName)] = attribute.nodeValue;
            }
        }
    }

    function _prepareAjaxRequestData () {
        var data;
        data = this.options.ajaxData;
        //data = this.emit('sa:on-ajax-before');
        return data;
    }

    /**
     * Constructor function
     */
    var Element = function (element, options) {

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
            ajaxBeforeSend          : _ajaxBeforeSend,
            ajaxOnSuccess           : _ajaxOnSuccess,
            ajaxOnError             : _ajaxOnError,
            ajaxOnComplete          : _ajaxOnComplete,
            ajaxOnAbort             : _ajaxOnAbort,
            ajaxOnTimeout           : _ajaxOnTimeout,
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

        this.emitter    = new EventEmitter();
        this.element    = element;
        this.options    = (typeof options === 'object') ? Utils.extend(options, defaultOptions) : defaultOptions;
        this.ajax       = new Ajax(this.options);
        this.alert      = Alert;
        this.toastr     = Toastr;
        this.loader     = Loader;

        _bindXhrEvents.call(this);
        _bindClassEvents.call(this);
        _bindElementEvents.call(this);
        _updateElementAttributesToOptions.call(this);
    };

    Element.prototype.startAjaxRequest = function() {
        var data = _prepareAjaxRequestData.call(this);
        this.ajax.doRequest(data);
    }

    Element.prototype.setOptions = function(opts) {
        this.options    = (typeof opts === 'object') ? Utils.extend(opts, this.options) : this.options;
        this.ajax.setOptions(this.options);
        return this;
    }

    /**
     * Bind event to Element
     *
     * @param  {String} event
     * @param  {Function} handler
     * @param  {Object} context
     * @return {void}
     */
    Element.prototype.on = function(event, handler, context) {
        this.emitter.on(event, handler, context || undefined);
    }

    /**
     * Emit events bind to Element
     *
     * @param  {String} event
     * @param  {mixed} a1
     * @param  {mixed} a2
     * @param  {mixed} a3
     * @param  {mixed} a4
     * @param  {mixed} a5
     * @return {*}
     */
    Element.prototype.emit = function(event, a1, a2, a3, a4, a5) {
        return this.emitter.emit(event, a1, a2, a3, a4, a5);
    }

    return Element;
}());