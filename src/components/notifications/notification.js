/*global
require, module, console
*/

var utils = require('../../utils');

module.exports = (function () {

    'use strict';

    var Notification,
        container,
        listener,
        options = {},
        previousNotification,
        notificationId = 0,
        notificationType = {
            error:      'error',
            info:       'info',
            success:    'success',
            warning:    'warning'
        },
        globalOptions = {
            tapToDismiss:   true,
            debug:          false,

            showMethod:     'fadeIn',
            showDuration:   1000,
            showEasing:     'swing',
            onShown:        undefined,

            hideMethod:     'fadeOut',
            hideDuration:   1000,
            hideEasing:     'swing',
            onHidden:       undefined,

            closeMethod:    'fadeOut',
            closeDuration:  1000,
            closeEasing:    'swing',
            onCloseClick:   undefined,

            autoHide:           true,
            closeOnHover:       true,
            hideTimeout:        5000,
            escapeHtml:         true,
            newestOnTop:        true,
            preventDuplicates:  true
        };
    
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
            options     = this.getOptions(),
            intervalId  = null,
            iconClass   = map.iconClass || options.iconClass,
            response    = {
                notificationId: notificationId,
                state: 'visible',
                startTime: new Date(),
                options: options,
                map: map
            },
            progressBar = {
                intervalId:     null,
                hideEta:        null,
                maxHideTime:    null
            };

        if (typeof (map.optionsOverride) !== 'undefined') {
            options         = utils.extend(options, map.optionsOverride);
            map.iconClass   = map.optionsOverride.iconClass || iconClass;
        }

        /**
         * Initialize notification element
         *
         * @param   {object}   me
         * @returns {object}
         */
        function initiateNotify(me) {
            notificationId  = notificationId + 1;
            container       = me.getContainer(true);
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
            var percentage = ((progressBar.hideEta - (new Date().getTime())) / progressBar.maxHideTime) * 100;
            progressElement.style.width = percentage + '%';
        }

        /**
         * Hide notification
         *
         * @param   {boolean} override
         * @returns {object}
         */
        function hideNotification(override) {
            var method      = override && options.closeMethod !== false ? options.closeMethod : options.hideMethod,
                duration    = override && options.closeDuration !== false ? options.closeDuration : options.hideDuration,
                easing      = override && options.closeEasing !== false ? options.closeEasing : options.hideEasing;

            if (notificationElement.length && !override) {
                return;
            }

            return utils.design.fadeOut(notificationElement, {
                easing: easing,
                duration: duration,
                complete: function () {
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
                easing:     options.showEasing,
                duration:   options.showDuration,
                complete:   options.onShown
            });

            if (options.autoHide && options.hideTimeout > 0) {
                intervalId = setTimeout(hideNotification, options.hideTimeout);
            }

            if (options.hideTimeout > 0) {
                if (typeof progressElement !== 'undefined' && options.autoHide !== false) {
                    progressBar.maxHideTime = parseFloat(options.hideTimeout);
                    progressBar.hideEta     = new Date().getTime() + progressBar.maxHideTime;
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

        domElements         = initiateNotify(this);
        notificationElement = domElements.notificationElement;
        closeElement        = domElements.closeElement;
        progressElement     = domElements.progressElement || undefined;

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
        var container  = document.createElement('div'),
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
     * Constructor function
     */
    Notification = function () {

    };

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
            type:               notificationType.error,
            iconClass:          this.getOptions().iconClasses.error,
            title:              title,
            message:            message,
            optionsOverride:    optionsOverride
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
            type:               notificationType.success,
            iconClass:          this.getOptions().iconClasses.success,
            title:              title,
            message:            message,
            optionsOverride:    optionsOverride
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
            type:               notificationType.warning,
            iconClass:          this.getOptions().iconClasses.warning,
            title:              title,
            message:            message,
            optionsOverride:    optionsOverride
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
            type:               notificationType.info,
            iconClass:          this.getOptions().iconClasses.info,
            title:              title,
            message:            message,
            optionsOverride:    optionsOverride
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
        container  = document.getElementById(options.containerId);
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
}());