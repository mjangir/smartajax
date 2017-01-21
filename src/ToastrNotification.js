var Utils = require('./utils');
var Notification = require('./Notification');

module.exports = (function () {

    'use strict';
    
    var ToastrClass = (function () {

        var instance = null,
            defaultOptions = {
                target:         'body',
                containerId:    'toast-container',
                containerClass: 'toast-top-right',
                notificationClass:     'toast',
                iconClass:      'toast-info',
                positionClass:  'toast-top-right',
                titleClass:     'toast-title',
                messageClass:   'toast-message',
                closeClass:     'toast-close-button',
                progressBar:    true,
                progressClass:  'toast-progress',
                rightAlign:     false,
                iconClasses: {
                    error:   'toast-error',
                    info:    'toast-info',
                    success: 'toast-success',
                    warning: 'toast-warning'
                }
            };

        function ToastrNotification() {

        }

        ToastrNotification.prototype               = Object.create(Notification.prototype);
        
        ToastrNotification.prototype.constructor   = ToastrNotification;
        
        ToastrNotification.prototype.getDefaults   = function () {
            return defaultOptions;
        };
        
        ToastrNotification.prototype.personalize   = function (map, container) {

            var toastElement    = document.createElement('div'),
                titleElement    = document.createElement('div'),
                messageElement  = document.createElement('div'),
                progressElement = document.createElement('div'),
                closeElement    = Utils.stringToHtmlElement('<button type="button">&times;</button>'),
                options         = this.getOptions(),
                title           = map.title || false,
                message         = map.message || false,
                iconClass       = map.iconClass || false;
            
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
                notificationElement:    toastElement,
                titleElement:           titleElement,
                messageElement:         messageElement,
                progressElement:        progressElement,
                closeElement:           closeElement
            };
        };

        return {
            getInstance: function () {
                if (instance === null) {
                    instance = new ToastrNotification();
                    instance.constructor = null;
                }
                return instance;
            }
        };
    }());

    return ToastrClass.getInstance();

}());