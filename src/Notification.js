var Utils = require('./utils');

module.exports = (function () {

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

    return source
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function notify(map) {
    var options = this.getOptions();
    var iconClass = map.iconClass || options.iconClass;

    if (typeof (map.optionsOverride) !== 'undefined') {
        options = Utils.extend(options, map.optionsOverride);
        iconClass = map.optionsOverride.iconClass || iconClass;
    }

    if (shouldExit(options, map)) { return; }

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
    if($progressElement != null)
    {
        var progressBar = {
            intervalId: null,
            hideEta: null,
            maxHideTime: null
        }
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
            $notificationElement.onclick = function(event) {
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
            if(typeof progressBar != 'undefined') {
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
        var duration = override && options.closeDuration !== false ?
            options.closeDuration : options.hideDuration;
        var easing = override && options.closeEasing !== false ? options.closeEasing : options.hideEasing;
        if ($notificationElement.length && !override) {
            return;
        }

        return Utils.design.fadeOut($notificationElement, {
            easing: easing,
            duration: duration,
            complete: function () {
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
        var percentage = ((progressBar.hideEta - (new Date().getTime())) / progressBar.maxHideTime) * 100;
        $progressElement.style.width = percentage + '%';
    }
}

function removeNotification($notificationElement) {
    if (!$container) { $container = getContainer(); }
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
    var container  = document.createElement('div');
        container.setAttribute('id', options.containerId);

    if(options.containerClass.indexOf(' ') > -1) {
        var containerClassList = options.containerClass.split(' ');
        for(var i = 0; i < containerClassList.length; i++) {
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
    if (!$container) { $container = getContainer(); }
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

var Notification = function() {
    
};

Notification.prototype.error = function(title, message, optionsOverride) {
    return notify.call(this, {
        type: notificationType.error,
        iconClass: this.getOptions().iconClasses.error,
        title: title,
        message: message,
        optionsOverride: optionsOverride,
    });
};

Notification.prototype.success = function(title, message, optionsOverride) {
    return notify.call(this, {
        type: notificationType.success,
        iconClass: this.getOptions().iconClasses.success,
        title: title,
        message: message,
        optionsOverride: optionsOverride,
    });
};

Notification.prototype.warning = function(title, message, optionsOverride) {
    return notify.call(this, {
        type: notificationType.warning,
        iconClass: this.getOptions().iconClasses.warning,
        title: title,
        message: message,
        optionsOverride: optionsOverride,
    });
};

Notification.prototype.info = function(title, message, optionsOverride) {
    return notify.call(this, {
        type: notificationType.info,
        iconClass: this.getOptions().iconClasses.info,
        title: title,
        message: message,
        optionsOverride: optionsOverride,
    });
};

Notification.prototype.setOptions = function(opt) {
    options = opt;
}

Notification.prototype.getOptions = function() {
    return Utils.extend(this.getDefaults(), options);
}

Notification.prototype.getContainer = function(create) {
    var options = this.getOptions();
    $container  = document.getElementById(options.containerId);
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
}

Notification.prototype.subscribe = function(callback) {
    listener = callback;
    return Notification;
}

return Notification;
})();