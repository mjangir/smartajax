(function (root, factory) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = factory(
      require('jquery'),
      require('./components/notifications/alert'),
      require('./components/notifications/toastr'),
      require('index.css'),
      require('./components/loader'),
      global || root);
  } else {
    root.Smartajax = factory(root.jQuery, root.bootstrap, root.toastr, root.alert, root);
  }
}(typeof window !== 'undefined' ? window : this, function (jQuery, AlertNotification, ToastrNotification, styles, Loader, root) {

  var _classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  };

  var operationErrors = {
    invalidArgument: 'Invald Argument Exception',
    argumentRequiresArray: 'Argument Must Be An Array'
  };

  var _elementInArray = function (element, array) {
    var i;

    for (i in array) {
      if (array[i].is(element)) {
        return i;
      }
    }
    return -1;
  };

  var _getSingleElement = function (item) {
    if (!(item instanceof jQuery) && typeof item !== 'string') {
      throw new Error(operationErrors.invalidArgument);
    }
    if (typeof item === 'string') {
      item = jQuery(item).eq(0) ;
    } else {
      item = item.eq(0);
    }
    return item;
  };

  var _getMultipleElements = function (items) {
    if (!(items instanceof jQuery) && typeof items !== 'string') {
      throw new Error(operationErrors.invalidArgument);
    }
    if (typeof items === 'string') {
      items = jQuery(items);
    }
    return items;
  };

  var _attachEventHandlers = function () {

  };

  var _dettachEventHandlers = function () {

  };

  // var EventHandlers = {
  //   _click: function () {

  //   },
  //   _submit: function () {

  //   },
  //   _timeout: function () {

  //   },
  //   _interval: function () {

  //   }
  // };

  var createModal = function () {
    var modal = '<div id="smartajax-modal" class="modal fade" tabindex="-1">';

    modal += '<div class="modal-dialog modal-lg">';
    modal += '<div class="modal-content">';
    modal += '</div>';
    modal += '</div>';
    modal += '</div>';
    return modal;
  };

  var backgroundInit = function () {
    document.body.innerHTML += createModal();
  };

  var Smartajax = function (elements, options) {
    _classCallCheck(this, Smartajax);
    if (typeof elements === 'undefined') {

    }
    this.itemSet = [];
    this.options = {
      show: false
    };

    // this.init();
  };

  // Smartajax Prototypes

  /**
   * Add Item To Instance
   *
   * @param {Element|String} item Either jQuery dom object or selector string
   * @return {Smartajax}
   */
  Smartajax.prototype.addItem = function (item) {
    item = _getSingleElement(item);
    if (item.length > 0) {
      if (_elementInArray(item, this.itemSet) <= -1) {
        this.itemSet.push(item);
      }
      item.data('smartajax', this);
      _attachEventHandlers(item);
    }
  };

  /**
   * Remove Item From Instance
   *
   * @param {Element} item jQuery dom object
   * @return {Smartajax}
   */
  Smartajax.prototype.removeItem = function (item) {
    item = _getSingleElement(item);
    if (item.length > 0) {
      if (typeof item.data('smartajax') !== 'undefined') {
        if (_elementInArray(item, this.itemSet) > -1) {
          this.itemSet.splice(_elementInArray(item, this.itemSet), 1);
        }
        item.removeData('smartajax');
        _dettachEventHandlers(item);
      }
    }
  };

  /**
   * Add Items To Instance
   *
   * @param {Array} Array of jQuery elements or selector strings
   * @return {Smartajax}
   */
  Smartajax.prototype.addItems = function (items) {
    var context = this, i, originalItems;

    if (!Array.isArray(items) || items.length <= 0) {
      throw new Error(operationErrors.argumentRequiresArray);
    }
    for (i = 0; i < items.length; i++) {
      originalItems = _getMultipleElements(items[i]);
      if (originalItems.length > 0) {
        originalItems.each(function () {
          if (_elementInArray(jQuery(this), context.itemSet) <= -1) {
            context.itemSet.push(jQuery(this));
          }
          jQuery(this).data('smartajax', context);
          _attachEventHandlers(jQuery(this));
        });
      }
    }
  };

  /**
   * Remove Items From Instance
   *
   * @param {Array} Array of jQuery elements or selector strings
   * @return {Smartajax}
   */
  Smartajax.prototype.removeItems = function (items) {
    var i, originalItems, context = this;

    if (!Array.isArray(items) || items.length <= 0) {
      throw new Error(operationErrors.argumentRequiresArray);
    }
    for (i = 0; i < items.length; i++) {
      originalItems = _getMultipleElements(items[i]);
      if (originalItems.length > 0) {
        originalItems.each(function () {

          if (typeof jQuery(this).data('smartajax') !== 'undefined') {
            if (_elementInArray(jQuery(this), context.itemSet) > -1) {
              context.itemSet.splice(_elementInArray(jQuery(this), context.itemSet), 1);
            }
            jQuery(this).removeData('smartajax');
            _dettachEventHandlers(jQuery(this));
          }
        });
      }
    }
  };

  Smartajax.prototype.getItems = function () {
    return this.itemSet;
  };

  backgroundInit();
  ToastrNotification.setOptions({
    closeButton: true,
    progressBar: true,
    preventDuplicates: false,
      autoHide:true,
      closeOnHover: false
  });
  ToastrNotification.success('Success', 'Department added successfully');
  ToastrNotification.error('Oops', 'There went something wrong');
  ToastrNotification.info('Information', 'This is important information');
  ToastrNotification.warning('Warning', 'You cannot delete system defined users');
  ToastrNotification.warning('Warning', 'You cannot delete system defined users');
//   alert.options = {
//   "closeButton": true,
//   "debug": true,
//   "newestOnTop": true,
//   "progressBar": true,
//   "positionClass": "toast-top-right",
//   "preventDuplicates": false,
//   "onclick": null,
//   "showDuration": "300",
//   "hideDuration": "1000",
//   "timeOut": "10000",
//   "extendedTimeOut": "10000",
//   "showEasing": "swing",
//   "autoHide": false,
//   "hideEasing": "linear",
//   "showMethod": "fadeIn",
//   "hideMethod": "fadeOut"
// }
//   alert.info('Are you the 6 fingered man?', 'Hello this is info message');
//     alert.success('Are you the 6 fingered man?', 'Hello this is info message');
//       alert.warning('Are you the 6 fingered man?', 'Hello this is info message');
//         alert.error('Are you the 6 fingered man?', 'Hello this is info message');
Loader.show(document.getElementById('overlaydiv'));
setTimeout(function() {
Loader.hide('#overlaydiv');
}, 5000);
  return Smartajax;

}));
