var Utils = require('./utils');

module.exports = (function () {
    var $container;
    var listener;
    var alertId = 0;
    var alertType = {
        error: 'error',
        info: 'info',
        success: 'success',
        warning: 'warning'
    };

    var alert = {
        options: {},
        success: success,
        error: error,
        warning: warning,
        info: info,
        clear: clear,
        remove: remove,
        getContainer: getContainer,
        subscribe: subscribe
    };

    var previousAlert;

    return alert;

    ////////////////

    function error(message, title, optionsOverride) {
        return notify({
            type: alertType.error,
            iconClass: getOptions().iconClasses.error,
            title: title,
            message: message,
            optionsOverride: optionsOverride,
        });
    }

    function success(message, title, optionsOverride) {
        return notify({
            type: alertType.success,
            iconClass: getOptions().iconClasses.success,
            title: title,
            message: message,
            optionsOverride: optionsOverride,
        });
    }

    function warning(message, title, optionsOverride) {
        return notify({
            type: alertType.warning,
            iconClass: getOptions().iconClasses.warning,
            title: title,
            message: message,
            optionsOverride: optionsOverride,
        });
    }

    function info(message, title, optionsOverride) {
        return notify({
            type: alertType.info,
            iconClass: getOptions().iconClasses.info,
            title: title,
            message: message,
            optionsOverride: optionsOverride,
        });
    }

    function getContainer(options, create) {
        if (!options) { options = getOptions(); }
        $container = document.getElementById(options.containerId);
        if ($container !== null) {
            return $container;
        }
        if (create) {
            $container = createContainer(options);
        }
        return $container;
    }

    function subscribe(callback) {
        listener = callback;
    }

    function clear($alertElement, clearOptions) {
        var options = getOptions();
        if (!$container) { getContainer(options); }
        if (!clearAlert($alertElement, options, clearOptions)) {
            clearContainer(options);
        }
    }

    function clearAlert ($alertElement, options, clearOptions) {
        var force = clearOptions && clearOptions.force ? clearOptions.force : false;
        if ($alertElement && (force || $alertElement.length === 0)) {
            Utils.design.fadeOut($alertElement, {
                duration: options.hideDuration,
                easing: options.hideEasing,
                complete: function () { removeAlert($alertElement); }
            });
            return true;
        }
        return false;
    }

    function remove($alertElement) {
        var options = getOptions();
        if (!$container) { getContainer(options); }
        if ($alertElement && $alertElement.length === 0) {
            removeAlert($alertElement);
            return;
        }
        if ($container.children.length) {
            $container.remove();
        }
    }

    function removeAlert($alertElement) {
        if (!$container) { $container = getContainer(); }
        if (Utils.isElementVisible($alertElement)) {
            return;
        }
        $alertElement.remove();
        $alertElement = null;
        if ($container.children.length === 0) {
            $container.remove();
            previousAlert = undefined;
        }
    }

    function clearContainer (options) {
        var alertToClear = $container.children;
        for (var i = alertToClear.length - 1; i >= 0; i--) {
            clearAlert(alertToClear[i], options);
        }
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
                error: 'alert-error',
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
    }

    function publish(args) {
        if (!listener) { return; }
        listener(args);
    }

    function notify(map) {
        var options = getOptions();
        var iconClass = map.iconClass || options.iconClass;

        if (typeof (map.optionsOverride) !== 'undefined') {
            options = Utils.extend(options, map.optionsOverride);
            iconClass = map.optionsOverride.iconClass || iconClass;
        }

        if (shouldExit(options, map)) { return; }

        alertId++;

        $container = getContainer(options, true);

        var intervalId = null;
        var $alertElement = document.createElement('div');
        var $titleElement = document.createElement('strong');
        var $messageElement = document.createElement('span');
        var $closeElement = Utils.stringToHtmlElement('<a href="javascript:void(0);" class="close" title="close">&times;</a>');
        
        var response = {
            alertId: alertId,
            state: 'visible',
            startTime: new Date(),
            options: options,
            map: map
        };

        personalizeAlert();

        displayAlert();

        handleEvents();

        publish(response);

        if (options.debug && console) {
            console.log(response);
        }

        return $alertElement;

        function escapeHtml(source) {
            if (source == null) {
                source = '';
            }

            return source
                .replace(/&/g, '&amp;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
        }

        function personalizeAlert() {
            setIcon();
            setTitle();
            setMessage();
            setCloseButton();
            setSequence();
        }

        function handleEvents() {

            if (!options.onclick && options.tapToDismiss) {
                $alertElement.onclick = hideAlert;
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

                    hideAlert(true);
                };
            }

            if (options.onclick) {
                $alertElement.onclick = function(event) {
                    options.onclick(event);
                    hideAlert();
                };
            }
        }

        function displayAlert() {
            $alertElement.style.opacity = 0;

            Utils.design.fadeIn($alertElement, {
                easing: options.showEasing,
                duration: options.showDuration,
                complete: options.onShown
            });

            if (options.autoHide && options.hideTimeout > 0) {
                intervalId = setTimeout(hideAlert, options.hideTimeout);
            }
        }

        function setIcon() {
            if (map.iconClass) {
                $alertElement.classList.add(options.alertClass);
                $alertElement.classList.add(iconClass);
            }
        }

        function setSequence() {
            if (options.newestOnTop) {
                $container.insertBefore($alertElement, $container.firstChild);
            } else {
                $container.appendChild($alertElement);
            }
        }

        function setTitle() {
            if (map.title) {
                var suffix = map.title;
                if (options.escapeHtml) {
                    suffix = escapeHtml(map.title);
                }
                $titleElement.insertAdjacentHTML('beforeend', suffix);
                $alertElement.appendChild($titleElement);
            }
        }

        function setMessage() {
            if (map.message) {
                var suffix = map.message;
                if (options.escapeHtml) {
                    suffix = escapeHtml(map.message);
                }
                $messageElement.insertAdjacentHTML('beforeend', suffix);
                $alertElement.appendChild($messageElement);
            }
        }

        function setCloseButton() {
            if (options.closeButton) {
                $alertElement.insertBefore($closeElement, $alertElement.firstChild);
            }
        }

        function shouldExit(options, map) {
            if (options.preventDuplicates) {
                if (map.message === previousAlert) {
                    return true;
                } else {
                    previousAlert = map.message;
                }
            }
            return false;
        }

        function hideAlert(override) {
            var method = override && options.closeMethod !== false ? options.closeMethod : options.hideMethod;
            var duration = override && options.closeDuration !== false ?
                options.closeDuration : options.hideDuration;
            var easing = override && options.closeEasing !== false ? options.closeEasing : options.hideEasing;
            if ($alertElement.length && !override) {
                return;
            }

            return Utils.design.fadeOut($alertElement, {
                easing: easing,
                duration: duration,
                complete: function () {
                    removeAlert($alertElement);
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
    }

    function getOptions() {
        return Utils.extend(getDefaults(), alert.options);
    }

    

})();