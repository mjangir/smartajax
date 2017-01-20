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
	    module.exports = factory(__webpack_require__(1), __webpack_require__(2), global || root);
	  } else {
	    root.Smartajax = factory(root.jQuery, root.bootstrap, root.toastr, root);
	  }
	})(typeof window !== 'undefined' ? window : undefined, function (jQuery, toastr, root) {
	
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
	    jQuery('body').append(createModal());
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
	  toastr.options = {
	    "closeButton": true,
	    "debug": true,
	    "newestOnTop": true,
	    "progressBar": true,
	    "positionClass": "toast-top-right",
	    "preventDuplicates": false,
	    "onclick": null,
	    "showDuration": "300",
	    "hideDuration": "1000",
	    "timeOut": "5000",
	    "extendedTimeOut": "1000",
	    "showEasing": "swing",
	    "hideEasing": "linear",
	    "showMethod": "fadeIn",
	    "hideMethod": "fadeOut"
	  };
	  toastr.info('Are you the 6 fingered man?', 'Hello this is info message');
	  toastr.success('Are you the 6 fingered man?', 'Hello this is info message');
	  toastr.warning('Are you the 6 fingered man?', 'Hello this is info message');
	  toastr.error('Are you the 6 fingered man?', 'Hello this is info message');
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
	
	var jQuery = __webpack_require__(1);
	var Utils = __webpack_require__(3);
	
	module.exports = function () {
	    var $container;
	    var listener;
	    var toastId = 0;
	    var toastType = {
	        error: 'error',
	        info: 'info',
	        success: 'success',
	        warning: 'warning'
	    };
	
	    var toastr = {
	        clear: clear,
	        remove: remove,
	        error: error,
	        getContainer: getContainer,
	        info: info,
	        options: {},
	        subscribe: subscribe,
	        success: success,
	        version: '2.1.3',
	        warning: warning
	    };
	
	    var previousToast;
	
	    return toastr;
	
	    ////////////////
	
	    function error(message, title, optionsOverride) {
	        return notify({
	            type: toastType.error,
	            iconClass: getOptions().iconClasses.error,
	            message: message,
	            optionsOverride: optionsOverride,
	            title: title
	        });
	    }
	
	    function getContainer(options, create) {
	        if (!options) {
	            options = getOptions();
	        }
	        $container = document.getElementById(options.containerId);
	        if ($container !== null) {
	            return $container;
	        }
	        if (create) {
	            $container = createContainer(options);
	        }
	        return $container;
	    }
	
	    function info(message, title, optionsOverride) {
	        return notify({
	            type: toastType.info,
	            iconClass: getOptions().iconClasses.info,
	            message: message,
	            optionsOverride: optionsOverride,
	            title: title
	        });
	    }
	
	    function subscribe(callback) {
	        listener = callback;
	    }
	
	    function success(message, title, optionsOverride) {
	        return notify({
	            type: toastType.success,
	            iconClass: getOptions().iconClasses.success,
	            message: message,
	            optionsOverride: optionsOverride,
	            title: title
	        });
	    }
	
	    function warning(message, title, optionsOverride) {
	        return notify({
	            type: toastType.warning,
	            iconClass: getOptions().iconClasses.warning,
	            message: message,
	            optionsOverride: optionsOverride,
	            title: title
	        });
	    }
	
	    function clear($toastElement, clearOptions) {
	        var options = getOptions();
	        if (!$container) {
	            getContainer(options);
	        }
	        if (!clearToast($toastElement, options, clearOptions)) {
	            clearContainer(options);
	        }
	    }
	
	    function remove($toastElement) {
	        var options = getOptions();
	        if (!$container) {
	            getContainer(options);
	        }
	        if ($toastElement && $toastElement.length === 0) {
	            removeToast($toastElement);
	            return;
	        }
	        if ($container.children.length) {
	            $container.remove();
	        }
	    }
	
	    // internal functions
	
	    function clearContainer(options) {
	        var toastsToClear = $container.children;
	        for (var i = toastsToClear.length - 1; i >= 0; i--) {
	            clearToast(toastsToClear[i], options);
	        }
	    }
	
	    function clearToast($toastElement, options, clearOptions) {
	        var force = clearOptions && clearOptions.force ? clearOptions.force : false;
	        if ($toastElement && (force || $toastElement.length === 0)) {
	            Utils.design.fadeOut($toastElement, {
	                duration: options.hideDuration,
	                easing: options.hideEasing,
	                complete: function complete() {
	                    removeToast($toastElement);
	                }
	            });
	            return true;
	        }
	        return false;
	    }
	
	    function createContainer(options) {
	        $container = document.createElement('div');
	        $container.setAttribute('id', options.containerId);
	        $container.classList.add(options.positionClass);
	
	        if (options.target === 'body') {
	            document.body.appendChild($container);
	        } else {
	            document.querySelector(options.target).appendChild($container);
	        }
	        return $container;
	    }
	
	    function getDefaults() {
	        return {
	            tapToDismiss: true,
	            toastClass: 'toast',
	            containerId: 'toast-container',
	            debug: false,
	
	            showMethod: 'fadeIn', //fadeIn, slideDown, and show are built into jQuery
	            showDuration: 1000,
	            showEasing: 'linear', //swing and linear are built into jQuery
	            onShown: undefined,
	            hideMethod: 'fadeOut',
	            hideDuration: 1000,
	            hideEasing: 'swing',
	            onHidden: undefined,
	            closeMethod: false,
	            closeDuration: false,
	            closeEasing: false,
	            closeOnHover: true,
	
	            extendedTimeOut: 1000,
	            iconClasses: {
	                error: 'toast-error',
	                info: 'toast-info',
	                success: 'toast-success',
	                warning: 'toast-warning'
	            },
	            iconClass: 'toast-info',
	            positionClass: 'toast-top-right',
	            timeOut: 5000, // Set timeOut and extendedTimeOut to 0 to make it sticky
	            titleClass: 'toast-title',
	            messageClass: 'toast-message',
	            escapeHtml: false,
	            target: 'body',
	            closeHtml: '<button type="button">&times;</button>',
	            closeClass: 'toast-close-button',
	            newestOnTop: true,
	            preventDuplicates: false,
	            progressBar: true,
	            progressClass: 'toast-progress',
	            rtl: false
	        };
	    }
	
	    function publish(args) {
	        if (!listener) {
	            return;
	        }
	        listener(args);
	    }
	
	    function notify(map) {
	        var options = getOptions();
	        var iconClass = map.iconClass || options.iconClass;
	
	        if (typeof map.optionsOverride !== 'undefined') {
	            options = Utils.extend(options, map.optionsOverride);
	            iconClass = map.optionsOverride.iconClass || iconClass;
	        }
	
	        if (shouldExit(options, map)) {
	            return;
	        }
	
	        toastId++;
	
	        $container = getContainer(options, true);
	
	        var intervalId = null;
	        var $toastElement = document.createElement('div');
	        var $titleElement = document.createElement('div');
	        var $messageElement = document.createElement('div');
	        var $progressElement = document.createElement('div');
	        var $closeElement = Utils.stringToHtmlElement(options.closeHtml);
	        var progressBar = {
	            intervalId: null,
	            hideEta: null,
	            maxHideTime: null
	        };
	        var response = {
	            toastId: toastId,
	            state: 'visible',
	            startTime: new Date(),
	            options: options,
	            map: map
	        };
	
	        personalizeToast();
	
	        displayToast();
	
	        handleEvents();
	
	        publish(response);
	
	        if (options.debug && console) {
	            console.log(response);
	        }
	
	        return $toastElement;
	
	        function escapeHtml(source) {
	            if (source == null) {
	                source = '';
	            }
	
	            return source.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	        }
	
	        function personalizeToast() {
	            setIcon();
	            setTitle();
	            setMessage();
	            setCloseButton();
	            setProgressBar();
	            setRTL();
	            setSequence();
	            setAria();
	        }
	
	        function setAria() {
	            var ariaValue = '';
	            switch (map.iconClass) {
	                case 'toast-success':
	                case 'toast-info':
	                    ariaValue = 'polite';
	                    break;
	                default:
	                    ariaValue = 'assertive';
	            }
	            $toastElement.setAttribute('aria-live', ariaValue);
	        }
	
	        function handleEvents() {
	            if (options.closeOnHover) {
	                $toastElement.addEventListener('mouseover', stickAround, false);
	                $toastElement.addEventListener('mouseover', delayedHideToast, false);
	            }
	
	            if (!options.onclick && options.tapToDismiss) {
	                $toastElement.onclick = hideToast;
	            }
	
	            if (options.closeButton && $closeElement) {
	                $closeElement.onclick = function (event) {
	                    if (event.stopPropagation) {
	                        event.stopPropagation();
	                    } else if (event.cancelBubble !== undefined && event.cancelBubble !== true) {
	                        event.cancelBubble = true;
	                    }
	
	                    if (options.onCloseClick) {
	                        options.onCloseClick(event);
	                    }
	
	                    hideToast(true);
	                };
	            }
	
	            if (options.onclick) {
	                $toastElement.onclick = function (event) {
	                    options.onclick(event);
	                    hideToast();
	                };
	            }
	        }
	
	        function displayToast() {
	            $toastElement.style.opacity = 0;
	
	            Utils.design.fadeIn($toastElement, {
	                easing: options.showEasing,
	                duration: options.showDuration,
	                complete: options.onShown
	            });
	
	            if (options.timeOut > 0) {
	                intervalId = setTimeout(hideToast, options.timeOut);
	                progressBar.maxHideTime = parseFloat(options.timeOut);
	                progressBar.hideEta = new Date().getTime() + progressBar.maxHideTime;
	                if (options.progressBar) {
	                    progressBar.intervalId = setInterval(updateProgress, 10);
	                }
	            }
	        }
	
	        function setIcon() {
	            if (map.iconClass) {
	                $toastElement.classList.add(options.toastClass);
	                $toastElement.classList.add(iconClass);
	            }
	        }
	
	        function setSequence() {
	            if (options.newestOnTop) {
	                $container.insertBefore($toastElement, $container.firstChild);
	            } else {
	                $container.appendChild($toastElement);
	            }
	        }
	
	        function setTitle() {
	            if (map.title) {
	                var suffix = map.title;
	                if (options.escapeHtml) {
	                    suffix = escapeHtml(map.title);
	                }
	                $titleElement.classList.add(options.titleClass);
	                $titleElement.insertAdjacentHTML('beforeend', suffix);
	                $toastElement.appendChild($titleElement);
	            }
	        }
	
	        function setMessage() {
	            if (map.message) {
	                var suffix = map.message;
	                if (options.escapeHtml) {
	                    suffix = escapeHtml(map.message);
	                }
	                $messageElement.classList.add(options.messageClass);
	                $messageElement.insertAdjacentHTML('beforeend', suffix);
	                $toastElement.appendChild($messageElement);
	            }
	        }
	
	        function setCloseButton() {
	            if (options.closeButton) {
	                $closeElement.classList.add(options.closeClass);
	                $closeElement.setAttribute('role', 'button');
	                $toastElement.insertBefore($closeElement, $toastElement.firstChild);
	            }
	        }
	
	        function setProgressBar() {
	            if (options.progressBar) {
	                $progressElement.classList.add(options.progressClass);
	                $toastElement.insertBefore($progressElement, $toastElement.firstChild);
	            }
	        }
	
	        function setRTL() {
	            if (options.rtl) {
	                $toastElement.addClass('rtl');
	            }
	        }
	
	        function shouldExit(options, map) {
	            if (options.preventDuplicates) {
	                if (map.message === previousToast) {
	                    return true;
	                } else {
	                    previousToast = map.message;
	                }
	            }
	            return false;
	        }
	
	        function hideToast(override) {
	            var method = override && options.closeMethod !== false ? options.closeMethod : options.hideMethod;
	            var duration = override && options.closeDuration !== false ? options.closeDuration : options.hideDuration;
	            var easing = override && options.closeEasing !== false ? options.closeEasing : options.hideEasing;
	            if ($toastElement.length && !override) {
	                return;
	            }
	            clearTimeout(progressBar.intervalId);
	
	            return Utils.design.fadeOut($toastElement, {
	                easing: easing,
	                duration: duration,
	                complete: function complete() {
	                    removeToast($toastElement);
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
	
	        function delayedHideToast() {
	            if (options.timeOut > 0 || options.extendedTimeOut > 0) {
	                intervalId = setTimeout(hideToast, options.extendedTimeOut);
	                progressBar.maxHideTime = parseFloat(options.extendedTimeOut);
	                progressBar.hideEta = new Date().getTime() + progressBar.maxHideTime;
	            }
	        }
	
	        function stickAround() {
	            clearTimeout(intervalId);
	            progressBar.hideEta = 0;
	            $toastElement.style.webkitAnimationPlayState = 'paused';
	        }
	
	        function updateProgress() {
	            var percentage = (progressBar.hideEta - new Date().getTime()) / progressBar.maxHideTime * 100;
	            $progressElement.style.width = percentage + '%';
	        }
	    }
	
	    function getOptions() {
	        return Utils.extend(getDefaults(), toastr.options);
	    }
	
	    function removeToast($toastElement) {
	        if (!$container) {
	            $container = getContainer();
	        }
	        if (Utils.isElementVisible($toastElement)) {
	            return;
	        }
	        $toastElement.remove();
	        $toastElement = null;
	        if ($container.children.length === 0) {
	            $container.remove();
	            previousToast = undefined;
	        }
	    }
	}();

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	var utils = {
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
	        },
	        fadeOut: function fadeOut(element, options) {
	            var to = 1;
	            var easing = options.easing || 'swing';
	            this.animate({
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
	            this.animate({
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

/***/ }
/******/ ])
});
;
//# sourceMappingURL=smartajax.js.map