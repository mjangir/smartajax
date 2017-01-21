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
	    module.exports = factory(__webpack_require__(1), __webpack_require__(2), __webpack_require__(5), global || root);
	  } else {
	    root.Smartajax = factory(root.jQuery, root.bootstrap, root.toastr, root.alert, root);
	  }
	})(typeof window !== 'undefined' ? window : undefined, function (jQuery, AlertNotification, ToastrNotification, root) {
	
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
	  AlertNotification.setOptions({
	    closeButton: true,
	    progressBar: true,
	    preventDuplicates: false,
	    autoHide: false,
	    closeOnHover: false
	  });
	  AlertNotification.success('Success', 'Department added successfully');
	  AlertNotification.error('Oops', 'There went something wrong');
	  AlertNotification.info('Information', 'This is important information');
	  AlertNotification.warning('Warning', 'You cannot delete system defined users');
	  AlertNotification.warning('Warning', 'You cannot delete system defined users');
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
	
	var Utils = __webpack_require__(3);
	var Notification = __webpack_require__(4);
	
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
	
	        function AlertNotification() {}
	
	        AlertNotification.prototype = Object.create(Notification.prototype);
	
	        AlertNotification.prototype.constructor = AlertNotification;
	
	        AlertNotification.prototype.getDefaults = function () {
	            return defaultOptions;
	        };
	
	        AlertNotification.prototype.personalize = function (map, container) {
	            var alertElement = document.createElement('div'),
	                titleElement = document.createElement('strong'),
	                messageElement = document.createElement('span'),
	                closeElement = Utils.stringToHtmlElement('<a href="javascript:void(0);" title="close">&times;</a>'),
	                options = this.getOptions(),
	                title = map.title || false,
	                message = map.message || false;
	
	            if (map.iconClass) {
	                Utils.addClass(alertElement, options.notificationClass);
	                Utils.addClass(alertElement, map.iconClass);
	            }
	
	            if (title) {
	                if (options.escapeHtml) {
	                    title = Utils.escapeHtml(title);
	                }
	                Utils.addClass(titleElement, options.titleClass);
	                titleElement.insertAdjacentHTML('beforeend', title);
	                alertElement.appendChild(titleElement);
	            }
	
	            if (message) {
	                if (options.escapeHtml) {
	                    message = Utils.escapeHtml(message);
	                }
	                Utils.addClass(messageElement, options.messageClass);
	                messageElement.insertAdjacentHTML('beforeend', message);
	                alertElement.appendChild(messageElement);
	            }
	
	            if (options.closeButton) {
	                Utils.addClass(closeElement, options.closeClass);
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
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	var utils = {
	
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
	
	var Utils = __webpack_require__(3);
	
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
	            options = Utils.extend(options, map.optionsOverride);
	            map.iconClass = map.optionsOverride.iconClass || iconClass;
	        }
	
	        function initiateNotify(me) {
	            notificationId = notificationId + 1;
	            container = me.getContainer(true);
	            return me.personalize(map, container);
	        }
	
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
	
	        function publish(args) {
	            if (!listener) {
	                return;
	            }
	            listener(args);
	        }
	
	        function updateProgress() {
	            var percentage = (progressBar.hideEta - new Date().getTime()) / progressBar.maxHideTime * 100;
	            progressElement.style.width = percentage + '%';
	        }
	
	        function hideNotification(override) {
	            var method = override && options.closeMethod !== false ? options.closeMethod : options.hideMethod,
	                duration = override && options.closeDuration !== false ? options.closeDuration : options.hideDuration,
	                easing = override && options.closeEasing !== false ? options.closeEasing : options.hideEasing;
	
	            if (notificationElement.length && !override) {
	                return;
	            }
	
	            return Utils.design.fadeOut(notificationElement, {
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
	
	        function displayNotification() {
	            notificationElement.style.opacity = 0;
	
	            Utils.design.fadeIn(notificationElement, {
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
	
	    function createContainer(options) {
	        var container = document.createElement('div'),
	            i;
	
	        container.setAttribute('id', options.containerId);
	        Utils.addClass(container, options.containerClass);
	
	        if (options.target === 'body') {
	            document.body.appendChild(container);
	        } else {
	            document.querySelector(options.target).appendChild(container);
	        }
	
	        return container;
	    }
	
	    function removeNotification(notificationElement) {
	
	        if (Utils.isElementVisible(notificationElement)) {
	            return;
	        }
	
	        notificationElement.remove();
	        notificationElement = null;
	
	        if (typeof container !== 'undefined' && container !== null && container.children.length === 0) {
	            container.remove();
	            previousNotification = undefined;
	        }
	    }
	
	    Notification = function Notification() {};
	
	    Notification.prototype.error = function (title, message, optionsOverride) {
	        return notify.call(this, {
	            type: notificationType.error,
	            iconClass: this.getOptions().iconClasses.error,
	            title: title,
	            message: message,
	            optionsOverride: optionsOverride
	        });
	    };
	
	    Notification.prototype.success = function (title, message, optionsOverride) {
	        return notify.call(this, {
	            type: notificationType.success,
	            iconClass: this.getOptions().iconClasses.success,
	            title: title,
	            message: message,
	            optionsOverride: optionsOverride
	        });
	    };
	
	    Notification.prototype.warning = function (title, message, optionsOverride) {
	        return notify.call(this, {
	            type: notificationType.warning,
	            iconClass: this.getOptions().iconClasses.warning,
	            title: title,
	            message: message,
	            optionsOverride: optionsOverride
	        });
	    };
	
	    Notification.prototype.info = function (title, message, optionsOverride) {
	        return notify.call(this, {
	            type: notificationType.info,
	            iconClass: this.getOptions().iconClasses.info,
	            title: title,
	            message: message,
	            optionsOverride: optionsOverride
	        });
	    };
	
	    Notification.prototype.setOptions = function (opt) {
	        options = opt;
	    };
	
	    Notification.prototype.getOptions = function () {
	        var defaults = Utils.extend(globalOptions, this.getDefaults());
	        return Utils.extend(defaults, options);
	    };
	
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
	
	    Notification.prototype.subscribe = function (callback) {
	        listener = callback;
	        return Notification;
	    };
	
	    return Notification;
	}();

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Utils = __webpack_require__(3);
	var Notification = __webpack_require__(4);
	
	module.exports = function () {
	
	    'use strict';
	
	    var ToastrClass = function () {
	
	        var instance = null,
	            defaultOptions = {
	            target: 'body',
	            containerId: 'toast-container',
	            containerClass: 'toast-top-right',
	            notificationClass: 'toast',
	            iconClass: 'toast-info',
	            positionClass: 'toast-top-right',
	            titleClass: 'toast-title',
	            messageClass: 'toast-message',
	            closeClass: 'toast-close-button',
	            progressBar: true,
	            progressClass: 'toast-progress',
	            rightAlign: false,
	            iconClasses: {
	                error: 'toast-error',
	                info: 'toast-info',
	                success: 'toast-success',
	                warning: 'toast-warning'
	            }
	        };
	
	        function ToastrNotification() {}
	
	        ToastrNotification.prototype = Object.create(Notification.prototype);
	
	        ToastrNotification.prototype.constructor = ToastrNotification;
	
	        ToastrNotification.prototype.getDefaults = function () {
	            return defaultOptions;
	        };
	
	        ToastrNotification.prototype.personalize = function (map, container) {
	
	            var toastElement = document.createElement('div'),
	                titleElement = document.createElement('div'),
	                messageElement = document.createElement('div'),
	                progressElement = document.createElement('div'),
	                closeElement = Utils.stringToHtmlElement('<button type="button">&times;</button>'),
	                options = this.getOptions(),
	                title = map.title || false,
	                message = map.message || false,
	                iconClass = map.iconClass || false;
	
	            if (iconClass) {
	                Utils.addClass(toastElement, options.notificationClass);
	                Utils.addClass(toastElement, map.iconClass);
	            }
	
	            if (options.newestOnTop) {
	                container.insertBefore(toastElement, container.firstChild);
	            } else {
	                container.appendChild(toastElement);
	            }
	
	            if (title) {
	                if (options.escapeHtml) {
	                    title = Utils.escapeHtml(title);
	                }
	                Utils.addClass(titleElement, options.titleClass);
	                titleElement.insertAdjacentHTML('beforeend', title);
	                toastElement.appendChild(titleElement);
	            }
	
	            if (message) {
	                if (options.escapeHtml) {
	                    message = Utils.escapeHtml(message);
	                }
	                Utils.addClass(messageElement, options.messageClass);
	                messageElement.insertAdjacentHTML('beforeend', message);
	                toastElement.appendChild(messageElement);
	            }
	
	            if (options.closeButton) {
	                Utils.addClass(closeElement, options.closeClass);
	                closeElement.setAttribute('role', 'button');
	                toastElement.insertBefore(closeElement, toastElement.firstChild);
	            }
	
	            if (options.progressBar) {
	                Utils.addClass(progressElement, options.progressClass);
	                toastElement.insertBefore(progressElement, toastElement.firstChild);
	            }
	
	            if (options.rightAlign) {
	                Utils.addClass(toastElement, 'rtl');
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

/***/ }
/******/ ])
});
;
//# sourceMappingURL=smartajax.js.map