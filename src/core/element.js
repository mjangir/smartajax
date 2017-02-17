/*global
alert, confirm, console, Debug, opera, prompt, WSH, require, module
*/
var Utils           = require('../utils');
var Ajax            = require('./ajax');
var Alert           = require('../components/notifications/alert');
var Toastr          = require('../components/notifications/toastr');
var Loader          = require('../components/loader');
var EventEmitter    = require('eventemitter3');

module.exports = (function () {

    'use strict';

    var resolveFunctionName = function (func) {
            var obj;

            if (typeof func === 'function') {
                return func;
            }
            if (typeof func === 'string') {
                if (func.indexOf('.') <= -1 && typeof window[func] === 'function') {
                    return window[func];
                } else {
                    obj = func.split('.').reduce(function (o, i) {
                        return o[i];
                    }, window);
                    if (typeof obj === 'function') {
                        return obj;
                    }
                }
            }
            return null;
        },

        camelizeNodeName = function (str) {
            str = str.replace('data-sa-', '').replace(/-/g, ' ');
            return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
                return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
            }).replace(/\s+/g, '');
        },

        handlerElementAjaxSuccess = function (saXhr, response) {
            this.emit('sa:on-ajax-success', saXhr, response);
        },

        handlerElementAjaxError = function (saXhr, response) {
            this.emit('sa:on-ajax-error', saXhr, response);
        },

        handlerElementAjaxComplete = function (saXhr, response) {
            this.emit('sa:on-ajax-complete', saXhr, response);
        },

        handlerElementAjaxAbort = function (saXhr, response) {
            this.emit('sa:on-ajax-abort', saXhr, response);
        },

        handlerElementAjaxTimeout = function (saXhr, response) {
            this.emit('sa:on-ajax-timeout', saXhr, response);
        },

        bindXhrEvents = function () {
            this.ajax.on('onSuccess',    handlerElementAjaxSuccess, this);
            this.ajax.on('onError',      handlerElementAjaxError,   this);
            this.ajax.on('onComplete',   handlerElementAjaxComplete, this);
            this.ajax.on('onAbort',      handlerElementAjaxAbort, this);
            this.ajax.on('onTimeout',    handlerElementAjaxTimeout, this);
        },

        ajaxBeforeSend = function (dataToSend) {
            return dataToSend;
        },

        ajaxOnSuccess = function (saXhr, response) {
            console.log("First on success", response);
        },

        ajaxOnError = function (saXhr, response) {
            console.log(saXhr, response);
        },

        ajaxOnComplete = function (saXhr, response) {
            //console.log(saXhr, response);
        },

        ajaxOnAbort = function (saXhr, response) {
            //console.log(saXhr, response);
        },

        ajaxOnTimeout = function (saXhr, response) {
            //console.log(saXhr, response);
        },

        bindClassEvents = function () {
            this.on('sa:on-ajax-before', resolveFunctionName(this.options.ajaxBeforeSend), this);
            this.on('sa:on-ajax-success', resolveFunctionName(this.options.ajaxOnSuccess), this);
            this.on('sa:on-ajax-error', resolveFunctionName(this.options.ajaxOnError), this);
            this.on('sa:on-ajax-complete', resolveFunctionName(this.options.ajaxOnComplete), this);
            this.on('sa:on-ajax-abort', resolveFunctionName(this.options.ajaxOnAbort), this);
            this.on('sa:on-ajax-timeout', resolveFunctionName(this.options.ajaxOnTimeout), this);
        },

        bindElementEvents = function () {
            var context = this,
                element = this.element;

            function bindTimedAjax() {

                function startTimer() {
                    return setTimeout((function () {
                        this.startAjaxRequest();
                    }.bind(context)), context.options.requestTimeout);
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

                function startInterval() {
                    return setInterval((function () {
                        this.startAjaxRequest();
                    }.bind(context)), context.options.requestInterval);
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
                element.addEventListener('click', (function (event) {
                    event.preventDefault();
                    this.startAjaxRequest();
                }.bind(context)), false);
            }

            function bindSubmitAjax() {
                element.addEventListener('submit', (function (event) {
                    event.preventDefault();
                    this.startAjaxRequest();
                }.bind(context)), false);
            }

            // Bind actual events
            if (element.getAttribute('data-sa-request-style') === 'interval') {
                bindTimedAjax();
            } else if (element.getAttribute('data-sa-request-style') === 'timeout') {
                bindIntervalAjax();
            } else if (element.nodeName === 'A' ||
                    element.nodeName === 'span' ||
                    element.nodeName === 'div' ||
                    element.nodeName === 'i'
                    ) {
                bindClickAjax();
            } else if (element.nodeName === 'FORM') {
                bindSubmitAjax();
            }
        },

        updateElementAttributesToOptions = function () {
            var attribute,
                element = this.element,
                attrs   = element.attributes,
                length  = attrs.length,
                i;

            for (i = 0; i < length; i = i + 1) {
                attribute = attrs[i];
                if (typeof this.options[camelizeNodeName(attribute.nodeName)] !== 'undefined') {
                    this.options[camelizeNodeName(attribute.nodeName)] = attribute.nodeValue;
                }
            }
        },

        prepareAjaxRequestData = function () {
            this.emit('sa:on-ajax-before', this.options.ajaxData);
        },

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
                ajaxContentType         : 'application/x-www-form-urlencoded',
                ajaxTimeout             : 30000,
                ajaxRequestHeaders      : {'x-request-with': 'smartajax'},
                ajaxData                : {},
                ajaxBeforeSend          : ajaxBeforeSend,
                ajaxOnSuccess           : ajaxOnSuccess,
                ajaxOnError             : ajaxOnError,
                ajaxOnComplete          : ajaxOnComplete,
                ajaxOnAbort             : ajaxOnAbort,
                ajaxOnTimeout           : ajaxOnTimeout,
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
            this.options    = (typeof options === 'object') ? Utils.extend(defaultOptions, options) : defaultOptions;
            this.ajax       = new Ajax(this.options);
            this.alert      = Alert;
            this.toastr     = Toastr;
            this.loader     = Loader;

            bindXhrEvents.call(this);
            bindClassEvents.call(this);
            bindElementEvents.call(this);
            updateElementAttributesToOptions.call(this);
        };

    Element.prototype.startAjaxRequest = function () {
        var data = prepareAjaxRequestData.call(this);
        this.ajax.doRequest(data);
    };

    Element.prototype.setOptions = function (opts) {
        var element                 = this.element,
            attributes              = element.attributes,
            attrLength              = attributes.length,
            elementAttributeNodes   = [],
            i,
            k;

        if (typeof opts === 'object') {

            for (i = 0; i < attrLength; i = i + 1) {
                elementAttributeNodes.push(camelizeNodeName(attributes[i].nodeName));
            }

            for (k in opts) {
                if (opts.hasOwnProperty(k)) {
                    if (elementAttributeNodes.indexOf(k) > 0) {
                        delete opts[k];
                    }
                }
            }
        }
        this.options = (typeof opts === 'object') ? Utils.extend(this.options, opts) : this.options;
        bindClassEvents.call(this);
        this.ajax.setOptions(this.options);
        return this;
    };

    /**
     * Bind event to Element
     *
     * @param  {String} event
     * @param  {Function} handler
     * @param  {Object} context
     * @return {void}
     */
    Element.prototype.on = function (event, handler, context) {
        this.emitter.on(event, handler, context || undefined);
    };

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
    Element.prototype.emit = function (event, a1, a2, a3, a4, a5) {
        return this.emitter.emit(event, a1, a2, a3, a4, a5);
    };

    return Element;
}());