(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.stickybit = factory());
}(this, (function () { 'use strict';

function stickybit(target, opts) {
  if (document.querySelector(target).length > 1) throw Error('Stickybits only works on one element per initialization. 😰');
  var el = document.querySelector(target);
  var parent = el.parentNode;
  var parentPosition = parent.getBoundingClientRect();

  // defaults
  var defaults = {
    delta: el.offestHeight,
    offset: 0,
    position: 'top',
    start: parentPosition.top,
    stop: parentPosition.top + parent.offestHeight
  };

  var offset = opts && opts.offset || defaults.offset;
  var position = opts && opts.position || defaults.position;
  var delta = opts && opts.delta || defaults.delta;
  var start = opts && opts.start || defaults.start;
  var stop = opts && opts.stop || defaults.stop;

  console.log(offset, position, el, parent, position, delta, start, stop);

  if (position !== 'top' && position !== 'bottom') throw Error('Stickybits works with top and bottom positioning only. 😰');

  // maintain stickiness
  var current = 0;
  function stickiness() {
    var scroll = window.scrollY;
    var scrollUp = scroll < current;
    console.log(current, scroll, scrollUp);
    if (scroll > start) {
      el.style.position = 'sticky';
      if (el.style.position === '') el.style.position = 'fixed';
      el.style[offset] = 0;
      el.setAttribute('data-sticky', true);
    } else if (scrollUp && scroll < start) {
      el.setAttribute('data-sticky', false);
      el.style.position = el.style[offset] = '';
    }
    if (scroll > stop && el.getAttribute('data-sticky') === true) el.setAttribute('data-stuck', true);
    current = scroll;
    return;
  }
  window.addEventListener('scroll', function () {
    return stickiness;
  });
}

return stickybit;

})));