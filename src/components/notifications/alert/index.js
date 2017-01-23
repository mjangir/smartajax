var utils               = require('../../../utils');
var baseNotification    = require('../notification');
var style               = require('./style.css');

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

	    /**
	     * Constructor function
	     */
	    function AlertNotification() {
	        
	    }

	    AlertNotification.prototype                = Object.create(baseNotification.prototype);
        
	    AlertNotification.prototype.constructor    = AlertNotification;

	    /**
	     * Get default options
	     * 
	     * @returns {object} Default options
	     */
	    AlertNotification.prototype.getDefaults    = function () {
            return defaultOptions;
	    };

	    /**
	     * Create notification element
	     * 
	     * @param   {object} map       
	     * @param   {object} container 
	     * @returns {object} 
	     */
	    AlertNotification.prototype.personalize    = function (map, container) {
            var alertElement    = document.createElement('div'),
                titleElement    = document.createElement('strong'),
                messageElement  = document.createElement('span'),
                closeElement    = utils.stringToHtmlElement('<a href="javascript:void(0);" title="close">&times;</a>'),
                options         = this.getOptions(),
                title           = map.title || false,
                message         = map.message || false;

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