var Utils = require('./utils');
var Notification = require('./Notification');

module.exports = (function () {

	var BootstrapAlert = (function(){

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

	    function BootstrapAlert() {
	        
	    }

	    BootstrapAlert.prototype = Object.create(Notification.prototype);
	    BootstrapAlert.prototype.constructor = BootstrapAlert;

	    BootstrapAlert.prototype.getDefaults = function() {
	    	return defaultOptions;
	    }

	    BootstrapAlert.prototype.personalizeNotification = function(map, $container) {
	    	var $notificationElement 	= document.createElement('div');
		    var $titleElement 	= document.createElement('strong');
		    var $messageElement = document.createElement('span');
		    var $closeElement 	= Utils.stringToHtmlElement('<a href="javascript:void(0);" class="close" title="close">&times;</a>');

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
	    }



	    var instance;

	    return {
	        getInstance: function() {
	            if (instance == null) {
	                instance = new BootstrapAlert();
	                instance.constructor = null;
	            }
	            return instance;
	        }
	   };
	})();

	return BootstrapAlert.getInstance();

})();