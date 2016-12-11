(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.stickybit = factory());
}(this, (function () { 'use strict';

function stickybit(target, opts) {
  if (document.querySelector(target).length > 1) throw Error('Stickybits only works on one element per initialization. 😰');
  var el = document.querySelector(target);
  var elStyle = el.getAttribute('style');
  var parent = el.parentNode;
  var parentPosition = parent.getBoundingClientRect();
  var stickyEl = el.style;
  var stickyStyle = ['-webkit-', '-moz-', '-ms-', '-o-', ''].join('sticky; position: ');

  // defaults
  var defaults = {
    // delta: el.offsetHeight,
    offset: 0,
    position: 'top',
    start: parentPosition.top,
    stop: parentPosition.top + parent.offsetHeight,
    width: '100%'
  };

  // const delta = (opts && opts.delta) || defaults.delta;
  var offset = opts && opts.offset || defaults.offset;
  var position = opts && opts.position || defaults.position;
  var start = opts && opts.start || defaults.start;
  var stop = opts && opts.stop || defaults.stop;
  var width = opts && opts.width || defaults.width;

  if (position !== 'top' && position !== 'bottom') throw Error('Stickybits works with top and bottom positioning only. 😰');

  // maintain stickiness
  var current = 0;
  function stickiness() {
    var scroll = window.scrollY;
    var scrollUp = scroll < current;
    if (scroll > start) {
      stickyEl.cssText = elStyle + 'position: ' + stickyStyle + ' sticky; width: ' + width + '; ' + position + ': ' + offset;
      if (stickyEl.position === '') {
        stickyEl.position = 'fixed';
      }
      stickyEl[offset] = 0;
      el.setAttribute('data-sticky', true);
    } else if (scrollUp && scroll < start) {
      el.setAttribute('data-sticky', false);
      stickyEl.position = stickyEl[offset] = '';
    }
    if (scroll > stop && el.getAttribute('data-sticky') === true) el.setAttribute('data-stuck', true);
    current = scroll;
    return;
  }
  window.addEventListener('scroll', function () {
    return stickiness();
  });
}

return stickybit;

})));