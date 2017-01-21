var Utils = require('./utils');
var Notification = require('./Notification');

module.exports = (function () {

    'use strict';
    
	var AlertClass = (function () {

        var instance = null,
            defaultOptions = {
                target:         'body',
                containerId:    'sa-alert-container',
                containerClass: 'alert',
                notificationClass: 'alert',
                titleClass:     '',
                messageClass:   '',
                closeClass:     'close',
                rightAlign:     false,
                iconClasses: {
                    error:   'alert-danger',
                    info:    'alert-info',
                    success: 'alert-success',
                    warning: 'alert-warning'
                }
            };

	    function AlertNotification() {
	        
	    }

	    AlertNotification.prototype                = Object.create(Notification.prototype);
        
	    AlertNotification.prototype.constructor    = AlertNotification;

	    AlertNotification.prototype.getDefaults    = function () {
            return defaultOptions;
	    };

	    AlertNotification.prototype.personalize    = function (map, container) {
            var alertElement    = document.createElement('div'),
                titleElement    = document.createElement('strong'),
                messageElement  = document.createElement('span'),
                closeElement    = Utils.stringToHtmlElement('<a href="javascript:void(0);" title="close">&times;</a>'),
                options         = this.getOptions(),
                title           = map.title || false,
                message         = map.message || false;

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
	        getInstance: function () {
	            if (instance === null) {
	                instance = new AlertNotification();
	                instance.constructor = null;
	            }
	            return instance;
	        }
        };
	}());

	return AlertClass.getInstance();

}());