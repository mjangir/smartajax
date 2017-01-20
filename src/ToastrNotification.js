var Utils = require('./utils');
var Notification = require('./Notification');

module.exports = (function () {

	var ToastrAlert = (function(){

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

	    function ToastrAlert() {
	        
	    }

	    ToastrAlert.prototype = Object.create(Notification.prototype);
	    ToastrAlert.prototype.constructor = ToastrAlert;

	    ToastrAlert.prototype.getDefaults = function() {
	    	return defaultOptions;
	    }

	    ToastrAlert.prototype.personalizeNotification = function(map, $container) {

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
	    }



	    var instance;

	    return {
	        getInstance: function() {
	            if (instance == null) {
	                instance = new ToastrAlert();
	                instance.constructor = null;
	            }
	            return instance;
	        }
	   };
	})();

	return ToastrAlert.getInstance();

})();