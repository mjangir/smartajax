(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jQuery"));
	else if(typeof define === 'function' && define.amd)
		define("Smartajax", ["jQuery"], factory);
	else if(typeof exports === 'object')
		exports["Smartajax"] = factory(require("jQuery"));
	else
		root["Smartajax"] = factory(root["jQuery"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	(function (root, factory) {
	  if (( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined') {
	    module.exports = factory(__webpack_require__(1), __webpack_require__(2), __webpack_require__(6), __webpack_require__(12), __webpack_require__(16), __webpack_require__(15), global || root);
	  } else {
	    root.Smartajax = factory(root.jQuery, root.bootstrap, root.toastr, root.alert, root);
	  }
	})(typeof window !== 'undefined' ? window : undefined, function (jQuery, Element, AlertNotification, ToastrNotification, styles, Loader, root) {
	
	  var _classCallCheck = function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	      throw new TypeError('Cannot call a class as a function');
	    }
	  };
	
	  var operationErrors = {
	    invalidArgument: 'Invald Argument Exception',
	    argumentRequiresArray: 'Argument Must Be An Array'
	  };
	
	  var _elementInArray = function _elementInArray(element, array) {
	    var i;
	
	    for (i in array) {
	      if (array[i].is(element)) {
	        return i;
	      }
	    }
	    return -1;
	  };
	
	  var _getSingleElement = function _getSingleElement(item) {
	    if (!(item instanceof jQuery) && typeof item !== 'string') {
	      throw new Error(operationErrors.invalidArgument);
	    }
	    if (typeof item === 'string') {
	      item = jQuery(item).eq(0);
	    } else {
	      item = item.eq(0);
	    }
	    return item;
	  };
	
	  var _getMultipleElements = function _getMultipleElements(items) {
	    if (!(items instanceof jQuery) && typeof items !== 'string') {
	      throw new Error(operationErrors.invalidArgument);
	    }
	    if (typeof items === 'string') {
	      items = jQuery(items);
	    }
	    return items;
	  };
	
	  var _attachEventHandlers = function _attachEventHandlers() {};
	
	  var _dettachEventHandlers = function _dettachEventHandlers() {};
	
	  // var EventHandlers = {
	  //   _click: function () {
	
	  //   },
	  //   _submit: function () {
	
	  //   },
	  //   _timeout: function () {
	
	  //   },
	  //   _interval: function () {
	
	  //   }
	  // };
	
	  var createModal = function createModal() {
	    var modal = '<div id="smartajax-modal" class="modal fade" tabindex="-1">';
	
	    modal += '<div class="modal-dialog modal-lg">';
	    modal += '<div class="modal-content">';
	    modal += '</div>';
	    modal += '</div>';
	    modal += '</div>';
	    return modal;
	  };
	
	  var backgroundInit = function backgroundInit() {
	    document.body.innerHTML += createModal();
	  };
	
	  var Smartajax = function Smartajax(elements, options) {
	    _classCallCheck(this, Smartajax);
	    if (typeof elements === 'undefined') {}
	    this.itemSet = [];
	    this.options = {
	      show: false
	    };
	
	    // this.init();
	  };
	
	  // Smartajax Prototypes
	
	  /**
	   * Add Item To Instance
	   *
	   * @param {Element|String} item Either jQuery dom object or selector string
	   * @return {Smartajax}
	   */
	  Smartajax.prototype.addItem = function (item) {
	    item = _getSingleElement(item);
	    if (item.length > 0) {
	      if (_elementInArray(item, this.itemSet) <= -1) {
	        this.itemSet.push(item);
	      }
	      item.data('smartajax', this);
	      _attachEventHandlers(item);
	    }
	  };
	
	  /**
	   * Remove Item From Instance
	   *
	   * @param {Element} item jQuery dom object
	   * @return {Smartajax}
	   */
	  Smartajax.prototype.removeItem = function (item) {
	    item = _getSingleElement(item);
	    if (item.length > 0) {
	      if (typeof item.data('smartajax') !== 'undefined') {
	        if (_elementInArray(item, this.itemSet) > -1) {
	          this.itemSet.splice(_elementInArray(item, this.itemSet), 1);
	        }
	        item.removeData('smartajax');
	        _dettachEventHandlers(item);
	      }
	    }
	  };
	
	  /**
	   * Add Items To Instance
	   *
	   * @param {Array} Array of jQuery elements or selector strings
	   * @return {Smartajax}
	   */
	  Smartajax.prototype.addItems = function (items) {
	    var context = this,
	        i,
	        originalItems;
	
	    if (!Array.isArray(items) || items.length <= 0) {
	      throw new Error(operationErrors.argumentRequiresArray);
	    }
	    for (i = 0; i < items.length; i++) {
	      originalItems = _getMultipleElements(items[i]);
	      if (originalItems.length > 0) {
	        originalItems.each(function () {
	          if (_elementInArray(jQuery(this), context.itemSet) <= -1) {
	            context.itemSet.push(jQuery(this));
	          }
	          jQuery(this).data('smartajax', context);
	          _attachEventHandlers(jQuery(this));
	        });
	      }
	    }
	  };
	
	  /**
	   * Remove Items From Instance
	   *
	   * @param {Array} Array of jQuery elements or selector strings
	   * @return {Smartajax}
	   */
	  Smartajax.prototype.removeItems = function (items) {
	    var i,
	        originalItems,
	        context = this;
	
	    if (!Array.isArray(items) || items.length <= 0) {
	      throw new Error(operationErrors.argumentRequiresArray);
	    }
	    for (i = 0; i < items.length; i++) {
	      originalItems = _getMultipleElements(items[i]);
	      if (originalItems.length > 0) {
	        originalItems.each(function () {
	
	          if (typeof jQuery(this).data('smartajax') !== 'undefined') {
	            if (_elementInArray(jQuery(this), context.itemSet) > -1) {
	              context.itemSet.splice(_elementInArray(jQuery(this), context.itemSet), 1);
	            }
	            jQuery(this).removeData('smartajax');
	            _dettachEventHandlers(jQuery(this));
	          }
	        });
	      }
	    }
	  };
	
	  Smartajax.prototype.getItems = function () {
	    return this.itemSet;
	  };
	
	  backgroundInit();
	  ToastrNotification.setOptions({
	    closeButton: true,
	    progressBar: true,
	    preventDuplicates: false,
	    autoHide: true,
	    closeOnHover: false
	  });
	  ToastrNotification.success('Success', 'Department added successfully');
	  ToastrNotification.error('Oops', 'There went something wrong');
	  ToastrNotification.info('Information', 'This is important information');
	  ToastrNotification.warning('Warning', 'You cannot delete system defined users');
	  ToastrNotification.warning('Warning', 'You cannot delete system defined users');
	  //   alert.options = {
	  //   "closeButton": true,
	  //   "debug": true,
	  //   "newestOnTop": true,
	  //   "progressBar": true,
	  //   "positionClass": "toast-top-right",
	  //   "preventDuplicates": false,
	  //   "onclick": null,
	  //   "showDuration": "300",
	  //   "hideDuration": "1000",
	  //   "timeOut": "10000",
	  //   "extendedTimeOut": "10000",
	  //   "showEasing": "swing",
	  //   "autoHide": false,
	  //   "hideEasing": "linear",
	  //   "showMethod": "fadeIn",
	  //   "hideMethod": "fadeOut"
	  // }
	  //   alert.info('Are you the 6 fingered man?', 'Hello this is info message');
	  //     alert.success('Are you the 6 fingered man?', 'Hello this is info message');
	  //       alert.warning('Are you the 6 fingered man?', 'Hello this is info message');
	  //         alert.error('Are you the 6 fingered man?', 'Hello this is info message');
	  Loader.show(document.getElementById('overlaydiv'));
	  setTimeout(function () {
	    Loader.hide('#overlaydiv');
	  }, 5000);
	
	  var firstElement = new Element(document.getElementById('firstLink'));
	  Smartajax.testElement = firstElement;
	  return Smartajax;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var Utils = __webpack_require__(3);
	var Ajax = __webpack_require__(4);
	var Alert = __webpack_require__(6);
	var Toastr = __webpack_require__(12);
	var Loader = __webpack_require__(15);
	var EventEmitter = __webpack_require__(5);
	
	module.exports = function () {
	
	    'use strict';
	
	    function _handlerElementAjaxSuccess(saXhr, response) {
	        this.emit('sa:on-ajax-success', saXhr, response);
	    }
	
	    function _handlerElementAjaxError(saXhr, response) {
	        this.emit('sa:on-ajax-error', saXhr, response);
	    }
	
	    function _handlerElementAjaxComplete(saXhr, response) {
	        this.emit('sa:on-ajax-complete', saXhr, response);
	    }
	
	    function _handlerElementAjaxAbort(saXhr, response) {
	        this.emit('sa:on-ajax-abort', saXhr, response);
	    }
	
	    function _handlerElementAjaxTimeout(saXhr, response) {
	        this.emit('sa:on-ajax-timeout', saXhr, response);
	    }
	    /**
	     * Bind XHR events
	     *
	     * @return {*}
	     */
	    function _bindXhrEvents() {
	        this.ajax.on('onSuccess', _handlerElementAjaxSuccess, this);
	        this.ajax.on('onError', _handlerElementAjaxError, this);
	        this.ajax.on('onComplete', _handlerElementAjaxComplete, this);
	        this.ajax.on('onAbort', _handlerElementAjaxAbort, this);
	        this.ajax.on('onTimeout', _handlerElementAjaxTimeout, this);
	    }
	
	    function _ajaxBeforeSend(dataToSend) {
	        return dataToSend;
	    }
	
	    function _ajaxOnSuccess(saXhr, response) {
	        console.log(saXhr, response);
	    }
	
	    function _ajaxOnError(saXhr, response) {
	        console.log(saXhr, response);
	    }
	
	    function _ajaxOnComplete(saXhr, response) {
	        console.log(saXhr, response);
	    }
	
	    function _ajaxOnAbort(saXhr, response) {
	        console.log(saXhr, response);
	    }
	
	    function _ajaxOnTimeout(saXhr, response) {
	        console.log(saXhr, response);
	    }
	
	    /**
	     * Bind class specific events
	     *
	     * @return {void}
	     */
	    function _bindClassEvents() {
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
	    function _bindElementEvents() {
	        var context = this,
	            element = this.element;
	
	        function bindTimedAjax() {
	
	            function startTimer() {
	                return setTimeout(function () {
	                    this.startAjaxRequest();
	                }.bind(context), context.options.requestTimeout);
	            }
	
	            if (context.options.ajaxDoConfirm !== false && typeof context.options.ajaxDoConfirm === 'string' && confirm(context.options.ajaxDoConfirm)) {
	                context.requestTimerId = startTimer();
	            } else {
	                context.requestTimerId = startTimer();
	            }
	        }
	        function bindIntervalAjax() {
	
	            function startInterval() {
	                return setInterval(function () {
	                    this.startAjaxRequest();
	                }.bind(context), context.options.requestInterval);
	            }
	
	            if (context.options.ajaxDoConfirm !== false && typeof context.options.ajaxDoConfirm === 'string' && confirm(context.options.ajaxDoConfirm)) {
	                context.requestIntervalId = startInterval();
	            } else {
	                context.requestIntervalId = startInterval();
	            }
	        }
	
	        function bindClickAjax() {
	            element.addEventListener('click', function (event) {
	                event.preventDefault();
	                this.startAjaxRequest();
	            }.bind(context), false);
	        }
	
	        function bindSubmitAjax() {
	            element.addEventListener('submit', function (event) {
	                event.preventDefault();
	                this.startAjaxRequest();
	            }.bind(context), false);
	        }
	
	        // Bind actual events
	        if (element.getAttribute('data-sa-request-style') === 'interval') {
	            bindTimedAjax();
	        } else if (element.getAttribute('data-sa-request-style') === 'timeout') {
	            bindIntervalAjax();
	        } else if (element.nodeName == 'A' || element.nodeName == 'span' || element.nodeName == 'div' || element.nodeName == 'i') {
	            bindClickAjax();
	        } else if (element.nodeName == 'FORM') {
	            bindSubmitAjax();
	        }
	    }
	
	    function _updateElementAttributesToOptions() {
	        var attribute,
	            element = this.element,
	            camelize = function camelize(str) {
	            str = str.replace('data-sa-', '').replace('-', ' ');
	            return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
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
	
	    function _prepareAjaxRequestData() {
	        var data;
	        data = this.options.ajaxData;
	        //data = this.emit('sa:on-ajax-before');
	        return data;
	    }
	
	    /**
	     * Constructor function
	     */
	    var Element = function Element(element, options) {
	
	        var defaultOptions = {
	            requestStyle: 'regular',
	            requestTimeout: 1000,
	            requestInterval: 1000,
	            ajaxUrl: false,
	            ajaxMethod: 'POST',
	            ajaxAsync: true,
	            ajaxUserName: null,
	            ajaxPassword: null,
	            ajaxContentType: 'application/json',
	            ajaxTimeout: 30000,
	            ajaxRequestHeaders: { 'x-request-with': 'smartajax' },
	            ajaxData: {},
	            ajaxBeforeSend: _ajaxBeforeSend,
	            ajaxOnSuccess: _ajaxOnSuccess,
	            ajaxOnError: _ajaxOnError,
	            ajaxOnComplete: _ajaxOnComplete,
	            ajaxOnAbort: _ajaxOnAbort,
	            ajaxOnTimeout: _ajaxOnTimeout,
	            ajaxShowLoader: false,
	            ajaxLoaderContainer: 'body',
	            ajaxDoConfirm: false,
	            domReplaceTo: false,
	            domReplaceClosestTo: false,
	            domReplaceInnerTo: false,
	            domReplaceClosestInnerTo: false,
	            domAppendTo: false,
	            domPrepandTo: false,
	            domClearTo: false,
	            domClearClosestTo: false,
	            domRemoveTo: false,
	            domRemoveClosestTo: false,
	            notificationType: 'toastr',
	            loaderType: 'spinner',
	            notificationOptions: {
	                toastr: {},
	                alert: {}
	            },
	            loaderOptions: {}
	        };
	
	        this.emitter = new EventEmitter();
	        this.element = element;
	        this.options = (typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' ? Utils.extend(options, defaultOptions) : defaultOptions;
	        this.ajax = new Ajax(this.options);
	        this.alert = Alert;
	        this.toastr = Toastr;
	        this.loader = Loader;
	
	        _bindXhrEvents.call(this);
	        _bindClassEvents.call(this);
	        _bindElementEvents.call(this);
	        _updateElementAttributesToOptions.call(this);
	    };
	
	    Element.prototype.startAjaxRequest = function () {
	        var data = _prepareAjaxRequestData.call(this);
	        this.ajax.doRequest(data);
	    };
	
	    Element.prototype.setOptions = function (opts) {
	        this.options = (typeof opts === 'undefined' ? 'undefined' : _typeof(opts)) === 'object' ? Utils.extend(opts, this.options) : this.options;
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
	}();

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	var utils = {
	    getOffsetRelativeToDocument: function getOffsetRelativeToDocument(element) {
	        var rect = element.getBoundingClientRect(),
	            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
	            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	        return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
	    },
	    addClass: function addClass(element, classes) {
	        if (typeof classes === 'undefined' || classes === null || classes === '' || !classes) {
	            return;
	        }
	        var classList = classes.indexOf(' ') > -1 ? classes.split(' ') : classes;
	        if (Array.isArray(classList)) {
	            for (var i = 0; i < classList.length; i++) {
	                element.classList.add(classList[i]);
	            }
	        } else {
	            element.classList.add(classList);
	        }
	        return element;
	    },
	    escapeHtml: function escapeHtml(source) {
	        if (source == null) {
	            source = '';
	        }
	
	        return source.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	    },
	    stringToHtmlElement: function stringToHtmlElement(html) {
	        var frame = document.createElement('iframe');
	        frame.style.display = 'none';
	        document.body.appendChild(frame);
	        frame.contentDocument.open();
	        frame.contentDocument.write(html);
	        frame.contentDocument.close();
	        var el = frame.contentDocument.body.firstChild;
	        document.body.removeChild(frame);
	        return el;
	    },
	    extend: function extend(defaults, options) {
	        var extended = {};
	        var prop;
	        for (prop in defaults) {
	            if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
	                extended[prop] = defaults[prop];
	            }
	        }
	        for (prop in options) {
	            if (Object.prototype.hasOwnProperty.call(options, prop)) {
	                extended[prop] = options[prop];
	            }
	        }
	        return extended;
	    },
	
	    isElementVisible: function isElementVisible(el) {
	        var style = window.getComputedStyle(el);
	        return style.display === 'none' || style.visibility == 'hidden';
	    },
	
	    design: {
	        easing: {
	            linear: function linear(progress) {
	                return progress;
	            },
	            quadratic: function quadratic(progress) {
	                return Math.pow(progress, 2);
	            },
	            swing: function swing(progress) {
	                return 0.5 - Math.cos(progress * Math.PI) / 2;
	            },
	            circ: function circ(progress) {
	                return 1 - Math.sin(Math.acos(progress));
	            },
	            back: function back(progress, x) {
	                return Math.pow(progress, 2) * ((x + 1) * progress - x);
	            },
	            bounce: function bounce(progress) {
	                for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
	                    if (progress >= (7 - 4 * a) / 11) {
	                        return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
	                    }
	                }
	            },
	            elastic: function elastic(progress, x) {
	                return Math.pow(2, 10 * (progress - 1)) * Math.cos(20 * Math.PI * x / 3 * progress);
	            }
	        },
	        animate: function animate(options) {
	            var start = new Date();
	            var id = setInterval(function () {
	                var timePassed = new Date() - start;
	                var progress = timePassed / options.duration;
	                if (progress > 1) {
	                    progress = 1;
	                }
	                options.progress = progress;
	                var delta = options.delta(progress);
	                options.step(delta);
	                if (progress == 1) {
	                    clearInterval(id);
	                    if (typeof options.complete === 'function') {
	                        options.complete();
	                    }
	                }
	            }, options.delay || 10);
	            return id;
	        },
	        fadeOut: function fadeOut(element, options) {
	            var to = 1;
	            var easing = options.easing || 'swing';
	            return this.animate({
	                duration: options.duration,
	                delta: function delta(progress) {
	                    progress = this.progress;
	                    return utils.design.easing[easing](progress);
	                },
	                complete: options.complete,
	                step: function step(delta) {
	                    element.style.opacity = to - delta;
	                }
	            });
	        },
	        fadeIn: function fadeIn(element, options) {
	            var to = 0;
	            var easing = options.easing || 'swing';
	            return this.animate({
	                duration: options.duration,
	                delta: function delta(progress) {
	                    progress = this.progress;
	                    return utils.design.easing[easing](progress);
	                },
	                complete: options.complete,
	                step: function step(delta) {
	                    element.style.opacity = to + delta;
	                }
	            });
	        }
	    }
	};
	
	module.exports = utils;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var Utils = __webpack_require__(3);
	var EventEmitter = __webpack_require__(5);
	
	module.exports = function () {
	
	    'use strict';
	
	    function _createXhr() {
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
	    }
	
	    function _updateXhrOptions() {
	        // Setup timeout
	        if (this.options.ajaxTimeout) {
	            this.xhr.timeout = this.options.ajaxTimeout;
	        }
	        // Setup readystate change
	        this.xhr.onreadystatechange = _readystateChange.bind(this);
	    }
	
	    function _setContentType() {
	        if (this.options.ajaxContentType) {
	            this.xhr.setRequestHeader("Content-Type", this.options.ajaxContentType);
	        }
	    }
	
	    function _setRequestHeaders() {
	        if (_typeof(this.options.ajaxRequestHeaders) === 'object') {
	            for (var i in this.options.ajaxRequestHeaders) {
	                if (this.options.ajaxRequestHeaders.hasOwnProperty(i)) {
	                    var headerName = i,
	                        headerValue = typeof this.options.ajaxRequestHeaders[i] === 'string' ? this.options.ajaxRequestHeaders[i] : '';
	                    this.xhr.setRequestHeader(headerName, headerValue);
	                }
	            }
	        }
	    }
	
	    function _readystateChange() {
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
	
	    function _parseXhrResponse() {
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
	    var Ajax = function Ajax(options) {
	        this.options = options;
	        this.xhr = null;
	        this.emitter = new EventEmitter();
	
	        _createXhr.call(this);
	        _updateXhrOptions.call(this);
	    };
	
	    Ajax.prototype.doRequest = function (data) {
	        if (this.options.ajaxUrl === false || typeof this.options.ajaxUrl !== 'string') {
	            throw new Error('Invalid Ajax URL');
	        }
	        this.xhr.open(this.options.ajaxMethod, this.options.ajaxUrl, this.options.ajaxAsync, this.options.ajaxUserName, this.options.ajaxPassword);
	        //Setup content-type
	        _setContentType.call(this);
	        // Setup headers
	        _setRequestHeaders.call(this);
	        // Send request
	        this.xhr.send(data);
	    };
	
	    Ajax.prototype.setOptions = function (opts) {
	        this.options = Utils.extend(opts, this.options);
	        _updateXhrOptions.call(this);
	        return this;
	    };
	
	    Ajax.prototype.on = function (event, handler, context) {
	        this.emitter.on(event, handler, context || undefined);
	    };
	
	    Ajax.prototype.emit = function (event, a1, a2, a3, a4, a5) {
	        this.emitter.emit(event, a1, a2, a3, a4, a5);
	    };
	
	    return Ajax;
	}();

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var has = Object.prototype.hasOwnProperty
	  , prefix = '~';
	
	/**
	 * Constructor to create a storage for our `EE` objects.
	 * An `Events` instance is a plain object whose properties are event names.
	 *
	 * @constructor
	 * @api private
	 */
	function Events() {}
	
	//
	// We try to not inherit from `Object.prototype`. In some engines creating an
	// instance in this way is faster than calling `Object.create(null)` directly.
	// If `Object.create(null)` is not supported we prefix the event names with a
	// character to make sure that the built-in object properties are not
	// overridden or used as an attack vector.
	//
	if (Object.create) {
	  Events.prototype = Object.create(null);
	
	  //
	  // This hack is needed because the `__proto__` property is still inherited in
	  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
	  //
	  if (!new Events().__proto__) prefix = false;
	}
	
	/**
	 * Representation of a single event listener.
	 *
	 * @param {Function} fn The listener function.
	 * @param {Mixed} context The context to invoke the listener with.
	 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
	 * @constructor
	 * @api private
	 */
	function EE(fn, context, once) {
	  this.fn = fn;
	  this.context = context;
	  this.once = once || false;
	}
	
	/**
	 * Minimal `EventEmitter` interface that is molded against the Node.js
	 * `EventEmitter` interface.
	 *
	 * @constructor
	 * @api public
	 */
	function EventEmitter() {
	  this._events = new Events();
	  this._eventsCount = 0;
	}
	
	/**
	 * Return an array listing the events for which the emitter has registered
	 * listeners.
	 *
	 * @returns {Array}
	 * @api public
	 */
	EventEmitter.prototype.eventNames = function eventNames() {
	  var names = []
	    , events
	    , name;
	
	  if (this._eventsCount === 0) return names;
	
	  for (name in (events = this._events)) {
	    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
	  }
	
	  if (Object.getOwnPropertySymbols) {
	    return names.concat(Object.getOwnPropertySymbols(events));
	  }
	
	  return names;
	};
	
	/**
	 * Return the listeners registered for a given event.
	 *
	 * @param {String|Symbol} event The event name.
	 * @param {Boolean} exists Only check if there are listeners.
	 * @returns {Array|Boolean}
	 * @api public
	 */
	EventEmitter.prototype.listeners = function listeners(event, exists) {
	  var evt = prefix ? prefix + event : event
	    , available = this._events[evt];
	
	  if (exists) return !!available;
	  if (!available) return [];
	  if (available.fn) return [available.fn];
	
	  for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
	    ee[i] = available[i].fn;
	  }
	
	  return ee;
	};
	
	/**
	 * Calls each of the listeners registered for a given event.
	 *
	 * @param {String|Symbol} event The event name.
	 * @returns {Boolean} `true` if the event had listeners, else `false`.
	 * @api public
	 */
	EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
	  var evt = prefix ? prefix + event : event;
	
	  if (!this._events[evt]) return false;
	
	  var listeners = this._events[evt]
	    , len = arguments.length
	    , args
	    , i;
	
	  if (listeners.fn) {
	    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);
	
	    switch (len) {
	      case 1: return listeners.fn.call(listeners.context), true;
	      case 2: return listeners.fn.call(listeners.context, a1), true;
	      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
	      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
	      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
	      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
	    }
	
	    for (i = 1, args = new Array(len -1); i < len; i++) {
	      args[i - 1] = arguments[i];
	    }
	
	    listeners.fn.apply(listeners.context, args);
	  } else {
	    var length = listeners.length
	      , j;
	
	    for (i = 0; i < length; i++) {
	      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);
	
	      switch (len) {
	        case 1: listeners[i].fn.call(listeners[i].context); break;
	        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
	        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
	        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
	        default:
	          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
	            args[j - 1] = arguments[j];
	          }
	
	          listeners[i].fn.apply(listeners[i].context, args);
	      }
	    }
	  }
	
	  return true;
	};
	
	/**
	 * Add a listener for a given event.
	 *
	 * @param {String|Symbol} event The event name.
	 * @param {Function} fn The listener function.
	 * @param {Mixed} [context=this] The context to invoke the listener with.
	 * @returns {EventEmitter} `this`.
	 * @api public
	 */
	EventEmitter.prototype.on = function on(event, fn, context) {
	  var listener = new EE(fn, context || this)
	    , evt = prefix ? prefix + event : event;
	
	  if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++;
	  else if (!this._events[evt].fn) this._events[evt].push(listener);
	  else this._events[evt] = [this._events[evt], listener];
	
	  return this;
	};
	
	/**
	 * Add a one-time listener for a given event.
	 *
	 * @param {String|Symbol} event The event name.
	 * @param {Function} fn The listener function.
	 * @param {Mixed} [context=this] The context to invoke the listener with.
	 * @returns {EventEmitter} `this`.
	 * @api public
	 */
	EventEmitter.prototype.once = function once(event, fn, context) {
	  var listener = new EE(fn, context || this, true)
	    , evt = prefix ? prefix + event : event;
	
	  if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++;
	  else if (!this._events[evt].fn) this._events[evt].push(listener);
	  else this._events[evt] = [this._events[evt], listener];
	
	  return this;
	};
	
	/**
	 * Remove the listeners of a given event.
	 *
	 * @param {String|Symbol} event The event name.
	 * @param {Function} fn Only remove the listeners that match this function.
	 * @param {Mixed} context Only remove the listeners that have this context.
	 * @param {Boolean} once Only remove one-time listeners.
	 * @returns {EventEmitter} `this`.
	 * @api public
	 */
	EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
	  var evt = prefix ? prefix + event : event;
	
	  if (!this._events[evt]) return this;
	  if (!fn) {
	    if (--this._eventsCount === 0) this._events = new Events();
	    else delete this._events[evt];
	    return this;
	  }
	
	  var listeners = this._events[evt];
	
	  if (listeners.fn) {
	    if (
	         listeners.fn === fn
	      && (!once || listeners.once)
	      && (!context || listeners.context === context)
	    ) {
	      if (--this._eventsCount === 0) this._events = new Events();
	      else delete this._events[evt];
	    }
	  } else {
	    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
	      if (
	           listeners[i].fn !== fn
	        || (once && !listeners[i].once)
	        || (context && listeners[i].context !== context)
	      ) {
	        events.push(listeners[i]);
	      }
	    }
	
	    //
	    // Reset the array, or remove it completely if we have no more listeners.
	    //
	    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
	    else if (--this._eventsCount === 0) this._events = new Events();
	    else delete this._events[evt];
	  }
	
	  return this;
	};
	
	/**
	 * Remove all listeners, or those of the specified event.
	 *
	 * @param {String|Symbol} [event] The event name.
	 * @returns {EventEmitter} `this`.
	 * @api public
	 */
	EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
	  var evt;
	
	  if (event) {
	    evt = prefix ? prefix + event : event;
	    if (this._events[evt]) {
	      if (--this._eventsCount === 0) this._events = new Events();
	      else delete this._events[evt];
	    }
	  } else {
	    this._events = new Events();
	    this._eventsCount = 0;
	  }
	
	  return this;
	};
	
	//
	// Alias methods names because people roll like that.
	//
	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
	EventEmitter.prototype.addListener = EventEmitter.prototype.on;
	
	//
	// This function doesn't apply anymore.
	//
	EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
	  return this;
	};
	
	//
	// Expose the prefix.
	//
	EventEmitter.prefixed = prefix;
	
	//
	// Allow `EventEmitter` to be imported as module namespace.
	//
	EventEmitter.EventEmitter = EventEmitter;
	
	//
	// Expose the module.
	//
	if (true) {
	  module.exports = EventEmitter;
	}


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(3);
	var baseNotification = __webpack_require__(7);
	var style = __webpack_require__(8);
	
	module.exports = function () {
	
	    'use strict';
	
	    var AlertClass = function () {
	
	        var instance = null,
	            defaultOptions = {
	            target: 'body',
	            containerId: 'sa-alert-container',
	            containerClass: 'alert',
	            notificationClass: 'alert',
	            titleClass: '',
	            messageClass: '',
	            closeClass: 'close',
	            rightAlign: false,
	            iconClasses: {
	                error: 'alert-danger',
	                info: 'alert-info',
	                success: 'alert-success',
	                warning: 'alert-warning'
	            }
	        };
	
	        /**
	         * Constructor function
	         */
	        function AlertNotification() {}
	
	        AlertNotification.prototype = Object.create(baseNotification.prototype);
	
	        AlertNotification.prototype.constructor = AlertNotification;
	
	        /**
	         * Get default options
	         * 
	         * @returns {object} Default options
	         */
	        AlertNotification.prototype.getDefaults = function () {
	            return defaultOptions;
	        };
	
	        /**
	         * Create notification element
	         * 
	         * @param   {object} map       
	         * @param   {object} container 
	         * @returns {object} 
	         */
	        AlertNotification.prototype.personalize = function (map, container) {
	            var alertElement = document.createElement('div'),
	                titleElement = document.createElement('strong'),
	                messageElement = document.createElement('span'),
	                closeElement = utils.stringToHtmlElement('<a href="javascript:void(0);" title="close">&times;</a>'),
	                options = this.getOptions(),
	                title = map.title || false,
	                message = map.message || false;
	
	            if (map.iconClass) {
	                utils.addClass(alertElement, options.notificationClass);
	                utils.addClass(alertElement, map.iconClass);
	            }
	
	            if (title) {
	                if (options.escapeHtml) {
	                    title = utils.escapeHtml(title);
	                }
	                utils.addClass(titleElement, options.titleClass);
	                titleElement.insertAdjacentHTML('beforeend', title);
	                alertElement.appendChild(titleElement);
	            }
	
	            if (message) {
	                if (options.escapeHtml) {
	                    message = utils.escapeHtml(message);
	                }
	                utils.addClass(messageElement, options.messageClass);
	                messageElement.insertAdjacentHTML('beforeend', message);
	                alertElement.appendChild(messageElement);
	            }
	
	            if (options.closeButton) {
	                utils.addClass(closeElement, options.closeClass);
	                alertElement.insertBefore(closeElement, alertElement.firstChild);
	            }
	
	            if (options.newestOnTop) {
	                container.insertBefore(alertElement, container.firstChild);
	            } else {
	                container.appendChild(alertElement);
	            }
	
	            return {
	                notificationElement: alertElement,
	                closeElement: closeElement
	            };
	        };
	
	        return {
	            getInstance: function getInstance() {
	                if (instance === null) {
	                    instance = new AlertNotification();
	                    instance.constructor = null;
	                }
	                return instance;
	            }
	        };
	    }();
	
	    return AlertClass.getInstance();
	}();

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(3);
	
	module.exports = function () {
	
	    'use strict';
	
	    var Notification,
	        container,
	        listener,
	        options = {},
	        previousNotification,
	        notificationId = 0,
	        notificationType = {
	        error: 'error',
	        info: 'info',
	        success: 'success',
	        warning: 'warning'
	    },
	        globalOptions = {
	        tapToDismiss: true,
	        debug: false,
	
	        showMethod: 'fadeIn',
	        showDuration: 1000,
	        showEasing: 'swing',
	        onShown: undefined,
	
	        hideMethod: 'fadeOut',
	        hideDuration: 1000,
	        hideEasing: 'swing',
	        onHidden: undefined,
	
	        closeMethod: 'fadeOut',
	        closeDuration: 1000,
	        closeEasing: 'swing',
	        onCloseClick: undefined,
	
	        autoHide: true,
	        closeOnHover: true,
	        hideTimeout: 5000,
	        escapeHtml: true,
	        newestOnTop: true,
	        preventDuplicates: true
	    };
	
	    /**
	     * Notify browser
	     *
	     * @param   {object}  map
	     * @returns {boolean}
	     */
	    function notify(map) {
	        var domElements,
	            notificationElement,
	            closeElement,
	            progressElement,
	            options = this.getOptions(),
	            intervalId = null,
	            iconClass = map.iconClass || options.iconClass,
	            response = {
	            notificationId: notificationId,
	            state: 'visible',
	            startTime: new Date(),
	            options: options,
	            map: map
	        },
	            progressBar = {
	            intervalId: null,
	            hideEta: null,
	            maxHideTime: null
	        };
	
	        if (typeof map.optionsOverride !== 'undefined') {
	            options = utils.extend(options, map.optionsOverride);
	            map.iconClass = map.optionsOverride.iconClass || iconClass;
	        }
	
	        /**
	         * Initialize notification element
	         *
	         * @param   {object}   me
	         * @returns {object}
	         */
	        function initiateNotify(me) {
	            notificationId = notificationId + 1;
	            container = me.getContainer(true);
	            return me.personalize(map, container);
	        }
	
	        /**
	         * Check for duplicate notification
	         *
	         * @param   {object}  options
	         * @param   {object}  map
	         * @returns {boolean}
	         */
	        function shouldExit(options, map) {
	            if (options.preventDuplicates) {
	                if (map.message === previousNotification) {
	                    return true;
	                } else {
	                    previousNotification = map.message;
	                }
	            }
	            return false;
	        }
	
	        /**
	         * Emits subscribed events
	         *
	         * @param {mixed} args
	         */
	        function publish(args) {
	            if (!listener) {
	                return;
	            }
	            listener(args);
	        }
	
	        /**
	         * Update progress bar in toastr notification
	         */
	        function updateProgress() {
	            var percentage = (progressBar.hideEta - new Date().getTime()) / progressBar.maxHideTime * 100;
	            progressElement.style.width = percentage + '%';
	        }
	
	        /**
	         * Hide notification
	         *
	         * @param   {boolean} override
	         * @returns {object}
	         */
	        function hideNotification(override) {
	            var method = override && options.closeMethod !== false ? options.closeMethod : options.hideMethod,
	                duration = override && options.closeDuration !== false ? options.closeDuration : options.hideDuration,
	                easing = override && options.closeEasing !== false ? options.closeEasing : options.hideEasing;
	
	            if (notificationElement.length && !override) {
	                return;
	            }
	
	            return utils.design.fadeOut(notificationElement, {
	                easing: easing,
	                duration: duration,
	                complete: function complete() {
	                    removeNotification(notificationElement);
	                    clearTimeout(intervalId);
	                    if (options.onHidden && response.state !== 'hidden') {
	                        options.onHidden();
	                    }
	                    response.state = 'hidden';
	                    response.endTime = new Date();
	                    publish(response);
	                }
	            });
	        }
	
	        /**
	         * Display actual notification
	         */
	        function displayNotification() {
	            notificationElement.style.opacity = 0;
	
	            utils.design.fadeIn(notificationElement, {
	                easing: options.showEasing,
	                duration: options.showDuration,
	                complete: options.onShown
	            });
	
	            if (options.autoHide && options.hideTimeout > 0) {
	                intervalId = setTimeout(hideNotification, options.hideTimeout);
	            }
	
	            if (options.hideTimeout > 0) {
	                if (typeof progressElement !== 'undefined' && options.autoHide !== false) {
	                    progressBar.maxHideTime = parseFloat(options.hideTimeout);
	                    progressBar.hideEta = new Date().getTime() + progressBar.maxHideTime;
	                    if (options.progressBar) {
	                        progressBar.intervalId = setInterval(updateProgress, 10);
	                    }
	                }
	            }
	        }
	
	        /**
	         * Handle notification events
	         */
	        function handleEvents() {
	            if (options.closeOnHover) {
	                notificationElement.addEventListener('mouseover', hideNotification, false);
	            }
	
	            if (!options.onclick && options.tapToDismiss) {
	                notificationElement.onclick = hideNotification;
	            }
	
	            if (options.closeButton && closeElement) {
	                closeElement.onclick = function (event) {
	                    if (event.stopPropagation) {
	                        event.stopPropagation();
	                    } else if (event.cancelBubble !== undefined && event.cancelBubble !== true) {
	                        event.cancelBubble = true;
	                    }
	
	                    if (options.onCloseClick) {
	                        options.onCloseClick(event);
	                    }
	
	                    hideNotification();
	                };
	            }
	        }
	
	        if (shouldExit(options, map)) {
	            return;
	        }
	
	        domElements = initiateNotify(this);
	        notificationElement = domElements.notificationElement;
	        closeElement = domElements.closeElement;
	        progressElement = domElements.progressElement || undefined;
	
	        displayNotification();
	
	        handleEvents();
	
	        publish(response);
	
	        if (options.debug && console) {
	            console.log(response);
	        }
	
	        return notificationElement;
	    }
	
	    /**
	     * Create notification container
	     *
	     * @param   {object}   options
	     * @returns {Element}
	     */
	    function createContainer(options) {
	        var container = document.createElement('div'),
	            i;
	
	        container.setAttribute('id', options.containerId);
	        utils.addClass(container, options.containerClass);
	
	        if (options.target === 'body') {
	            document.body.appendChild(container);
	        } else {
	            document.querySelector(options.target).appendChild(container);
	        }
	
	        return container;
	    }
	
	    /**
	     * Remove notification
	     *
	     * @param {Element} notificationElement
	     */
	    function removeNotification(notificationElement) {
	
	        if (utils.isElementVisible(notificationElement)) {
	            return;
	        }
	
	        notificationElement.remove();
	        notificationElement = null;
	
	        if (typeof container !== 'undefined' && container !== null && container.children.length === 0) {
	            container.remove();
	            previousNotification = undefined;
	        }
	    }
	
	    /**
	     * Constructor function
	     */
	    Notification = function Notification() {};
	
	    /**
	     * Initiate error notification
	     *
	     * @param   {string}   title
	     * @param   {string}   message
	     * @param   {object}   optionsOverride
	     * @returns {*}
	     */
	    Notification.prototype.error = function (title, message, optionsOverride) {
	        return notify.call(this, {
	            type: notificationType.error,
	            iconClass: this.getOptions().iconClasses.error,
	            title: title,
	            message: message,
	            optionsOverride: optionsOverride
	        });
	    };
	
	    /**
	     * Initiate success notification
	     *
	     * @param   {string}   title
	     * @param   {string}   message
	     * @param   {object}   optionsOverride
	     * @returns {*}
	     */
	    Notification.prototype.success = function (title, message, optionsOverride) {
	        return notify.call(this, {
	            type: notificationType.success,
	            iconClass: this.getOptions().iconClasses.success,
	            title: title,
	            message: message,
	            optionsOverride: optionsOverride
	        });
	    };
	
	    /**
	     * Initiate warning notification
	     *
	     * @param   {string}   title
	     * @param   {string}   message
	     * @param   {object}   optionsOverride
	     * @returns {*}
	     */
	    Notification.prototype.warning = function (title, message, optionsOverride) {
	        return notify.call(this, {
	            type: notificationType.warning,
	            iconClass: this.getOptions().iconClasses.warning,
	            title: title,
	            message: message,
	            optionsOverride: optionsOverride
	        });
	    };
	
	    /**
	     * Initiate info notification
	     *
	     * @param   {string}   title
	     * @param   {string}   message
	     * @param   {object}   optionsOverride
	     * @returns {*}
	     */
	    Notification.prototype.info = function (title, message, optionsOverride) {
	        return notify.call(this, {
	            type: notificationType.info,
	            iconClass: this.getOptions().iconClasses.info,
	            title: title,
	            message: message,
	            optionsOverride: optionsOverride
	        });
	    };
	
	    /**
	     * Set notification user defined options
	     *
	     * @param {object} opt
	     */
	    Notification.prototype.setOptions = function (opt) {
	        options = opt;
	        return this;
	    };
	
	    /**
	     * Get options
	     *
	     * @returns {object}
	     */
	    Notification.prototype.getOptions = function () {
	        var defaults = utils.extend(globalOptions, this.getDefaults());
	        return utils.extend(defaults, options);
	    };
	
	    /**
	     * Get container
	     *
	     * @param   {boolean}  create
	     * @returns {Element}
	     */
	    Notification.prototype.getContainer = function (create) {
	        var options = this.getOptions();
	        container = document.getElementById(options.containerId);
	        if (container !== null) {
	            return container;
	        }
	        if (create) {
	            container = createContainer(options);
	        }
	        return container;
	    };
	
	    /**
	     * Remove notification
	     *
	     * @param {Element} notificationElement
	     */
	    Notification.prototype.remove = function (notificationElement) {
	        var options = this.getOptions();
	        if (!container) {
	            this.getContainer(options);
	        }
	        if (notificationElement && notificationElement.length === 0) {
	            removeNotification(notificationElement);
	            return;
	        }
	        if (container.children.length) {
	            container.remove();
	        }
	    };
	
	    /**
	     * Subscribe event listener
	     *
	     * @param   {function} callback
	     * @returns {Notification}
	     */
	    Notification.prototype.subscribe = function (callback) {
	        listener = callback;
	        return Notification;
	    };
	
	    return Notification;
	}();

/***/ },
/* 8 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(3);
	var baseNotification = __webpack_require__(7);
	var style = __webpack_require__(13);
	
	module.exports = function () {
	
	    'use strict';
	
	    var ToastrClass = function () {
	
	        var instance = null,
	            defaultOptions = {
	            target: 'body',
	            containerId: 'sa-toast-container',
	            containerClass: 'sa-toast-top-right',
	            notificationClass: 'sa-toast',
	            iconClass: 'sa-toast-info',
	            positionClass: 'sa-toast-top-right',
	            titleClass: 'sa-toast-title',
	            messageClass: 'sa-toast-message',
	            closeClass: 'sa-toast-close-button',
	            progressBar: true,
	            progressClass: 'sa-toast-progress',
	            rightAlign: false,
	            iconClasses: {
	                error: 'sa-toast-error',
	                info: 'sa-toast-info',
	                success: 'sa-toast-success',
	                warning: 'sa-toast-warning'
	            }
	        };
	
	        /**
	         * Constructor function
	         */
	        function ToastrNotification() {}
	
	        ToastrNotification.prototype = Object.create(baseNotification.prototype);
	
	        ToastrNotification.prototype.constructor = ToastrNotification;
	
	        /**
	         * Get default options
	         * 
	         * @returns {object} Get default options
	         */
	        ToastrNotification.prototype.getDefaults = function () {
	            return defaultOptions;
	        };
	
	        /**
	         * Create notification element
	         * 
	         * @param   {object} map       
	         * @param   {object} container 
	         * @returns {object} 
	         */
	        ToastrNotification.prototype.personalize = function (map, container) {
	
	            var toastElement = document.createElement('div'),
	                titleElement = document.createElement('div'),
	                messageElement = document.createElement('div'),
	                progressElement = document.createElement('div'),
	                closeElement = utils.stringToHtmlElement('<button type="button">&times;</button>'),
	                options = this.getOptions(),
	                title = map.title || false,
	                message = map.message || false,
	                iconClass = map.iconClass || false;
	
	            if (iconClass) {
	                utils.addClass(toastElement, options.notificationClass);
	                utils.addClass(toastElement, map.iconClass);
	            }
	
	            if (options.newestOnTop) {
	                container.insertBefore(toastElement, container.firstChild);
	            } else {
	                container.appendChild(toastElement);
	            }
	
	            if (title) {
	                if (options.escapeHtml) {
	                    title = utils.escapeHtml(title);
	                }
	                utils.addClass(titleElement, options.titleClass);
	                titleElement.insertAdjacentHTML('beforeend', title);
	                toastElement.appendChild(titleElement);
	            }
	
	            if (message) {
	                if (options.escapeHtml) {
	                    message = utils.escapeHtml(message);
	                }
	                utils.addClass(messageElement, options.messageClass);
	                messageElement.insertAdjacentHTML('beforeend', message);
	                toastElement.appendChild(messageElement);
	            }
	
	            if (options.closeButton) {
	                utils.addClass(closeElement, options.closeClass);
	                closeElement.setAttribute('role', 'button');
	                toastElement.insertBefore(closeElement, toastElement.firstChild);
	            }
	
	            if (options.progressBar) {
	                utils.addClass(progressElement, options.progressClass);
	                toastElement.insertBefore(progressElement, toastElement.firstChild);
	            }
	
	            if (options.rightAlign) {
	                utils.addClass(toastElement, 'rtl');
	            }
	
	            return {
	                notificationElement: toastElement,
	                titleElement: titleElement,
	                messageElement: messageElement,
	                progressElement: progressElement,
	                closeElement: closeElement
	            };
	        };
	
	        return {
	            getInstance: function getInstance() {
	                if (instance === null) {
	                    instance = new ToastrNotification();
	                    instance.constructor = null;
	                }
	                return instance;
	            }
	        };
	    }();
	
	    return ToastrClass.getInstance();
	}();

/***/ },
/* 13 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 14 */,
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(3);
	
	module.exports = function () {
	
	    'use strict';
	
	    var Loader,
	        options = {
	        type: 'spinner',
	        bar: {
	            "bottom": "25px",
	            "height": "20px",
	            "background": "#9bbb59"
	        },
	        text: {
	            "bottom": "50px",
	            "font": "14pt/1.2 sans-serif",
	            "color": "#303030"
	        },
	        backgroundColor: "rgba(255, 255, 255, 0.8)",
	        custom: "",
	        fade: true,
	        fontawesome: "",
	        image: "data:image/gif;base64,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",
	        imagePosition: "center center",
	        maxSize: "100px",
	        minSize: "20px",
	        resizeInterval: 50,
	        size: "50%",
	        zIndex: 9999
	    };
	
	    function _resolveContainer(container) {
	
	        if (typeof container === 'string') {
	            return container.charAt(0) === '.' ? document.querySelectorAll(container) : document.querySelector(container);
	        }
	
	        if (typeof jQuery !== 'undefined' && container instanceof jQuery) {
	            return container.get(0);
	        }
	
	        return container;
	    };
	
	    function _createLoader() {
	        var options = this.getOptions();
	        return options.type === 'progress' ? _createProgressLoader.call(this) : _createSpinnerLoader.call(this);
	    };
	
	    function _createSpinnerLoader() {
	        var overlay,
	            fontAwesome,
	            options = this.getOptions();
	
	        overlay = document.createElement('div');
	        overlay.className = 'sa-loading-overlay';
	        overlay.style.backgroundColor = options.backgroundColor;
	        overlay.style.display = 'flex';
	        overlay.style.flexDirection = 'column';
	        overlay.style.alignItems = 'center';
	        overlay.style.justifyContent = 'center';
	
	        if (typeof options.zIndex !== 'undefined') {
	            overlay.style.zIndex = options.zIndex;
	        }
	
	        if (options.image) {
	            overlay.style.backgroundImage = "url(" + options.image + ")";
	            overlay.style.backgroundPosition = options.imagePosition;
	            overlay.style.backgroundRepeat = "no-repeat";
	        }
	
	        if (typeof options.fontawesome !== 'undefined') {
	            fontAwesome = document.createElement('div');
	            fontAwesome.className = 'sa-loading-overlay-fontawesome ' + options.fontawesome;
	            overlay.appendChild(fontAwesome);
	        }
	        return overlay;
	    };
	
	    function _createProgressLoader() {};
	
	    function _showLoader(container, overlay) {
	        var i;
	        // TO DO trigger on loader start event
	        if (container instanceof NodeList) {
	            for (i = 0; i < container.length; i++) {
	                _appendLoader(container[i], overlay);
	            }
	        } else {
	            _appendLoader(container, overlay);
	        }
	    };
	
	    function _appendLoader(container, overlay) {
	        var cloneOverlay,
	            wholePage = container.tagName == 'BODY' ? true : false,
	            cloneOverlay = overlay.cloneNode(true);
	
	        if (wholePage) {
	            cloneOverlay.style.position = 'fixed';
	            cloneOverlay.style.top = 0;
	            cloneOverlay.style.left = 0;
	            cloneOverlay.style.width = '100%';
	            cloneOverlay.style.height = '100%';
	        } else {
	            cloneOverlay.style.position = container.style.position == "fixed" ? "fixed" : "absolute";
	        }
	
	        container.smartajaxLoadingOverlay = cloneOverlay;
	        container.smartajaxLoadingOverlayFadeOutDuration = options.fade[1];
	        cloneOverlay.style.opacity = 0;
	
	        _resizeSpinnerLoader(container, cloneOverlay, options, wholePage);
	
	        if (options.resizeInterval > 0) {
	            var resizeIntervalId = setInterval(function () {
	                _resizeSpinnerLoader(container, overlay, options, wholePage);
	            }, options.resizeInterval);
	            container.smartajaxLoadingOverlayIntervalId = resizeIntervalId;
	        }
	
	        document.querySelector('body').appendChild(cloneOverlay);
	
	        utils.design.fadeIn(cloneOverlay, {
	            duration: options.fade[0]
	        });
	    };
	
	    function _resizeSpinnerLoader(container, overlay, options, wholePage) {
	        if (!wholePage) {
	            var x = container.style.position == "fixed" ? utils.getOffsetRelativeToDocument(container) : {
	                left: container.offsetLeft,
	                top: container.offsetTop
	            };
	
	            overlay.style.top = x.top + parseInt(container.style.borderTopWidth, 10);
	            overlay.style.left = x.left + parseInt(container.style.borderLeftWidth, 10);
	            overlay.style.width = container.clientWidth;
	            overlay.style.height = container.clientHeight;
	        }
	
	        var c = wholePage ? document.querySelector('body') : container;
	        var size = "auto";
	        if (options.size && options.size != "auto") {
	            size = Math.min(c.clientWidth, c.clientHeight) * parseFloat(options.size) / 100;
	
	            if (options.maxSize && size > parseInt(options.maxSize, 10)) {
	                size = parseInt(options.maxSize, 10) + "px";
	            }
	            if (options.minSize && size < parseInt(options.minSize, 10)) {
	                size = parseInt(options.minSize, 10) + "px";
	            }
	        }
	        overlay.style.backgroundSize = size;
	        //overlay.children(".loadingoverlay_fontawesome").css("font-size", size);
	    };
	
	    function _hideLoader(container) {
	        var i;
	        // TO DO trigger on loader start event
	        if (container instanceof NodeList) {
	            for (i = 0; i < container.length; i++) {
	                _removeLoader(container[i]);
	            }
	        } else {
	            _removeLoader(container);
	        }
	        // TO DO trigger on loader complete event
	    };
	
	    function _removeLoader(container) {
	        var resizeIntervalId;
	
	        if (typeof container.smartajaxLoadingOverlay !== 'undefined') {
	            resizeIntervalId = container.smartajaxLoadingOverlayIntervalId;
	            if (resizeIntervalId) {
	                clearInterval(resizeIntervalId);
	            }
	            utils.design.fadeOut(container.smartajaxLoadingOverlay, {
	                duration: container.smartajaxLoadingOverlayFadeOutDuration,
	                complete: function complete() {
	                    container.smartajaxLoadingOverlay.remove();
	                    delete container.smartajaxLoadingOverlay;
	                    delete container.smartajaxLoadingOverlayFadeOutDuration;
	                    delete container.smartajaxLoadingOverlayIntervalId;
	                }
	            });
	        }
	    };
	
	    /**
	     * Constructor function
	     */
	    Loader = function Loader() {};
	
	    /**
	     * Set notification user defined options
	     *
	     * @param {object} settings
	     */
	    Loader.prototype.setOptions = function (settings) {
	        options = utils.extend(options, settings);
	
	        if (!options.fade) {
	            options.fade = [0, 0];
	        } else if (options.fade === true) {
	            options.fade = [400, 200];
	        } else if (typeof options.fade == "string" || typeof options.fade == "number") {
	            options.fade = [options.fade, options.fade];
	        }
	    };
	
	    /**
	     * Get options
	     *
	     * @returns {object}
	     */
	    Loader.prototype.getOptions = function () {
	        return options;
	    };
	
	    Loader.prototype.show = function (container, options) {
	        var overlay,
	            show,
	            options = options || {};
	
	        this.setOptions(options);
	        container = _resolveContainer(container);
	        overlay = _createLoader.call(this);
	        show = _showLoader.call(this, container, overlay);
	    };
	
	    Loader.prototype.hide = function (container) {
	        container = _resolveContainer(container);
	        return _hideLoader.call(this, container);
	    };
	
	    Loader.prototype.isLoading = function (container) {
	        return typeof container.smartajaxLoadingOverlay !== 'undefined';
	    };
	
	    return new Loader();
	}();

/***/ },
/* 16 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ])
});
;
//# sourceMappingURL=smartajax.js.map