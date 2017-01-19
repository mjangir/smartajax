(function (root, factory) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = factory(require('jquery'), global || root);
  } else {
    root.Smartajax = factory(root.jQuery, root);
  }
}(typeof window !== 'undefined' ? window : this, function ($, root) {
  return (function ($, root) {
    console.log('Hey Smartajax initialised', $.ajax());
  })($, root);

}));
