/*global
alert, confirm, console, Debug, opera, prompt, WSH, require, module, exports,global,Node,HTMLElement,NodeList,HTMLCollection
*/

(function (root, factory) {
    
    'use strict';
    
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        module.exports = factory(
            require('eventemitter3'),
            require('./core/element'),
            require('./utils'),
            require('index.css'),
            global || root
        );
    } else {
        root.Smartajax = factory(root.toastr, root.alert, root);
    }
}(typeof window !== 'undefined' ? window : this, function (EventEmitter, Element, Utils, styles, root) {
    
    'use strict';
    
    var defaultOptions = {},
    
        classCallCheck = function (instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError('Cannot call a class as a function');
            }
        },
        
        initElement = function (element) {
            var uniqueId = Utils.generateUniqueId();
            
            if (!element.getAttribute('data-smartajax-id')) {
                element.setAttribute('data-smartajax-id', uniqueId);
                element = new Element(element, this.options);
                return element;
            }
            return false;
        },
        
        createElementsArray = function (selector, filterElements) {
            var elements = [], i, el;

            if (!selector) {
                selector = [];
            }
            
            if (typeof selector === 'string') {
                selector = document.querySelectorAll(selector);
            }
            
            if (Utils.isElement(selector)) {
                selector = [selector];
            }

            if (filterElements) {
                for (i = 0; i < selector.length; i = i + 1) {
                    el = selector[i];
                    if (Utils.isElement(el) && !el.getAttribute('data-smartajax-id')) {
                        elements.push(el);
                    }
                }
            } else {
                elements = Array.prototype.slice.apply(selector);
            }

            return elements;
        },
        
        Smartajax = function (elements, options) {
            classCallCheck(this, Smartajax);
            
            this.init(elements, options);
        };
    
    Smartajax.prototype.init = function (elements, options) {
        
        this.options        = (typeof options === 'object') ? Utils.extend(defaultOptions, options) : defaultOptions;
        this.origElements   = elements;

        return this.setup();
    };
    
    Smartajax.prototype.setup = function () {
        this.emitter    = new EventEmitter();
        this.elements   = [];

        this.addElements(this.origElements);

        if (this.elements.length === 0) {
            return;
        }
    };
    
    Smartajax.prototype.addElements = function (selector) {
        var elements = createElementsArray(selector, true);
        
        if (elements.length === 0) {
            return false;
        }

        elements.forEach(function (element) {
            element = initElement.call(this, element);
            this.elements.push(element);
        }, this);
    };
    
    Smartajax.prototype.removeElements = function (selector) {
        var elements = createElementsArray(selector), i, k;

        if (elements.length > 0) {
            for (i in elements) {
                if (elements[i].getAttribute('data-smartajax-id')) {
                    for (k in this.elements) {
                        if (this.elements[k].getDomElement() === elements[i]) {
                            this.elements[k].getDomElement().removeAttribute('data-smartajax-id');
                            this.elements[k].destroy();
                            this.elements.splice(k, 1);
                        }
                    }
                }
            }
        }
    };

    return Smartajax;

}));
