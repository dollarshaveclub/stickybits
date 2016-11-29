(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.stickybit = factory());
}(this, (function () { 'use strict';

function stickybit(target, opts) {
  var els = typeof target === 'string' ? document.querySelectorAll(target) : target;
  if (!('length' in els)) els = [els];

  // defaults
  var defaults = {
    offset: 0,
    position: 'top'
  };
  var offset = opts && opts.offset || defaults.offset;
  var position = opts && opts.position || defaults.position;

  // control scrolling
  var current = 0;
  function stickiness() {
    var scroll = window.scrollY;
    var scrollUp = scroll < current;
    for (var i = 0; i < els.length; i + 1) {
      var el = els[i];
      var parent = el.parentNode.getBoundingClientRect();

      // set defaults that could be parent element based
      var delta = opts && opts.delta || el.offestHeight;
      var start = opts && opts.start || parent.top;
      var stop = opts && opts.stop || parent.top + parent.height;

      if (position !== 'top' && position !== 'bottom') throw Error('Stickybits works with top and bottom positioning only. 😰');

      if (scroll > start) {
        el.style.position = 'sticky' || 'fixed';
        el.style[offset] = 0;
        el.setAttribute('data-sticky', true);
      } else if (scrollUp && scroll < start) {
        el.setAttribute('data-sticky', false);
        el.style.position = el.style[offset] = '';
      }
      if (scroll > stop && el.getAttribute('data-sticky') === true) el.setAttribute('data-stuck', true);
      console.log(start, stop, offset, position, delta);
    }
    current = scroll;
    console.log(current, scroll, scrollUp);
  }
  window.addEventListener('scroll', stickiness);
}

return stickybit;

})));