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
	    module.exports = factory(__webpack_require__(1), __webpack_require__(5), __webpack_require__(7), global || root);
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
	  ToastrNotification.setOptions({
	    closeButton: true,
	    progressBar: true
	  });
	  ToastrNotification.success('Success', 'Succcccc');
	  ToastrNotification.error('Success', 'Succcccc');
	  ToastrNotification.info('Success', 'Succcccc');
	  ToastrNotification.warning('Success', 'Succcccc');
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
/* 2 */,
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
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Utils = __webpack_require__(3);
	var Notification = __webpack_require__(6);
	
	module.exports = function () {
	
	  var BootstrapAlert = function () {
	
	    var defaultOptions = {
	      containerClass: 'alert',
	      tapToDismiss: true,
	      alertClass: 'alert',
	      containerId: 'sa-alert-container',
	      debug: false,
	
	      showMethod: 'fadeIn', //fadeIn, slideDown, and show are built into jQuery
	      showDuration: 1000,
	      showEasing: 'linear', //swing and linear are built into jQuery
	      onShown: undefined,
	      hideMethod: 'fadeOut',
	      hideDuration: 1000,
	      hideEasing: 'swing',
	      autoHide: false,
	      hideTimeout: 5000,
	      onHidden: undefined,
	      closeMethod: false,
	      closeDuration: false,
	      closeEasing: false,
	
	      extendedTimeOut: 1000,
	      iconClasses: {
	        error: 'alert-danger',
	        info: 'alert-info',
	        success: 'alert-success',
	        warning: 'alert-warning'
	      },
	      iconClass: 'alert-info',
	      timeOut: 5000, // Set timeOut and extendedTimeOut to 0 to make it sticky
	      escapeHtml: false,
	      target: 'body',
	      newestOnTop: true,
	      preventDuplicates: false
	    };
	
	    function BootstrapAlert() {}
	
	    BootstrapAlert.prototype = Object.create(Notification.prototype);
	    BootstrapAlert.prototype.constructor = BootstrapAlert;
	
	    BootstrapAlert.prototype.getDefaults = function () {
	      return defaultOptions;
	    };
	
	    BootstrapAlert.prototype.personalizeNotification = function (map, $container) {
	      var $notificationElement = document.createElement('div');
	      var $titleElement = document.createElement('strong');
	      var $messageElement = document.createElement('span');
	      var $closeElement = Utils.stringToHtmlElement('<a href="javascript:void(0);" class="close" title="close">&times;</a>');
	
	      var options = this.getOptions();
	      if (map.iconClass) {
	        $notificationElement.classList.add(options.alertClass);
	        $notificationElement.classList.add(map.iconClass);
	      }
	      if (map.title) {
	        var suffix = map.title;
	        if (options.escapeHtml) {
	          suffix = escapeHtml(map.title);
	        }
	        $titleElement.insertAdjacentHTML('beforeend', suffix);
	        $notificationElement.appendChild($titleElement);
	      }
	      if (map.message) {
	        var suffix = map.message;
	        if (options.escapeHtml) {
	          suffix = escapeHtml(map.message);
	        }
	        $messageElement.insertAdjacentHTML('beforeend', suffix);
	        $notificationElement.appendChild($messageElement);
	      }
	      if (options.closeButton) {
	        $notificationElement.insertBefore($closeElement, $notificationElement.firstChild);
	      }
	      if (options.newestOnTop) {
	        $container.insertBefore($notificationElement, $container.firstChild);
	      } else {
	        $container.appendChild($notificationElement);
	      }
	      return {
	        notificationElement: $notificationElement,
	        closeElement: $closeElement
	      };
	    };
	
	    var instance;
	
	    return {
	      getInstance: function getInstance() {
	        if (instance == null) {
	          instance = new BootstrapAlert();
	          instance.constructor = null;
	        }
	        return instance;
	      }
	    };
	  }();
	
	  return BootstrapAlert.getInstance();
	}();

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Utils = __webpack_require__(3);
	
	module.exports = function () {
	
	    var $container;
	    var listener;
	    var options = {};
	    var previousNotification;
	    var notificationId = 0;
	    var notificationType = {
	        error: 'error',
	        info: 'info',
	        success: 'success',
	        warning: 'warning'
	    };
	
	    function escapeHtml(source) {
	        if (source == null) {
	            source = '';
	        }
	
	        return source.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	    }
	
	    function notify(map) {
	        var options = this.getOptions();
	        var iconClass = map.iconClass || options.iconClass;
	
	        if (typeof map.optionsOverride !== 'undefined') {
	            options = Utils.extend(options, map.optionsOverride);
	            iconClass = map.optionsOverride.iconClass || iconClass;
	        }
	
	        if (shouldExit(options, map)) {
	            return;
	        }
	
	        notificationId++;
	
	        $container = this.getContainer(true);
	
	        var intervalId = null;
	
	        var response = {
	            notificationId: notificationId,
	            state: 'visible',
	            startTime: new Date(),
	            options: options,
	            map: map
	        };
	
	        var $domElements = this.personalizeNotification(map, $container);
	        var $notificationElement = $domElements.notificationElement;
	        var $closeElement = $domElements.closeElement;
	        var $progressElement = $domElements.progressElement || undefined;
	        if ($progressElement != null) {
	            var progressBar = {
	                intervalId: null,
	                hideEta: null,
	                maxHideTime: null
	            };
	        }
	
	        displayAlert();
	
	        handleEvents();
	
	        //publish(response);
	
	        if (options.debug && console) {
	            console.log(response);
	        }
	
	        return $notificationElement;
	
	        function handleEvents() {
	
	            if (!options.onclick && options.tapToDismiss) {
	                $notificationElement.onclick = hideNotification;
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
	
	                    hideNotification(true);
	                };
	            }
	
	            if (options.onclick) {
	                $notificationElement.onclick = function (event) {
	                    options.onclick(event);
	                    hideNotification();
	                };
	            }
	        }
	
	        function displayAlert() {
	            $notificationElement.style.opacity = 0;
	
	            Utils.design.fadeIn($notificationElement, {
	                easing: options.showEasing,
	                duration: options.showDuration,
	                complete: options.onShown
	            });
	
	            if (options.autoHide && options.hideTimeout > 0) {
	                intervalId = setTimeout(hideNotification, options.hideTimeout);
	            }
	            if (options.hideTimeout > 0) {
	                intervalId = setTimeout(hideNotification, options.hideTimeout);
	                if (typeof progressBar != 'undefined') {
	                    progressBar.maxHideTime = parseFloat(options.hideTimeout);
	                    progressBar.hideEta = new Date().getTime() + progressBar.maxHideTime;
	                    if (options.progressBar) {
	                        progressBar.intervalId = setInterval(updateProgress, 10);
	                    }
	                }
	            }
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
	
	        function hideNotification(override) {
	            var method = override && options.closeMethod !== false ? options.closeMethod : options.hideMethod;
	            var duration = override && options.closeDuration !== false ? options.closeDuration : options.hideDuration;
	            var easing = override && options.closeEasing !== false ? options.closeEasing : options.hideEasing;
	            if ($notificationElement.length && !override) {
	                return;
	            }
	
	            return Utils.design.fadeOut($notificationElement, {
	                easing: easing,
	                duration: duration,
	                complete: function complete() {
	                    removeNotification($notificationElement);
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
	
	        function updateProgress() {
	            var percentage = (progressBar.hideEta - new Date().getTime()) / progressBar.maxHideTime * 100;
	            $progressElement.style.width = percentage + '%';
	        }
	    }
	
	    function removeNotification($notificationElement) {
	        if (!$container) {
	            $container = getContainer();
	        }
	        if (Utils.isElementVisible($notificationElement)) {
	            return;
	        }
	        $notificationElement.remove();
	        $notificationElement = null;
	        if ($container.children.length === 0) {
	            $container.remove();
	            previousNotification = undefined;
	        }
	    }
	
	    function publish(args) {
	        if (!listener) {
	            return;
	        }
	        listener(args);
	    }
	
	    function createContainer(options) {
	        var container = document.createElement('div');
	        container.setAttribute('id', options.containerId);
	
	        if (options.containerClass.indexOf(' ') > -1) {
	            var containerClassList = options.containerClass.split(' ');
	            for (var i = 0; i < containerClassList.length; i++) {
	                container.classList.add(containerClassList[i]);
	            }
	        } else {
	            container.classList.add(options.containerClass);
	        }
	
	        if (options.target === 'body') {
	            document.body.appendChild(container);
	        } else {
	            document.querySelector(options.target).appendChild(container);
	        }
	        return container;
	    }
	
	    function removeAlert($notificationElement) {
	        if (!$container) {
	            $container = getContainer();
	        }
	        if (Utils.isElementVisible($notificationElement)) {
	            return;
	        }
	        $notificationElement.remove();
	        $notificationElement = null;
	        if ($container.children.length === 0) {
	            $container.remove();
	            previousNotification = undefined;
	        }
	    }
	
	    var Notification = function Notification() {};
	
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
	        return Utils.extend(this.getDefaults(), options);
	    };
	
	    Notification.prototype.getContainer = function (create) {
	        var options = this.getOptions();
	        $container = document.getElementById(options.containerId);
	        if ($container !== null) {
	            return $container;
	        }
	        if (create) {
	            $container = createContainer(options);
	        }
	        return $container;
	    };
	
	    Notification.prototype.remove = function ($notificationElement) {
	        var options = this.getOptions();
	        if (!$container) {
	            this.getContainer(options);
	        }
	        if ($notificationElement && $notificationElement.length === 0) {
	            removeNotification($notificationElement);
	            return;
	        }
	        if ($container.children.length) {
	            $container.remove();
	        }
	    };
	
	    Notification.prototype.subscribe = function (callback) {
	        listener = callback;
	        return Notification;
	    };
	
	    return Notification;
	}();

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Utils = __webpack_require__(3);
	var Notification = __webpack_require__(6);
	
	module.exports = function () {
	
	    var ToastrAlert = function () {
	
	        var defaultOptions = {
	            containerClass: 'toast-top-right',
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
	            hideTimeout: 5000,
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
	
	        function ToastrAlert() {}
	
	        ToastrAlert.prototype = Object.create(Notification.prototype);
	        ToastrAlert.prototype.constructor = ToastrAlert;
	
	        ToastrAlert.prototype.getDefaults = function () {
	            return defaultOptions;
	        };
	
	        ToastrAlert.prototype.personalizeNotification = function (map, $container) {
	
	            var $toastElement = document.createElement('div');
	            var $titleElement = document.createElement('div');
	            var $messageElement = document.createElement('div');
	            var $progressElement = document.createElement('div');
	            var $closeElement = Utils.stringToHtmlElement('<button type="button">&times;</button>');
	
	            var options = this.getOptions();
	            if (map.iconClass) {
	                $toastElement.classList.add(options.toastClass);
	                $toastElement.classList.add(map.iconClass);
	            }
	            if (options.newestOnTop) {
	                $container.insertBefore($toastElement, $container.firstChild);
	            } else {
	                $container.appendChild($toastElement);
	            }
	            if (map.title) {
	                var suffix = map.title;
	                if (options.escapeHtml) {
	                    suffix = escapeHtml(map.title);
	                }
	                $titleElement.classList.add(options.titleClass);
	                $titleElement.insertAdjacentHTML('beforeend', suffix);
	                $toastElement.appendChild($titleElement);
	            }
	            if (map.message) {
	                var suffix = map.message;
	                if (options.escapeHtml) {
	                    suffix = escapeHtml(map.message);
	                }
	                $messageElement.classList.add(options.messageClass);
	                $messageElement.insertAdjacentHTML('beforeend', suffix);
	                $toastElement.appendChild($messageElement);
	            }
	            if (options.closeButton) {
	                $closeElement.classList.add(options.closeClass);
	                $closeElement.setAttribute('role', 'button');
	                $toastElement.insertBefore($closeElement, $toastElement.firstChild);
	            }
	            if (options.progressBar) {
	                $progressElement.classList.add(options.progressClass);
	                $toastElement.insertBefore($progressElement, $toastElement.firstChild);
	            }
	            if (options.rtl) {
	                $toastElement.classList.add('rtl');
	            }
	            return {
	                notificationElement: $toastElement,
	                titleElement: $titleElement,
	                messageElement: $messageElement,
	                progressElement: $progressElement,
	                closeElement: $closeElement
	            };
	        };
	
	        var instance;
	
	        return {
	            getInstance: function getInstance() {
	                if (instance == null) {
	                    instance = new ToastrAlert();
	                    instance.constructor = null;
	                }
	                return instance;
	            }
	        };
	    }();
	
	    return ToastrAlert.getInstance();
	}();

/***/ }
/******/ ])
});
;
//# sourceMappingURL=smartajax.js.map