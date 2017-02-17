/*global
require, module
*/
var utils               = require('../../../utils');
var baseNotification    = require('../notification');
var style               = require('./style.css');

module.exports = (function () {

    'use strict';
    
    var ToastrClass = (function () {

        var instance = null,
            defaultOptions = {
                target:             'body',
                containerId:        'sa-toast-container',
                containerClass:     'sa-toast-top-right',
                notificationClass:  'sa-toast',
                iconClass:          'sa-toast-info',
                positionClass:      'sa-toast-top-right',
                titleClass:         'sa-toast-title',
                messageClass:       'sa-toast-message',
                closeClass:         'sa-toast-close-button',
                progressBar:        true,
                progressClass:      'sa-toast-progress',
                rightAlign:         false,
                iconClasses: {
                    error:   'sa-toast-error',
                    info:    'sa-toast-info',
                    success: 'sa-toast-success',
                    warning: 'sa-toast-warning'
                }
            };

        /**
         * Constructor function
         */
        function ToastrNotification() {

        }

        ToastrNotification.prototype               = Object.create(baseNotification.prototype);
        
        ToastrNotification.prototype.constructor   = ToastrNotification;
        
        /**
         * Get default options
         * 
         * @returns {object} Get default options
         */
        ToastrNotification.prototype.getDefaults   = function () {
            return defaultOptions;
        };
        
        /**
         * Create notification element
         * 
         * @param   {object} map       
         * @param   {object} container 
         * @returns {object} 
         */
        ToastrNotification.prototype.personalize   = function (map, container) {

            var toastElement    = document.createElement('div'),
                titleElement    = document.createElement('div'),
                messageElement  = document.createElement('div'),
                progressElement = document.createElement('div'),
                closeElement    = utils.stringToHtmlElement('<button type="button">&times;</button>'),
                options         = this.getOptions(),
                title           = map.title || false,
                message         = map.message || false,
                iconClass       = map.iconClass || false;
            
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